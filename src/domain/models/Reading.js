/**
 * @typedef {Object} Reading
 * @property {number} timestamp - ms epoch
 * @property {number} co2 - ppm
 * @property {number} pm25 - µg/m³
 */

export const createReading = (partial = {}) => ({
  timestamp: partial.timestamp ?? Date.now(),
  co2: partial.co2 ?? 0,
  pm25: partial.pm25 ?? 0,
});
