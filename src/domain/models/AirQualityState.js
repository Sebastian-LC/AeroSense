import {LEVELS, LEVEL_COLORS, LEVEL_LABELS} from '../../constants/thresholds';

/**
 * @typedef {Object} AirQualityState
 * @property {string} level
 * @property {string} color
 * @property {string} label
 * @property {string} message
 */

export const createState = (level = LEVELS.NORMAL) => ({
  level,
  color: LEVEL_COLORS[level],
  label: LEVEL_LABELS[level],
  message: getMessage(level),
});

const getMessage = level => {
  switch (level) {
    case LEVELS.PROGRESSIVE:
      return 'Aumento gradual detectado, considere ventilar.';
    case LEVELS.COGNITIVE:
      return 'Valores altos, el desempeño cognitivo puede verse afectado.';
    case LEVELS.CRITICAL:
      return 'Riesgo crítico, ventile inmediatamente.';
    default:
      return 'Calidad de aire adecuada.';
  }
};
