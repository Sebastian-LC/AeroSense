export const LEVELS = {
  NORMAL: 'normal',
  PROGRESSIVE: 'progressive',
  COGNITIVE: 'cognitive',
  CRITICAL: 'critical',
};

export const THRESHOLDS = {
  GASES: { // Antes CO2, ahora Gases (MQ135) - Medida de VOCs/Calidad de Aire
    MODERADO: 600,
    RIESGO: 800,
    CRITICO: 1200,
  },
  PM1: {
    MODERADO: 10,
    RIESGO: 20,
    CRITICO: 30,
  },
  PM25: {
    MODERADO: 12,
    RIESGO: 35,
    CRITICO: 55,
  },
  PM10: {
    MODERADO: 40,
    RIESGO: 80,
    CRITICO: 120,
  },
};

export const LEVEL_COLORS = {
  [LEVELS.NORMAL]: '#2ecc71',
  [LEVELS.PROGRESSIVE]: '#f1c40f',
  [LEVELS.COGNITIVE]: '#e67e22',
  [LEVELS.CRITICAL]: '#e74c3c',
};

export const LEVEL_LABELS = {
  [LEVELS.NORMAL]: 'Aire Limpio',
  [LEVELS.PROGRESSIVE]: 'Calidad Moderada',
  [LEVELS.COGNITIVE]: 'Mala Calidad',
  [LEVELS.CRITICAL]: 'Alerta de Riesgo',
};
