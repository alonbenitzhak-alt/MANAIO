/**
 * Generates a unique property number for new listings
 * Format: 1948XXXX where XXXX is a random 4-digit number
 * Example: 19481234
 */
export function generatePropertyNumber(): string {
  const randomDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `1948${randomDigits}`;
}
