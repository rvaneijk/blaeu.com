/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

// Type definitions for video player functionality

import type { MediaPlayer, DashJSSettings } from './dashjs'

export interface VideoPlayerConfig {
  readonly source: string
  readonly element: HTMLVideoElement
  readonly autoPlay?: boolean
  readonly controls?: boolean
  readonly muted?: boolean
  readonly loop?: boolean
  readonly preload?: 'none' | 'metadata' | 'auto'
  readonly poster?: string
  readonly crossOrigin?: 'anonymous' | 'use-credentials' | null
}

export interface DashVideoPlayerConfig extends VideoPlayerConfig {
  readonly dashSettings?: DashJSSettings
  readonly enableCache?: boolean
  readonly namespace?: string
  readonly retryAttempts?: number
  readonly retryDelay?: number
}

export interface VideoPlayerState {
  readonly isPlaying: boolean
  readonly isPaused: boolean
  readonly isLoading: boolean
  readonly hasError: boolean
  readonly currentTime: number
  readonly duration: number
  readonly volume: number
  readonly isMuted: boolean
  readonly buffered: TimeRanges
  readonly playbackRate: number
  readonly readyState: number
  readonly error: MediaError | null
}

export interface VideoPlayerControls {
  play(): Promise<void>
  pause(): void
  stop(): void
  seek(time: number): void
  setVolume(volume: number): void
  mute(): void
  unmute(): void
  toggleMute(): void
  setPlaybackRate(rate: number): void
  enterFullscreen(): Promise<void>
  exitFullscreen(): Promise<void>
  toggleFullscreen(): Promise<void>
}

export interface VideoPlayerEvents {
  onLoadStart?: (event: Event) => void
  onLoadedMetadata?: (event: Event) => void
  onLoadedData?: (event: Event) => void
  onCanPlay?: (event: Event) => void
  onCanPlayThrough?: (event: Event) => void
  onPlay?: (event: Event) => void
  onPause?: (event: Event) => void
  onEnded?: (event: Event) => void
  onTimeUpdate?: (event: Event) => void
  onVolumeChange?: (event: Event) => void
  onRateChange?: (event: Event) => void
  onResize?: (event: Event) => void
  onError?: (event: Event) => void
  onAbort?: (event: Event) => void
  onEmptied?: (event: Event) => void
  onStalled?: (event: Event) => void
  onSuspend?: (event: Event) => void
  onWaiting?: (event: Event) => void
  onSeeking?: (event: Event) => void
  onSeeked?: (event: Event) => void
  onProgress?: (event: Event) => void
  onDurationChange?: (event: Event) => void
}

export interface DashVideoPlayer extends VideoPlayerControls {
  readonly player: MediaPlayer | null
  readonly config: DashVideoPlayerConfig
  readonly state: VideoPlayerState
  readonly element: HTMLVideoElement

  initialize(): Promise<void>
  destroy(): void
  reset(): void
  attachSource(source: string): void
  updateSettings(settings: DashJSSettings): void
  getSettings(): DashJSSettings
  getBitrateInfo(type: 'video' | 'audio'): import('./dashjs').BitrateInfo[]
  getQuality(type: 'video' | 'audio'): number
  setQuality(type: 'video' | 'audio', quality: number): void
  isReady(): boolean
}

export interface VideoRecoveryConfig {
  readonly maxRetries: number
  readonly retryDelay: number
  readonly exponentialBackoff: boolean
  readonly onRetry?: (attempt: number, error: Error) => void
  readonly onMaxRetriesReached?: (error: Error) => void
}

export interface VideoRecoveryResult {
  readonly success: boolean
  readonly attempts: number
  readonly error?: Error
  readonly duration: number
}

export interface VideoValidationResult {
  readonly isValid: boolean
  readonly errors: string[]
  readonly warnings: string[]
  readonly source?: string
  readonly format?: string
  readonly duration?: number
}

export interface VideoPlayerCache {
  readonly initialized: boolean
  dashJsLoaded?: boolean
  inTransition?: boolean
  getPlayerBySource(source: string, namespace?: string): MediaPlayer | null
  registerPlayer(id: string, player: MediaPlayer, source: string, namespace?: string): void
  removePlayer(id: string): void
  clearCache(): void
  disableCookieStorage(player: MediaPlayer): void
  createXHRLoader(player: MediaPlayer): import('./dashjs').XHRLoader
  loadDashJs(): Promise<void>
  reportMetrics?(metrics: VideoPlayerMetrics): void
}

export interface VideoAccessibilityFeatures {
  readonly captionsEnabled: boolean
  readonly reduceMotionEnabled: boolean
  readonly hasTextTracks: boolean
  readonly supportedLanguages: string[]

  enableCaptions(): void
  disableCaptions(): void
  toggleCaptions(): void
  setCaptionLanguage(language: string): void
  pauseForReduceMotion(): void
  resumeFromReduceMotion(): void
  applyAccessibilitySettings(settings: Record<string, unknown>): void
}

export interface VideoPlayerMetrics {
  readonly loadTime: number
  readonly bufferHealth: number
  readonly droppedFrames: number
  readonly averageBitrate: number
  readonly stallCount: number
  readonly errorCount: number
}

// Video player event types
export interface VideoPlayerLoadEvent extends CustomEvent {
  detail: {
    player: DashVideoPlayer
    source: string
    duration: number
  }
}

export interface VideoPlayerErrorEvent extends CustomEvent {
  detail: {
    player: DashVideoPlayer
    error: Error | MediaError
    source: string
    recoverable: boolean
  }
}

export interface VideoPlayerStateChangeEvent extends CustomEvent {
  detail: {
    player: DashVideoPlayer
    previousState: Partial<VideoPlayerState>
    currentState: VideoPlayerState
  }
}

export interface VideoPlayerQualityChangeEvent extends CustomEvent {
  detail: {
    player: DashVideoPlayer
    type: 'video' | 'audio'
    previousQuality: number
    currentQuality: number
    availableQualities: import('./dashjs').BitrateInfo[]
  }
}

// Type guards for video player
export function isDashVideoPlayer(player: unknown): player is DashVideoPlayer {
  return (
    typeof player === 'object' &&
    player !== null &&
    'player' in player &&
    'config' in player &&
    'state' in player &&
    'element' in player
  )
}

export function isHTMLVideoElement(element: unknown): element is HTMLVideoElement {
  return element instanceof HTMLVideoElement
}

export function isMediaError(error: unknown): error is MediaError {
  return error instanceof MediaError
}

export function isValidVideoSource(source: unknown): source is string {
  return typeof source === 'string' && source.length > 0 && /\.(mp4|webm|ogg|mpd)$/i.test(source)
}

// Video player factory
export interface VideoPlayerFactory {
  createDashPlayer(config: DashVideoPlayerConfig): Promise<DashVideoPlayer>
  createHTMLVideoPlayer(config: VideoPlayerConfig): HTMLVideoElement
  validateConfig(config: VideoPlayerConfig | DashVideoPlayerConfig): VideoValidationResult
}

// Global video player types
declare global {
  interface Window {
    dashCache?: VideoPlayerCache
    heroVideoLoaded?: boolean
    videoPlayers?: Map<string, DashVideoPlayer>
  }

  interface DocumentEventMap {
    'video-player-load': VideoPlayerLoadEvent
    'video-player-error': VideoPlayerErrorEvent
    'video-player-state-change': VideoPlayerStateChangeEvent
    'video-player-quality-change': VideoPlayerQualityChangeEvent
    'reduce-motion-change': CustomEvent
    'captions-change': CustomEvent<{ enabled: boolean }>
  }
}

export {}
