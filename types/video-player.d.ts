/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

// Type definitions for video player functionality

import type { MediaPlayer } from './dashjs'

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

export interface VideoPlayerMetrics {
  readonly loadTime: number
  readonly bufferHealth: number
  readonly droppedFrames: number
  readonly averageBitrate: number
  readonly stallCount: number
  readonly errorCount: number
}

declare global {
  interface Window {
    dashCache?: VideoPlayerCache
    heroVideoLoaded?: boolean
  }
}

export {}
