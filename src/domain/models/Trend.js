/**
 * @typedef {Object} Trend
 * @property {'up'|'down'|'flat'} direction
 * @property {number} co2Slope
 * @property {number} pmSlope
 * @property {number} streakUp
 * @property {number} streakDown
 */

export const createTrend = (
  direction = 'flat',
  co2Slope = 0,
  pmSlope = 0,
  streakUp = 0,
  streakDown = 0,
) => ({
  direction,
  co2Slope,
  pmSlope,
  streakUp,
  streakDown,
});
