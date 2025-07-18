/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @plugin dashPlugins.ts
 * @description DASH.js integration plugin that provides video streaming with privacy-focused caching
 * Implements advanced video playback features with performance optimization:
 * - Cookie-free storage solutions for GDPR compliance
 * - Segment and manifest caching for faster loading
 * - Bandwidth optimization through adaptive streaming
 * - Secure loading with TrustedTypes policy
 * @see {@link components/tw-VideoPlayer.vue} For the main component using this plugin
 * @see {@link components/tw-Dash.vue} For the hero video implementation
 * @see {@link components/tw-FixedBackgroundVideo.vue} For the background video implementation
 */
import { defineNuxtPlugin } from '#app'
import type {
  MediaPlayer,
  StorageController,
  XHRLoader,
  XHRLoaderConfig,
  XHRLoaderResponse,
} from 'dashjs'
import { errorHandler } from '~/composables/errorHandler'
import type { VideoPlayerMetrics } from '~/types/video-player'

// Interface for performance.memory
interface PerformanceMemory {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

interface PerformanceWithMemory extends Performance {
  memory?: PerformanceMemory
}

interface WindowWithGC extends Window {
  gc?: () => void
}

export interface DashPlayerInfo {
  player: MediaPlayer
  source: string
  createdAt: number
  namespace?: string
}

export interface CachedManifest {
  data: unknown
  timestamp: number
}

export interface CachedSegment {
  data: unknown
  timestamp: number
}

export interface VideoMetric {
  timestamp: number
  [key: string]: unknown
}

export interface MemoryUsage {
  used: number
  total: number
  limit: number
}

export interface DashCache {
  dashJsLoaded: boolean
  players: Record<string, DashPlayerInfo>
  initialized: boolean
  inTransition: boolean
  segments: Map<string, CachedSegment>
  manifests: Map<string, CachedManifest>
  metrics: Record<string, VideoMetric[]>
  memoryMonitoringEnabled: boolean
  memoryMonitorInterval: ReturnType<typeof setInterval> | null

