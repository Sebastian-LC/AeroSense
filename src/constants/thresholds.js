export const CO2_THRESHOLDS = {
  normal: 800,
  medium: 1200,
};

export const PM25_THRESHOLDS = {
  normal: 12,
  medium: 35,
};

export const LEVELS = {
  NORMAL: 'normal',
  PROGRESSIVE: 'progressive',
  COGNITIVE: 'cognitive',
  CRITICAL: 'critical',
};

export const LEVEL_COLORS = {
  [LEVELS.NORMAL]: '#2ecc71',
  [LEVELS.PROGRESSIVE]: '#f1c40f',
  [LEVELS.COGNITIVE]: '#e67e22',
  [LEVELS.CRITICAL]: '#e74c3c',
};

export const LEVEL_LABELS = {
  [LEVELS.NORMAL]: 'Normal',
  [LEVELS.PROGRESSIVE]: 'Saturación progresiva',
  [LEVELS.COGNITIVE]: 'Riesgo cognitivo',
  [LEVELS.CRITICAL]: 'Crítico',
};
