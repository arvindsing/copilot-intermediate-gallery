import { describe, it, expect } from 'vitest';
import { formatFileSize, validateImageType, calculateAspectRatio, generateFileId } from './image-utils';

describe('formatFileSize', () => {
  it('formats bytes to KB', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
  });

  it('formats bytes to MB', () => {
    expect(formatFileSize(1048576)).toBe('1 MB');
  });

  it('formats bytes to GB', () => {
    expect(formatFileSize(1073741824)).toBe('1 GB');
  });

  it('handles zero bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  it('formats intermediate values correctly', () => {
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(2621440)).toBe('2.5 MB');
  });

  it('formats very large files', () => {
    expect(formatFileSize(1099511627776)).toBe('1 TB');
  });
});

describe('validateImageType', () => {
  it('accepts valid image MIME types', () => {
    expect(validateImageType('image/jpeg')).toBe(true);
    expect(validateImageType('image/jpg')).toBe(true);
    expect(validateImageType('image/png')).toBe(true);
    expect(validateImageType('image/webp')).toBe(true);
    expect(validateImageType('image/gif')).toBe(true);
    expect(validateImageType('image/svg+xml')).toBe(true);
  });

  it('rejects invalid MIME types', () => {
    expect(validateImageType('application/pdf')).toBe(false);
    expect(validateImageType('text/plain')).toBe(false);
    expect(validateImageType('video/mp4')).toBe(false);
    expect(validateImageType('audio/mpeg')).toBe(false);
  });

  it('handles case insensitivity', () => {
    expect(validateImageType('IMAGE/JPEG')).toBe(true);
    expect(validateImageType('Image/Png')).toBe(true);
  });

  it('rejects empty or invalid strings', () => {
    expect(validateImageType('')).toBe(false);
    expect(validateImageType('invalid')).toBe(false);
  });
});

describe('calculateAspectRatio', () => {
  it('calculates common aspect ratios', () => {
    expect(calculateAspectRatio(1920, 1080)).toBe('16:9');
    expect(calculateAspectRatio(1280, 720)).toBe('16:9');
    expect(calculateAspectRatio(1024, 768)).toBe('4:3');
    expect(calculateAspectRatio(800, 600)).toBe('4:3');
  });

  it('handles square images', () => {
    expect(calculateAspectRatio(1000, 1000)).toBe('1:1');
    expect(calculateAspectRatio(500, 500)).toBe('1:1');
  });

  it('handles portrait orientation', () => {
    expect(calculateAspectRatio(1080, 1920)).toBe('9:16');
    expect(calculateAspectRatio(768, 1024)).toBe('3:4');
  });

  it('handles unusual aspect ratios', () => {
    expect(calculateAspectRatio(2560, 1080)).toBe('64:27');
    expect(calculateAspectRatio(1000, 333)).toBe('1000:333');
  });
});

describe('generateFileId', () => {
  it('generates a unique ID', () => {
    const id1 = generateFileId();
    const id2 = generateFileId();

    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });

  it('generates IDs with expected format', () => {
    const id = generateFileId();

    expect(id).toMatch(/^\d+-[a-z0-9]+$/);
  });

  it('generates multiple unique IDs', () => {
    const ids = Array.from({ length: 100 }, () => generateFileId());
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(100);
  });
});