  disableCookieStorage(player: MediaPlayer): boolean
  init(): void
  registerPlayer(id: string, player: MediaPlayer, source: string, namespace?: string): MediaPlayer
  getPlayer(id: string): MediaPlayer | null
  getPlayerBySource(source: string, namespace?: string): MediaPlayer | null
  cacheManifest(url: string, data: unknown): void
  getManifest(url: string): unknown | null
  reportMetrics(metrics: VideoPlayerMetrics): void
  getMetrics(videoId: string): VideoMetric[]
  clearOldPlayers(maxAgeMs?: number): void
  removePlayer(id: string): void
  clearCache(): void
  addSegment(url: string, data: unknown): void
  getSegment(url: string): unknown | null
  clearOldSegments(maxAgeMs?: number): void
  createXHRLoader(): XHRLoader
  _setupCleanupInterval(): void
  loadDashJs(): Promise<void>
  startMemoryMonitoring(): void
  stopMemoryMonitoring(): void
  getMemoryUsage(): MemoryUsage | null
  checkMemoryLeaks(): void
  aggressiveCleanup(): void
  prefetchSegments(): void
}

declare global {
  interface Window {
    dashjs?: typeof import('dashjs')
    trustedTypes?: {
      createPolicy: (name: string, policy: Record<string, unknown>) => unknown
      getPolicy: (name: string) => unknown
    }
  }
}

/**
 * initializeTrustedTypesPolicy
 * Creates a TrustedTypes policy for the video player to enhance security
 * @private
 */
function initializeTrustedTypesPolicy(): void {
  try {
    if (window.trustedTypes && typeof window.trustedTypes.createPolicy === 'function') {
      let policyExists = false
      try {
        policyExists = !!window.trustedTypes.getPolicy('videoPlayerPolicy')
      } catch (_e) {
        policyExists = false
      }

      if (!policyExists) {
        try {
          window.trustedTypes.createPolicy('videoPlayerPolicy', {
            createHTML: (string: string) => string,
          })
          errorHandler.debug('TrustedTypes policy created for video player', null, {
            component: 'DashPlugin',
          })
        } catch (e) {
          errorHandler.warning('Failed to create TrustedTypes policy', e, {
            component: 'DashPlugin',
          })
        }
      }
    }
  } catch (e) {
    errorHandler.warning('TrustedTypes not fully supported in this browser', e, {
      component: 'DashPlugin',
    })
  }
}

/**
 * disableCookieStorage
 * Prevents DASH.js from storing cookies for GDPR compliance
 */
function disableCookieStorage(player: MediaPlayer): boolean {
  if (player) {
    try {
      if (typeof player.setStorageController === 'function') {
        const noOpController: StorageController = {
          getSavedMediaSettings: (): Record<string, unknown> => ({}),
          saveMediaSettings: (): void => {},
          release: (): void => {},
        }
        player.setStorageController(noOpController)
        return true
      }
      return true
    } catch (e) {
      errorHandler.warning('Could not disable storage', e, { component: 'DashPlugin' })
      return false
    }
  }
  return false
}

/**
 * initializeDashCache
 * Initializes the DASH cache system
 */
function initializeDashCache(cache: DashCache): void {
  if (cache.initialized) return
  errorHandler.debug('Initializing DASH cache system', null, { component: 'DashPlugin' })
  cache.initialized = true

  window.addEventListener('beforeunload', () => {
    cache.inTransition = true
  })

  setupCleanupInterval(cache)

  if (cache.memoryMonitoringEnabled) {
    startMemoryMonitoring(cache)
  }
}

/**
 * setupCleanupInterval
 * Sets up periodic cleanup of cache
 */
function setupCleanupInterval(cache: DashCache): void {
  setInterval(() => {
    clearOldSegments(cache)
    clearOldPlayers(cache)
    checkMemoryLeaks(cache)
  }, 300000)
}

/**
 * clearOldPlayers
 * Removes and cleans up old player instances
 */
function clearOldPlayers(cache: DashCache, maxAgeMs: number = 600000): void {
  const now = Date.now()
  for (const id in cache.players) {
    if (now - cache.players[id].createdAt > maxAgeMs) {
      try {
        cache.players[id].player.reset()
      } catch (e) {
        errorHandler.warning('Error destroying DASH player', e, { component: 'DashPlugin' })
      }
      delete cache.players[id]
      errorHandler.debug('Removed old DASH player', { id }, { component: 'DashPlugin' })
    }
  }
}

/**
 * clearOldSegments
 * Removes old segments from cache
 */
function clearOldSegments(cache: DashCache, maxAgeMs: number = 300000): void {
  const now = Date.now()
  for (const [url, info] of cache.segments.entries()) {
    if (now - info.timestamp > maxAgeMs) {
      cache.segments.delete(url)
    }
  }
}

/**
 * startMemoryMonitoring
 * Starts memory monitoring in development mode
 */
function startMemoryMonitoring(cache: DashCache): void {
  if (!cache.memoryMonitoringEnabled || cache.memoryMonitorInterval !== null) {
    return
  }

  if (typeof performance !== 'undefined' && (performance as PerformanceWithMemory).memory) {
    errorHandler.debug('Starting memory monitoring', null, { component: 'DashPlugin' })

    cache.memoryMonitorInterval = setInterval(() => {
      const usage = getMemoryUsage()
      if (usage) {
        if (usage.used > 100) {
          errorHandler.warning('High memory usage detected', usage, {
            component: 'DashPlugin',
          })
          aggressiveCleanup(cache)
        }
        if (usage.used > 200) {
          errorHandler.error('Critical memory usage detected', usage, {
            component: 'DashPlugin',
          })
          aggressiveCleanup(cache)
        }
      }
    }, 30000)
  }
}

/**
 * getMemoryUsage
 * Gets current memory usage information
 */
function getMemoryUsage(): MemoryUsage | null {
  if (typeof performance !== 'undefined' && (performance as PerformanceWithMemory).memory) {
    const memory = (performance as PerformanceWithMemory).memory!
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576),
      total: Math.round(memory.totalJSHeapSize / 1048576),
      limit: Math.round(memory.jsHeapSizeLimit / 1048576),
    }
  }
  return null
}

