import {createTrend} from '../models/Trend';

const MIN_SLOPE = 0.05; // ppm o ug/m3 por muestra para considerar movimiento

export const getTrend = (history = [], window = 5, prevTrend) => {
  if (!history.length || history.length < 2) {
    return prevTrend || createTrend();
  }
  const slice = history.slice(-window);
  const first = slice[0];
  const last = slice[slice.length - 1];

  // Calculamos pendientes para los 4 sensores
  const gasesSlope = (last.gases - first.gases) / slice.length;
  const pm1Slope = (last.pm1 - first.pm1) / slice.length;
  const pm25Slope = (last.pm25 - first.pm25) / slice.length;
  const pm10Slope = (last.pm10 - first.pm10) / slice.length;

  // Se considera tendencia al alza si cualquiera de los sensores críticos sube significativamente
  const rising = gasesSlope > MIN_SLOPE || pm1Slope > MIN_SLOPE || pm25Slope > MIN_SLOPE;
  const falling = gasesSlope < -MIN_SLOPE && pm25Slope < -MIN_SLOPE; // Caída requiere consenso para ser estable

  const direction = rising ? 'up' : falling ? 'down' : 'flat';
  const streakUp = direction === 'up' ? (prevTrend?.streakUp || 0) + 1 : 0;
  const streakDown = direction === 'down' ? (prevTrend?.streakDown || 0) + 1 : 0;

  return createTrend(
    direction,
    gasesSlope,
    pm1Slope,
    pm25Slope,
    pm10Slope,
    streakUp,
    streakDown
  );
};
