/**
 * @typedef {Object} Reading
 * @property {number} timestamp - ms epoch
 * @property {number} gases - ppm (MQ135 VOCs/Gases)
 * @property {number} pm1 - µg/m³
 * @property {number} pm25 - µg/m³
 * @property {number} pm10 - µg/m³
 */

export const createReading = (partial = {}) => ({
  timestamp: partial.timestamp ?? Date.now(),
  gases: partial.gases ?? 0,
  pm1: partial.pm1 ?? 0,
  pm25: partial.pm25 ?? 0,
  pm10: partial.pm10 ?? 0,
});