/**
 * checkMemoryLeaks
 * Checks for potential memory leaks
 */
function checkMemoryLeaks(cache: DashCache): void {
  const usage = getMemoryUsage()

  if (usage) {
    if (usage.used > 150) {
      errorHandler.warning('Memory leak check triggered aggressive cleanup', usage, {
        component: 'DashPlugin',
      })
      aggressiveCleanup(cache)
    }

    if (cache.memoryMonitoringEnabled) {
      errorHandler.debug(
        'Memory status check',
        {
          ...usage,
          playersCount: Object.keys(cache.players).length,
          segmentsCount: cache.segments.size,
          manifestsCount: cache.manifests.size,
        },
        { component: 'DashPlugin' }
      )
    }
  }
}

/**
 * aggressiveCleanup
 * Performs aggressive cleanup to free memory
 */
function aggressiveCleanup(cache: DashCache): void {
  errorHandler.debug('Performing aggressive cleanup', null, { component: 'DashPlugin' })

  clearOldPlayers(cache, 120000)
  clearOldSegments(cache, 60000)

  const now = Date.now()
  for (const [url, manifest] of cache.manifests.entries()) {
    if (now - manifest.timestamp > 60000) {
      cache.manifests.delete(url)
    }
  }

  for (const videoId in cache.metrics) {
    if (cache.metrics[videoId].length > 10) {
      cache.metrics[videoId] = cache.metrics[videoId].slice(-10)
    }
  }

  if (
    cache.memoryMonitoringEnabled &&
    typeof window !== 'undefined' &&
    (window as WindowWithGC).gc
  ) {
    try {
      ;(window as WindowWithGC).gc!()
      errorHandler.debug('Forced garbage collection', null, { component: 'DashPlugin' })
    } catch (_e) {
      // Ignore errors
    }
  }
}

/**
 * createXHRLoader
 * Creates a custom XHR loader with caching support
 */
function createXHRLoader(cache: DashCache): XHRLoader {
  return {
    load: function (config: XHRLoaderConfig): Promise<XHRLoaderResponse> {
      return new Promise((resolve, reject) => {
        const url = config.request ? config.request.url : null

        if (url && url.endsWith('.mpd') && cache.manifests.has(url)) {
          errorHandler.debug('Serving cached manifest', { url }, { component: 'DashPlugin' })
          const cached = cache.manifests.get(url)!
          resolve({
            url: url,
            data: cached.data,
            responseType: config.responseType || '',
            status: 200,
          })
          return
        }

        if (url && url.includes('.m4s') && cache.segments.has(url)) {
          errorHandler.debug('Serving cached segment', { url }, { component: 'DashPlugin' })
          const cached = cache.segments.get(url)!
          resolve({
            url: url,
            data: cached.data,
            responseType: config.responseType || '',
            status: 200,
          })
          return
        }

        const xhr = new XMLHttpRequest()
        xhr.open(config.method || 'GET', url!, true)

        if (config.responseType) {
          xhr.responseType = config.responseType as globalThis.XMLHttpRequestResponseType
        }

        if (config.headers) {
          for (const header in config.headers) {
            xhr.setRequestHeader(header, config.headers[header])
          }
        }

        xhr.onload = function (): void {
          if (xhr.status >= 200 && xhr.status < 300) {
            if (url && url.endsWith('.mpd') && xhr.response) {
              cache.manifests.set(url, { data: xhr.response, timestamp: Date.now() })
            }
            if (url && url.includes('.m4s') && xhr.response) {
              cache.segments.set(url, { data: xhr.response, timestamp: Date.now() })
            }
            resolve({
              url: url!,
              data: xhr.response,
              responseType: xhr.responseType as string,
              status: xhr.status,
            })
          } else {
            reject(xhr.statusText)
          }
        }

        xhr.onerror = function (): void {
          reject(xhr.statusText)
        }

        xhr.send(
          config.data as
            | string
            | Document
            | Blob
            | ArrayBufferView
            | ArrayBuffer
            | FormData
            | URLSearchParams
            | null
        )
      })
    },
  }
}

