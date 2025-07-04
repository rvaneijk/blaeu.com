import { URLValidator, sanitizeString, sanitizeTitle, sanitizeDescription } from '../utils/validation.ts';

describe('URL Validation', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        origin: 'https://blaeu.com'
      }
    });
  });

  describe('URLValidator.validateURL', () => {
    test('should validate valid URLs', () => {
      const result = URLValidator.validateURL('https://blaeu.com/test');
      expect(result.isValid).toBe(true);
    });

    test('should reject empty URLs', () => {
      const result = URLValidator.validateURL('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('URL must be a non-empty string');
    });

    test('should reject non-string URLs', () => {
      const result = URLValidator.validateURL(null);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('URL must be a non-empty string');
    });

    test('should reject malformed URLs', () => {
      const result = URLValidator.validateURL('not-a-url');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid URL format');
    });
  });

  describe('URLValidator.validateImageSource', () => {
    test('should validate trusted domain images', () => {
      const result = URLValidator.validateImageSource('https://blaeu.com/assets/img/test.webp');
      expect(result.isValid).toBe(true);
    });

    test('should reject untrusted domains', () => {
      const result = URLValidator.validateImageSource('https://malicious.com/image.png');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Domain not in trusted list');
    });

    test('should reject invalid file extensions', () => {
      const result = URLValidator.validateImageSource('https://blaeu.com/file.txt');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('File extension not allowed for images');
    });

    test('should accept all allowed image extensions', () => {
      const extensions = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
      extensions.forEach(ext => {
        const result = URLValidator.validateImageSource(`https://blaeu.com/image${ext}`);
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('URLValidator.validateVideoSource', () => {
    test('should validate trusted domain videos', () => {
      const result = URLValidator.validateVideoSource('https://blaeu.com/video.mp4');
      expect(result.isValid).toBe(true);
    });

    test('should accept DASH manifest files', () => {
      const result = URLValidator.validateVideoSource('https://blaeu.com/video.mpd');
      expect(result.isValid).toBe(true);
    });

    test('should reject untrusted domains for videos', () => {
      const result = URLValidator.validateVideoSource('https://malicious.com/video.mp4');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Domain not in trusted list');
    });
  });

  describe('URLValidator.validateExternalLink', () => {
    test('should validate LinkedIn URLs', () => {
      const result = URLValidator.validateExternalLink('https://linkedin.com/in/test');
      expect(result.isValid).toBe(true);
    });

    test('should validate web.archive.org URLs', () => {
      const result = URLValidator.validateExternalLink('https://web.archive.org/web/20240510101630/https://example.com');
      expect(result.isValid).toBe(true);
    });

    test('should reject untrusted external domains', () => {
      const result = URLValidator.validateExternalLink('https://malicious.com');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('External domain not in trusted list');
    });
  });
});

describe('XSS Prevention', () => {
  describe('sanitizeString', () => {
    test('should remove script tags', () => {
      const malicious = '<script>alert("xss")</script>Hello';
      const result = sanitizeString(malicious);
      expect(result).toBe('scriptalert("xss")/scriptHello');
    });

    test('should remove javascript: URLs', () => {
      const malicious = 'javascript:alert("xss")';
      const result = sanitizeString(malicious);
      expect(result).toBe('alert("xss")');
    });

    test('should remove data: URLs', () => {
      const malicious = 'data:text/html,<script>alert("xss")</script>';
      const result = sanitizeString(malicious);
      expect(result).toBe('text/html,scriptalert("xss")/script');
    });

    test('should remove vbscript: URLs', () => {
      const malicious = 'vbscript:msgbox("xss")';
      const result = sanitizeString(malicious);
      expect(result).toBe('msgbox("xss")');
    });

    test('should remove event handlers', () => {
      const malicious = 'onclick=alert("xss")';
      const result = sanitizeString(malicious);
      expect(result).toBe('alert("xss")');
    });

    test('should handle null/undefined input', () => {
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
    });

    test('should handle non-string input', () => {
      expect(sanitizeString(123)).toBe('');
      expect(sanitizeString({})).toBe('');
    });
  });

  describe('sanitizeTitle', () => {
    test('should limit title length to 200 characters', () => {
      const longTitle = 'a'.repeat(300);
      const result = sanitizeTitle(longTitle);
      expect(result.length).toBe(200);
    });

    test('should allow alphanumeric and common punctuation', () => {
      const title = 'Title with Numbers 123 and Punctuation: Hello, World!';
      const result = sanitizeTitle(title);
      expect(result).toBe('Title with Numbers 123 and Punctuation: Hello, World!');
    });

    test('should remove special characters that could be XSS vectors', () => {
      const maliciousTitle = 'Title<script>alert("xss")</script>';
      const result = sanitizeTitle(maliciousTitle);
      expect(result).toBe('Titlescriptalertxss/script');
    });
  });

  describe('sanitizeDescription', () => {
    test('should limit description length to 500 characters', () => {
      const longDesc = 'a'.repeat(600);
      const result = sanitizeDescription(longDesc);
      expect(result.length).toBe(500);
    });

    test('should sanitize XSS attempts in descriptions', () => {
      const maliciousDesc = 'Description <img src=x onerror=alert("xss")>';
      const result = sanitizeDescription(maliciousDesc);
      expect(result).toBe('Description img srcx alertxss');
    });
  });
});

describe('Edge Cases and Security', () => {
  test('should handle URL with encoded malicious content', () => {
    const encoded = 'https://blaeu.com/%3Cscript%3Ealert%28%22xss%22%29%3C%2Fscript%3E.png';
    const result = URLValidator.validateImageSource(encoded);
    expect(result.isValid).toBe(true); // URL structure is valid, but path contains encoded content
  });

  test('should validate subdomain restrictions', () => {
    const subdomain = 'https://sub.blaeu.com/image.png';
    const result = URLValidator.validateImageSource(subdomain);
    expect(result.isValid).toBe(true); // Should allow subdomains of trusted domains
  });

  test('should reject lookalike domains', () => {
    const lookalike = 'https://blaeu-com-fake.malicious.com/image.png';
    const result = URLValidator.validateImageSource(lookalike);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Domain not in trusted list');
  });

  test('should handle mixed case domains', () => {
    const mixedCase = 'https://BLAEU.COM/image.PNG';
    const result = URLValidator.validateImageSource(mixedCase);
    expect(result.isValid).toBe(true);
  });
});