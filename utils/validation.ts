/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export class URLValidator {
  private static readonly TRUSTED_DOMAINS = [
    'blaeu.com',
    'localhost',
    'web.archive.org',
    'linkedin.com',
  ]

  private static readonly ALLOWED_IMAGE_EXTENSIONS = [
    '.webp',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
  ]

  private static readonly ALLOWED_VIDEO_EXTENSIONS = [
    '.mp4',
    '.webm',
    '.mpd',
    '.m4s',
    '.m3u8',
    '.vtt',
  ]

  private static readonly ALLOWED_DOCUMENT_EXTENSIONS = ['.pdf', '.doc', '.docx']

  static validateURL(url: string): ValidationResult {
    if (!url || typeof url !== 'string') {
      return { isValid: false, error: 'URL must be a non-empty string' }
    }

    try {
      new URL(url, window.location.origin)
      return { isValid: true }
    } catch (_error) {
      return { isValid: false, error: 'Invalid URL format' }
    }
  }

  static validateImageSource(src: string): ValidationResult {
    const urlValidation = this.validateURL(src)
    if (!urlValidation.isValid) {
      return urlValidation
    }

    try {
      const url = new URL(src, window.location.origin)

      if (!this.isDomainTrusted(url.hostname)) {
        return { isValid: false, error: 'Domain not in trusted list' }
      }

      if (!this.hasAllowedExtension(url.pathname, this.ALLOWED_IMAGE_EXTENSIONS)) {
        return { isValid: false, error: 'File extension not allowed for images' }
      }

      return { isValid: true }
    } catch (_error) {
      return { isValid: false, error: 'URL validation failed' }
    }
  }

  static validateVideoSource(src: string): ValidationResult {
    const urlValidation = this.validateURL(src)
    if (!urlValidation.isValid) {
      return urlValidation
    }

    try {
      const url = new URL(src, window.location.origin)

      if (!this.isDomainTrusted(url.hostname)) {
        return { isValid: false, error: 'Domain not in trusted list' }
      }

      if (!this.hasAllowedExtension(url.pathname, this.ALLOWED_VIDEO_EXTENSIONS)) {
        return { isValid: false, error: 'File extension not allowed for videos' }
      }

      return { isValid: true }
    } catch (_error) {
      return { isValid: false, error: 'URL validation failed' }
    }
  }

  static validateExternalLink(url: string): ValidationResult {
    const urlValidation = this.validateURL(url)
    if (!urlValidation.isValid) {
      return urlValidation
    }

    try {
      const urlObj = new URL(url)

      if (!this.isDomainTrusted(urlObj.hostname)) {
        return { isValid: false, error: 'External domain not in trusted list' }
      }

      return { isValid: true }
    } catch (_error) {
      return { isValid: false, error: 'URL validation failed' }
    }
  }

  static validateDocumentSource(src: string): ValidationResult {
    const urlValidation = this.validateURL(src)
    if (!urlValidation.isValid) {
      return urlValidation
    }

    try {
      const url = new URL(src, window.location.origin)

      if (!this.isDomainTrusted(url.hostname)) {
        return { isValid: false, error: 'Domain not in trusted list' }
      }

      if (!this.hasAllowedExtension(url.pathname, this.ALLOWED_DOCUMENT_EXTENSIONS)) {
        return { isValid: false, error: 'File extension not allowed for documents' }
      }

      return { isValid: true }
    } catch (_error) {
      return { isValid: false, error: 'URL validation failed' }
    }
  }

  private static isDomainTrusted(hostname: string): boolean {
    return this.TRUSTED_DOMAINS.some(
      domain => hostname === domain || hostname.endsWith('.' + domain)
    )
  }

  private static hasAllowedExtension(pathname: string, allowedExtensions: string[]): boolean {
    const lowerPath = pathname.toLowerCase()
    return allowedExtensions.some(ext => lowerPath.endsWith(ext))
  }
}

export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
}

export function sanitizeTitle(title: string): string {
  if (!title || typeof title !== 'string') {
    return ''
  }

  return sanitizeString(title)
    .replace(/[^\w\s\-.,!?()]/g, '')
    .substring(0, 200)
}

export function sanitizeDescription(description: string): string {
  if (!description || typeof description !== 'string') {
    return ''
  }

  return sanitizeString(description)
    .replace(/[^\w\s\-.,!?()]/g, '')
    .substring(0, 500)
}