/**
 * checkMobileDevice
 * Checks if the current device is mobile or has a small screen
 * @returns {boolean} True if mobile or small screen
 */
function checkMobileDevice(): boolean {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent)
  const isSmallScreen = window.innerWidth <= 768
  return isMobile || isSmallScreen
}

/**
 * patchDashJsStorage
 * Patches DASH.js storage functions to disable storage
 */
function patchDashJsStorage(dashjs: typeof import('dashjs')): void {
  try {
    if (typeof (dashjs as Record<string, unknown>).Storage !== 'undefined') {
      ;(dashjs as Record<string, unknown>).Storage = {
        getSavedMediaSettings: (): null => null,
        saveMediaSettings: (): void => {},
        release: (): void => {},
      }
    }

    const factoryPackage = (dashjs as Record<string, unknown>).FactoryMaker
    if (factoryPackage && typeof factoryPackage === 'object') {
      const factory = factoryPackage as {
        extend: (name: string, childInstance: unknown, override: boolean) => unknown
      }
      const storageOverride = {
        getSavedMediaSettings: (): null => null,
        saveMediaSettings: (): void => {},
        release: (): void => {},
      }
      if (typeof factory.extend === 'function') {
        factory.extend('Storage', storageOverride, true)
      }
    }

    const mediaPlayerFactoryInstance = (dashjs as Record<string, unknown>).MediaPlayerFactory
    if (mediaPlayerFactoryInstance && typeof mediaPlayerFactoryInstance === 'object') {
      const mediaPlayerFactory = mediaPlayerFactoryInstance as { create: () => unknown }
      if (typeof mediaPlayerFactory.create === 'function') {
        const originalCreate = mediaPlayerFactory.create
        mediaPlayerFactory.create = (): unknown => {
          const player = originalCreate.call(mediaPlayerFactory)
          if (player && typeof player === 'object') {
            const p = player as Record<string, unknown>
            if (typeof p.getSettings === 'function' && typeof p.updateSettings === 'function') {
              try {
                const settings = p.getSettings() as Record<string, unknown>
                p.updateSettings({
                  ...settings,
                  streaming: {
                    ...((settings.streaming as Record<string, unknown>) || {}),
                    saveLastMediaSettingsForCurrentUser: false,
                  },
                })
                errorHandler.debug('Player settings patched for storage bypass', null, {
                  component: 'DashPlugin',
                })
              } catch (settingsError) {
                errorHandler.warning('Could not patch player settings', settingsError, {
                  component: 'DashPlugin',
                })
              }
            }
            return player
          }
        }
      }
    }
  } catch (e) {
    errorHandler.warning('Could not patch storage functions', e, {
      component: 'DashPlugin',
    })
  }
}

/**
 * initializeDashJsAsync
 * Initializes DASH.js asynchronously
 */
async function initializeDashJsAsync(): Promise<void> {
  if (!window.dashCache?.dashJsLoaded) {
    try {
      const dashjs = await import(/* webpackChunkName: "dashjs" */ 'dashjs')
      ;(window as Window & { dashjs: Record<string, unknown> }).dashjs = dashjs.default || dashjs
      if (window.dashCache) {
        window.dashCache.dashJsLoaded = true
      }
      errorHandler.debug('DASH.js loaded immediately for optimal performance', null, {
        component: 'DashPlugin',
      })

      patchDashJsStorage(dashjs)
    } catch (err) {
      errorHandler.warning('Failed to load DASH.js immediately', err, {
        component: 'DashPlugin',
      })
    }
  }
}

