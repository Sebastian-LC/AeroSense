/**
 * @typedef {Object} Trend
 * @property {'up'|'down'|'flat'} direction
 * @property {number} gasesSlope
 * @property {number} pm1Slope
 * @property {number} pm25Slope
 * @property {number} pm10Slope
 * @property {number} streakUp
 * @property {number} streakDown
 */

export const createTrend = (
  direction = 'flat',
  gasesSlope = 0,
  pm1Slope = 0,
  pm25Slope = 0,
  pm10Slope = 0,
  streakUp = 0,
  streakDown = 0,
) => ({
  direction,
  gasesSlope,
  pm1Slope,
  pm25Slope,
  pm10Slope,
  streakUp,
  streakDown,
});
