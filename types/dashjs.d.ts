// Type definitions for DASH.js 5.0.2
// Project: https://github.com/Dash-Industry-Forum/dash.js
// Definitions by: Team Blaeu <https://blaeu.com>

declare module 'dashjs' {
  export interface MediaPlayer {
    initialize(
      element: HTMLElement,
      source?: string,
      autoPlay?: boolean
    ): void;
    attachView(element: HTMLElement): void;
    attachSource(source: string): void;
    reset(): void;
    destroy(): void;
    play(): void;
    pause(): void;
    isPaused(): boolean;
    seek(value: number): void;
    isSeeking(): boolean;
    setMute(mute: boolean): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;
    getDuration(): number;
    time(streamId?: string): number;
    timeAsUTC(): number;
    isReady(): boolean;
    on(type: string, listener: Function, scope?: any): void;
    off(type: string, listener: Function, scope?: any): void;
    trigger(type: string, data?: any): void;
    getVideoElement(): HTMLVideoElement;
    getSource(): string;
    setAutoPlay(autoPlay: boolean): void;
    getAutoPlay(): boolean;
    getBitrateInfoListFor(type: string): BitrateInfo[];
    getQualityFor(type: string): number;
    setQualityFor(type: string, quality: number): void;
    updateSettings(settings: any): void;
    setStorageController(controller: StorageController): void;
    setXHRLoader(loader: XHRLoader): void;
  }

  export interface MediaPlayerFactory {
    create(
      context?: any,
      source?: string,
      autoPlay?: boolean
    ): MediaPlayer;
  }

  export interface BitrateInfo {
    qualityIndex: number;
    bitrate: number;
    width?: number;
    height?: number;
    scanType?: string;
  }

  export interface StorageController {
    getSavedMediaSettings(): any;
    saveMediaSettings(settings: any): void;
    release(): void;
  }

  export interface XHRLoader {
    load(config: XHRLoaderConfig): Promise<XHRLoaderResponse>;
  }

  export interface XHRLoaderConfig {
    method?: string;
    request?: {
      url: string;
    };
    responseType?: string;
    headers?: Record<string, string>;
    data?: any;
  }

  export interface XHRLoaderResponse {
    url: string;
    data: any;
    responseType: string;
    status: number;
  }

  export const MediaPlayerFactory: MediaPlayerFactory;
  export const Storage: StorageController;
}

declare global {
  interface Window {
    dashjs?: typeof import('dashjs');
  }
}