function createDashCacheCoreMethods(cache: DashCache): Partial<DashCache> {
  return {
    init(): void {
      initializeDashCache(cache)
    },

    _setupCleanupInterval(): void {
      setupCleanupInterval(cache)
    },

    async loadDashJs(): Promise<void> {
      if (cache.dashJsLoaded) {
        return
      }
      if (!cache.initialized) {
        cache.init()
      }
      return initializeDashJsAsync()
    },

    createXHRLoader(): XHRLoader {
      return createXHRLoader(cache)
    },

    prefetchSegments(): void {
      if (!cache.initialized) cache.init()
      const segmentUrls = [
        '/assets/dash/video/init-stream1.m4s',
        '/assets/dash/video/chunk-stream1-00001.m4s',
        '/assets/dash/video/init-stream2.m4s',
        '/assets/dash/video/chunk-stream2-00001.m4s',
      ]
      segmentUrls.forEach(url => {
        if (!cache.segments.has(url)) {
          fetch(url)
            .then(response => response.arrayBuffer())
            .then(data => {
              cache.addSegment(url, data)
            })
            .catch(() => {
              // Ignore errors
            })
        }
      })
    },
  }
}

function createDashCachePlayerMethods(cache: DashCache): Partial<DashCache> {
  return {
    registerPlayer(
      id: string,
      player: MediaPlayer,
      source: string,
      namespace?: string
    ): MediaPlayer {
      if (!cache.initialized) cache.init()
      disableCookieStorage(player)
      cache.players[id] = {
        player,
        source,
        createdAt: Date.now(),
        namespace,
      }
      errorHandler.debug(
        'DASH player registered',
        { id, source, namespace },
        { component: 'DashPlugin' }
      )
      return player
    },

    getPlayer(id: string): MediaPlayer | null {
      if (!cache.initialized) cache.init()
      const playerInfo = cache.players[id]
      if (playerInfo && playerInfo.player) {
        disableCookieStorage(playerInfo.player)
        return playerInfo.player
      }
      return null
    },

    getPlayerBySource(source: string, namespace?: string): MediaPlayer | null {
      if (!cache.initialized) cache.init()

      for (const id in cache.players) {
        const playerInfo = cache.players[id]
        if (playerInfo.source === source && (!namespace || playerInfo.namespace === namespace)) {
          disableCookieStorage(playerInfo.player)
          return playerInfo.player
        }
      }
      return null
    },

    clearOldPlayers(maxAgeMs: number = 600000): void {
      clearOldPlayers(cache, maxAgeMs)
    },

    removePlayer(id: string): void {
      if (cache.players[id]) {
        const playerInfo = cache.players[id]
        if (playerInfo.player && typeof playerInfo.player.destroy === 'function') {
          playerInfo.player.destroy()
        }
        delete cache.players[id]
        errorHandler.debug('DASH player removed', { id }, { component: 'DashPlugin' })
      }
    },

    clearCache(): void {
      // Clear all players
      for (const id in cache.players) {
        const playerInfo = cache.players[id]
        if (playerInfo.player && typeof playerInfo.player.destroy === 'function') {
          playerInfo.player.destroy()
        }
        delete cache.players[id]
      }

      // Clear segments and manifests
      cache.segments.clear()
      cache.manifests.clear()

      // Reset cache state
      cache.initialized = false
      cache.dashJsLoaded = false
      cache.inTransition = false

      errorHandler.debug('DASH cache cleared', null, { component: 'DashPlugin' })
    },
  }
}

