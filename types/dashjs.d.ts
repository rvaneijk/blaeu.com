/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

// Type definitions for DASH.js 5.0.2

declare module 'dashjs' {
  export interface MediaPlayer {
    initialize(element: HTMLElement, source?: string, autoPlay?: boolean): void
    attachView(element: HTMLElement | null): void
    attachSource(source: string): void
    reset(): void
    destroy(): void
    play(): void
    pause(): void
    isPaused(): boolean
    seek(value: number): void
    isSeeking(): boolean
    setMute(mute: boolean): void
    isMuted(): boolean
    setVolume(volume: number): void
    getVolume(): number
    getDuration(): number
    time(streamId?: string): number
    timeAsUTC(): number
    isReady(): boolean
    on(type: string, listener: Function, scope?: object): void
    off(type: string, listener: Function, scope?: object): void
    trigger(type: string, data?: unknown): void
    getVideoElement(): HTMLVideoElement
    getSource(): string
    setAutoPlay(autoPlay: boolean): void
    getAutoPlay(): boolean
    getBitrateInfoListFor(type: 'video' | 'audio'): BitrateInfo[]
    getQualityFor(type: 'video' | 'audio'): number
    setQualityFor(type: 'video' | 'audio', quality: number): void
    updateSettings(settings: DashJSSettings): void
    getSettings(): DashJSSettings
    setInitialMediaSettingsFor(type: 'video' | 'audio', value: unknown): void
    setFastSwitchEnabled(value: boolean): void
    getFastSwitchEnabled(): boolean
    setMovingAverageMethod(method: string): void
    setABRStrategy(strategy: string): void
    addABRCustomRule(type: string, rulename: string, rule: object): void
    removeABRCustomRule(rulename: string): void
    setLimitBitrateByPortal(value: boolean): void
    getUseDefaultABRRules(): boolean
    setUseDefaultABRRules(value: boolean): void
    setStorageController(controller: StorageController): void
    setXHRLoader(loader: XHRLoader): void
    setTextTrack(index: number): void
  }

  export interface MediaPlayerFactory {
    create(context?: object, source?: string, autoPlay?: boolean): MediaPlayer
  }

  export interface BitrateInfo {
    qualityIndex: number
    bitrate: number
    width?: number
    height?: number
    scanType?: string
  }

  export interface StorageController {
    getSavedMediaSettings(): Record<string, unknown>
    saveMediaSettings(settings: Record<string, unknown>): void
    release(): void
  }

  export interface XHRLoader {
    load(config: XHRLoaderConfig): Promise<XHRLoaderResponse>
  }

  export interface XHRLoaderConfig {
    method?: string
    request?: {
      url: string
    }
    responseType?: string
    headers?: Record<string, string>
    data?: unknown
  }

  export interface XHRLoaderResponse {
    url: string
    data: unknown
    responseType: string
    status: number
  }

  export interface DashJSSettings {
    streaming?: {
      buffer?: {
        bufferTimeAtTopQuality?: number
        bufferTimeAtTopQualityLongForm?: number
        initialBufferLevel?: number
        stableBufferTime?: number
        fastSwitchEnabled?: boolean
      }
      abr?: {
        ABRStrategy?: string
        limitBitrateByPortal?: boolean
        useDefaultABRRules?: boolean
        bandwidthSafetyFactor?: number
        usePixelRatioInLimitBitrateByPortal?: boolean
      }
      text?: {
        defaultEnabled?: boolean
      }
      scheduling?: {
        scheduleWhilePaused?: boolean
      }
    }
    errors?: {
      recoverAttempts?: {
        mediaErrorDecode?: number
      }
    }
  }

  export interface DashJSEventData {
    type: string
    data?: unknown
    error?: Error
    request?: Record<string, unknown>
    response?: Record<string, unknown>
  }

  export const MediaPlayerFactory: MediaPlayerFactory
  export const Storage: StorageController
}

declare global {
  interface Window {
    dashjs?: typeof import('dashjs') | Record<string, unknown>
  }
}
