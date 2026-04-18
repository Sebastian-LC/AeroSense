import {createTrend} from '../models/Trend';

const MIN_SLOPE = 0.05; // ppm or ug/m3 per sample to be considered moving

export const getTrend = (history = [], window = 5, prevTrend) => {
  if (!history.length || history.length < 2) {
    return prevTrend || createTrend();
  }
  const slice = history.slice(-window);
  const first = slice[0];
  const last = slice[slice.length - 1];
  const co2Slope = (last.co2 - first.co2) / slice.length;
  const pmSlope = (last.pm25 - first.pm25) / slice.length;

  const rising = co2Slope > MIN_SLOPE && pmSlope > MIN_SLOPE;
  const falling = co2Slope < -MIN_SLOPE && pmSlope < -MIN_SLOPE;

  const direction = rising ? 'up' : falling ? 'down' : 'flat';
  const streakUp = direction === 'up' ? (prevTrend?.streakUp || 0) + 1 : 0;
  const streakDown =
    direction === 'down' ? (prevTrend?.streakDown || 0) + 1 : 0;

  return createTrend(direction, co2Slope, pmSlope, streakUp, streakDown);
};