function createDashCacheDataMethods(cache: DashCache): Partial<DashCache> {
  return {
    cacheManifest(url: string, data: unknown): void {
      if (!cache.initialized) cache.init()
      cache.manifests.set(url, {
        data,
        timestamp: Date.now(),
      })
    },

    getManifest(url: string): unknown | null {
      if (!cache.initialized) cache.init()
      const manifest = cache.manifests.get(url)
      return manifest?.data || null
    },

    addSegment(url: string, data: unknown): void {
      if (!cache.initialized) cache.init()
      cache.segments.set(url, {
        data,
        timestamp: Date.now(),
      })
    },

    getSegment(url: string): unknown | null {
      return cache.segments.get(url)?.data || null
    },

    clearOldSegments(maxAgeMs: number = 300000): void {
      clearOldSegments(cache, maxAgeMs)
    },

    reportMetrics(metrics: VideoPlayerMetrics): void {
      if (!cache.initialized) cache.init()
      const metricId = 'general'
      if (!cache.metrics[metricId]) {
        cache.metrics[metricId] = []
      }
      cache.metrics[metricId].push({
        loadTime: metrics.loadTime,
        bufferHealth: metrics.bufferHealth,
        droppedFrames: metrics.droppedFrames,
        averageBitrate: metrics.averageBitrate,
        stallCount: metrics.stallCount,
        errorCount: metrics.errorCount,
        timestamp: Date.now(),
      })
    },

    getMetrics(videoId: string): VideoMetric[] {
      return cache.metrics[videoId] || []
    },
  }
}

function createDashCacheMemoryMethods(cache: DashCache): Partial<DashCache> {
  return {
    startMemoryMonitoring(): void {
      startMemoryMonitoring(cache)
    },

    stopMemoryMonitoring(): void {
      if (cache.memoryMonitorInterval !== null) {
        clearInterval(cache.memoryMonitorInterval)
        cache.memoryMonitorInterval = null
      }
    },

    getMemoryUsage(): MemoryUsage | null {
      return getMemoryUsage()
    },

    checkMemoryLeaks(): void {
      checkMemoryLeaks(cache)
    },

    aggressiveCleanup(): void {
      aggressiveCleanup(cache)
    },
  }
}

function createDashCache(): DashCache {
  const cache = {
    dashJsLoaded: false,
    players: {},
    initialized: false,
    inTransition: false,
    segments: new Map<string, CachedSegment>(),
    manifests: new Map<string, CachedManifest>(),
    metrics: {},
    memoryMonitoringEnabled: process.env.NODE_ENV === 'development',
    memoryMonitorInterval: null,
    disableCookieStorage,
  } as DashCache

  return Object.assign(
    cache,
    createDashCacheCoreMethods(cache),
    createDashCachePlayerMethods(cache),
    createDashCacheDataMethods(cache),
    createDashCacheMemoryMethods(cache)
  )
}

export default defineNuxtPlugin(_nuxtApp => {
  if (process.client) {
    if (checkMobileDevice()) {
      errorHandler.debug(
        'Skipping DASH.js initialization on mobile device',
        { mobile: true },
        { component: 'DashPlugin' }
      )
      return {
        provide: {
          dashCache: {} as Partial<DashCache>,
        },
      }
    }

    initializeTrustedTypesPolicy()

    const dashCache = createDashCache()

    window.dashCache = dashCache

    // Initialize the dashCache system only when actually needed
    // Don't initialize on pages that don't have video content
    // window.dashCache.init();

    // Prefetch segments for faster video startup - DISABLED
    // Since we now use MP4-first dual-loading strategy, DASH prefetching is no longer needed
    // and was causing unnecessary network requests on all pages
    // if (typeof window !== 'undefined' && window.addEventListener) {
    //   window.addEventListener('load', () => {
    //     setTimeout(() => {
    //       window.dashCache.prefetchSegments();
    //     }, 100); // Small delay to not block page load
    //   });
    // }

    // Don't load DASH.js immediately - let video components load it on demand
    // initializeDashJsAsync();
  }

  /**
   * @returns {Object} - Provides the dashCache to components
   * @property {DashCache} provide.dashCache - The DASH cache system
   */
  return {
    provide: {
      dashCache: process.client ? window.dashCache : ({} as Partial<DashCache>),
    },
  }
})
