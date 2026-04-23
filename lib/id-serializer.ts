/**
 * ID Serialization Utilities
 * Handles generation and parsing of prefixed IDs with timestamps
 */

/**
 * Generates a unique ID with prefix and value
 * @param prefix - The prefix for the ID
 * @param value - The value to append to the prefix
 * @returns A string in format "prefix-value-timestamp"
 */
export function generateId(prefix: string, value: string): string {
  return `${prefix}-${value}-${Date.now()}`;
}

/**
 * Parses a generated ID to extract the value without prefix and timestamp
 * @param id - The full ID string in format "prefix-value-timestamp"
 * @param prefix - The prefix to remove from the ID
 * @returns The value part without prefix and timestamp
 */
export function parseId(id: string, prefix: string): string {
  // Remove prefix with dash
  const prefixWithDash = `${prefix}-`;
  const withoutPrefix = id.startsWith(prefixWithDash) ? id.slice(prefixWithDash.length) : id;
  
  // Remove timestamp (everything after the last dash)
  const lastDashIndex = withoutPrefix.lastIndexOf('-');
  if (lastDashIndex === -1) {
    return withoutPrefix; // No timestamp found, return as is
  }
  
  return withoutPrefix.slice(0, lastDashIndex);
}

/**
 * Extracts the timestamp from a generated ID
 * @param id - The full ID string in format "prefixvalue-timestamp"
 * @returns The timestamp part of the ID
 */
export function extractTimestamp(id: string): string {
  const lastDashIndex = id.lastIndexOf('-');
  if (lastDashIndex === -1) {
    return ''; // No timestamp found
  }
  
  return id.slice(lastDashIndex + 1);
}

/**
 * Validates if an ID follows the expected format
 * @param id - The ID to validate
 * @param prefix - Expected prefix
 * @returns True if the ID format is valid
 */
export function isValidId(id: string, prefix: string): boolean {
  if (!id.startsWith(prefix)) {
    return false;
  }
  
  const timestamp = extractTimestamp(id);
  const timestampNum = parseInt(timestamp, 10);
  
  return !isNaN(timestampNum) && timestampNum > 0;
}

/**
 * ID serialization interface for type safety
 */
export interface IdSerializer {
  generate: (value: string) => string;
  parse: (id: string) => string;
  extractTimestamp: (id: string) => string;
  isValid: (id: string) => boolean;
}

/**
 * Creates an ID serializer with a specific prefix
 * @param prefix - The prefix to use for all IDs
 * @returns An ID serializer object with methods for the prefix
 */
export function createIdSerializer(prefix: string): IdSerializer {
  return {
    generate: (value: string) => generateId(prefix, value),
    parse: (id: string) => parseId(id, prefix),
    extractTimestamp: (id: string) => extractTimestamp(id),
    isValid: (id: string) => isValidId(id, prefix),
  };
}
