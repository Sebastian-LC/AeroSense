import {LEVELS, CO2_THRESHOLDS, PM25_THRESHOLDS} from '../../constants/thresholds';
import {createState} from '../models/AirQualityState';

const severityScore = level => {
  switch (level) {
    case LEVELS.CRITICAL:
      return 3;
    case LEVELS.COGNITIVE:
      return 2;
    case LEVELS.PROGRESSIVE:
      return 1;
    default:
      return 0;
  }
};

const levelFromValue = (value, thresholds) => {
  if (value > thresholds.medium) return LEVELS.CRITICAL;
  if (value >= thresholds.normal) return LEVELS.COGNITIVE;
  return LEVELS.NORMAL;
};

export const classifyState = (reading, trend, prevLevel = LEVELS.NORMAL) => {
  const co2Level = levelFromValue(reading.co2, CO2_THRESHOLDS);
  const pmLevel = levelFromValue(reading.pm25, PM25_THRESHOLDS);
  let level = severityScore(co2Level) >= severityScore(pmLevel)
    ? co2Level
    : pmLevel;

  const nextBandCo2 = level === LEVELS.NORMAL ? CO2_THRESHOLDS.normal : CO2_THRESHOLDS.medium;
  const nextBandPm = level === LEVELS.NORMAL ? PM25_THRESHOLDS.normal : PM25_THRESHOLDS.medium;

  const nearUpperBand =
    (reading.co2 >= nextBandCo2 * 0.8) || (reading.pm25 >= nextBandPm * 0.8);

  if (trend?.direction === 'up' && nearUpperBand) {
    // escalate one level if possible
    const currentScore = severityScore(level);
    if (currentScore < 3) {
      level = Object.values(LEVELS)[currentScore + 1];
    }
  }

  if (trend?.direction === 'down' && trend?.streakDown >= 3) {
    const currentScore = severityScore(level);
    if (currentScore > 0) {
      level = Object.values(LEVELS)[currentScore - 1];
    }
  }

  // prevent oscillation: if small drift, keep previous level unless big jump
  if (trend?.direction === 'flat') {
    level = severityScore(level) > severityScore(prevLevel) ? level : prevLevel;
  }

  return createState(level);
};
