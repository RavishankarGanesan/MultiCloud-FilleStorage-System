
/**
 * Utility functions for file operations
 */

/**
 * Converts bytes to human-readable file size
 */
export const getHumanReadableSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

/**
 * Generates a unique ID for files
 */
export const generateFileId = (): string => {
  return crypto.randomUUID();
};

/**
 * Returns the appropriate icon type for file rendering
 */
export const getFileIconType = (type: string): "image" | "folder" | "document" | "file" => {
  if (type.startsWith('image/')) {
    return "image";
  } else if (type === 'folder') {
    return "folder";
  } else if (type.includes('document') || type.includes('pdf') || type.includes('text')) {
    return "document";
  } else {
    return "file";
  }
};
