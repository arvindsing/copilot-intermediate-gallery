/**
 * Format file size in bytes to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Validate if a MIME type is a valid image type
 */
export function validateImageType(mimeType: string): boolean {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ];

  return validTypes.includes(mimeType.toLowerCase());
}

/**
 * Calculate aspect ratio from width and height
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

/**
 * Generate a unique ID for uploaded files
 */
export function generateFileId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
