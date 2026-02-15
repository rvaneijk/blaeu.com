/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

// Type definitions for error handling and boundaries

export interface ErrorContext {
  readonly component?: string
  readonly action?: string
  readonly user?: string
  readonly timestamp?: Date
  readonly url?: string
  readonly userAgent?: string
  readonly additional?: Record<string, unknown>
}

export interface ErrorDetails {
  readonly message: string
  readonly stack?: string
  readonly code?: string | number
  readonly severity: ErrorSeverity
  readonly category: ErrorCategory
  readonly context: ErrorContext
  readonly recoverable: boolean
}

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'
export type ErrorCategory =
  | 'network'
  | 'validation'
  | 'permission'
  | 'media'
  | 'accessibility'
  | 'ui'
  | 'api'
  | 'configuration'
  | 'unknown'

export interface ErrorHandler {
  error(message: string, error?: Error | unknown, context?: ErrorContext): void
  warning(message: string, error?: Error | unknown, context?: ErrorContext): void
  info(message: string, context?: ErrorContext): void
  debug(message: string, context?: ErrorContext): void
  capture(error: Error, details: Partial<ErrorDetails>): void
  handleUnhandledRejection(event: PromiseRejectionEvent): void
  handleGlobalError(event: ErrorEvent): void
}

export interface ErrorReporter {
  report(error: ErrorDetails): Promise<void>
  reportBatch(errors: ErrorDetails[]): Promise<void>
  flush(): Promise<void>
  setEnabled(enabled: boolean): void
  isEnabled(): boolean
}

export interface ErrorRecovery {
  canRecover(error: Error, context: ErrorContext): boolean
  recover(error: Error, context: ErrorContext): Promise<boolean>
  getRecoveryStrategy(error: Error): RecoveryStrategy | null
  registerRecoveryStrategy(errorType: string, strategy: RecoveryStrategy): void
}

export interface RecoveryStrategy {
  readonly name: string
  readonly maxAttempts: number
  readonly delay: number
  readonly exponentialBackoff: boolean
  canHandle(error: Error, context: ErrorContext): boolean
  execute(error: Error, context: ErrorContext, attempt: number): Promise<boolean>
}

export interface ErrorBoundary {
  readonly hasError: boolean
  readonly error: Error | null
  readonly errorDetails: ErrorDetails | null

  captureError(error: Error, context: ErrorContext): void
  reset(): void
  retry(): Promise<void>
  canRetry(): boolean
}

export interface NetworkErrorDetails extends ErrorDetails {
  readonly category: 'network'
  readonly status?: number
  readonly statusText?: string
  readonly url?: string
  readonly method?: string
  readonly timeout?: boolean
  readonly offline?: boolean
}

export interface MediaErrorDetails extends ErrorDetails {
  readonly category: 'media'
  readonly mediaError?: MediaError
  readonly source?: string
  readonly currentTime?: number
  readonly duration?: number
  readonly networkState?: number
  readonly readyState?: number
}

export interface ValidationErrorDetails extends ErrorDetails {
  readonly category: 'validation'
  readonly field?: string
  readonly value?: unknown
  readonly rule?: string
  readonly expectedType?: string
}

export interface AccessibilityErrorDetails extends ErrorDetails {
  readonly category: 'accessibility'
  readonly feature?: string
  readonly setting?: string
  readonly element?: string
  readonly wcagGuideline?: string
}

export interface UIErrorDetails extends ErrorDetails {
  readonly category: 'ui'
  readonly element?: string
  readonly action?: string
  readonly state?: Record<string, unknown>
}

// Error event types
export interface ErrorBoundaryEvent extends CustomEvent {
  detail: {
    error: Error
    errorDetails: ErrorDetails
    boundary: string
    recovered: boolean
  }
}

export interface ErrorRecoveryEvent extends CustomEvent {
  detail: {
    error: Error
    strategy: string
    attempt: number
    success: boolean
    duration: number
  }
}

export interface ErrorReportEvent extends CustomEvent {
  detail: {
    error: ErrorDetails
    reported: boolean
    reportId?: string
  }
}

// Error type guards
export function isNetworkError(error: unknown): error is NetworkErrorDetails {
  return (
    typeof error === 'object' &&
    error !== null &&
    'category' in error &&
    (error as ErrorDetails).category === 'network'
  )
}

export function isMediaError(error: unknown): error is MediaErrorDetails {
  return (
    typeof error === 'object' &&
    error !== null &&
    'category' in error &&
    (error as ErrorDetails).category === 'media'
  )
}

export function isValidationError(error: unknown): error is ValidationErrorDetails {
  return (
    typeof error === 'object' &&
    error !== null &&
    'category' in error &&
    (error as ErrorDetails).category === 'validation'
  )
}

export function isAccessibilityError(error: unknown): error is AccessibilityErrorDetails {
  return (
    typeof error === 'object' &&
    error !== null &&
    'category' in error &&
    (error as ErrorDetails).category === 'accessibility'
  )
}

export function isUIError(error: unknown): error is UIErrorDetails {
  return (
    typeof error === 'object' &&
    error !== null &&
    'category' in error &&
    (error as ErrorDetails).category === 'ui'
  )
}

export function isRecoverableError(error: ErrorDetails): boolean {
  return error.recoverable && error.severity !== 'critical'
}

export function isCriticalError(error: ErrorDetails): boolean {
  return error.severity === 'critical'
}

// Error factory functions
export interface ErrorFactory {
  createNetworkError(
    message: string,
    status?: number,
    url?: string,
    context?: ErrorContext
  ): NetworkErrorDetails

  createMediaError(
    message: string,
    mediaError?: MediaError,
    source?: string,
    context?: ErrorContext
  ): MediaErrorDetails

  createValidationError(
    message: string,
    field?: string,
    value?: unknown,
    context?: ErrorContext
  ): ValidationErrorDetails

  createAccessibilityError(
    message: string,
    feature?: string,
    setting?: string,
    context?: ErrorContext
  ): AccessibilityErrorDetails

  createUIError(
    message: string,
    element?: string,
    action?: string,
    context?: ErrorContext
  ): UIErrorDetails
}

// Global error handling
declare global {
  interface Window {
    errorHandler?: ErrorHandler
    errorReporter?: ErrorReporter
    errorRecovery?: ErrorRecovery
    errorBoundaries?: Map<string, ErrorBoundary>
  }

  interface DocumentEventMap {
    'error-boundary': ErrorBoundaryEvent
    'error-recovery': ErrorRecoveryEvent
    'error-report': ErrorReportEvent
  }

  interface WindowEventMap {
    unhandledrejection: PromiseRejectionEvent
    error: ErrorEvent
  }
}

export {}
