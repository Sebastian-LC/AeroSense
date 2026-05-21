import {LEVEL_COLORS, LEVELS} from '../../constants/thresholds';

export const createState = (level, triggers = []) => {
  return {
    level,
    label: getDynamicLabel(level, triggers),
    color: LEVEL_COLORS[level],
    message: getStatusMessage(level, triggers),
    triggers,
  };
};

const getDynamicLabel = (level, triggers) => {
  if (level === LEVELS.NORMAL) return 'Aire Limpio';

  if (triggers.length > 0) {
    const mainTrigger = triggers[0]; // Tomamos el principal o el primero detectado
    const suffix = triggers.length > 1 ? ` (+${triggers.length - 1})` : '';

    switch (level) {
      case LEVELS.PROGRESSIVE: return `${mainTrigger} Elevado${suffix}`;
      case LEVELS.COGNITIVE: return `${mainTrigger} en Riesgo${suffix}`;
      case LEVELS.CRITICAL: return `¡Peligro por ${mainTrigger}!${suffix}`;
    }
  }

  return 'Calidad Variable';
};

const getStatusMessage = (level, triggers) => {
  const triggerList = triggers.length > 0 ? triggers.join(', ') : '';

  if (level === LEVELS.NORMAL) {
    return 'Las condiciones son óptimas para trabajar o descansar.';
  }

  // Recomendaciones específicas según el tipo de contaminante
  const hasGases = triggers.includes('Gases');
  const hasPM = triggers.some(t => t.startsWith('PM'));

  let recommendation = '';
  if (hasGases && hasPM) {
    recommendation = 'Se recomienda ventilación cruzada y uso de purificadores.';
  } else if (hasGases) {
    recommendation = 'Abre las ventanas para renovar el aire y reducir compuestos orgánicos.';
  } else if (hasPM) {
    recommendation = 'Evita corrientes de aire externas y considera activar un filtro de aire.';
  }

  switch (level) {
    case LEVELS.CRITICAL:
      return `¡ALERTA EXTREMA! Niveles críticos de ${triggerList}. ${recommendation} Evacue el área si los niveles persisten.`;

    case LEVELS.COGNITIVE:
      return `Nivel de riesgo por ${triggerList}. ${recommendation} Esto puede afectar tu concentración y salud a corto plazo.`;

    case LEVELS.PROGRESSIVE:
      return `Detección de ${triggerList} por encima de lo normal. ${recommendation}`;

    default:
      return 'Calidad del aire aceptable, pero con tendencia a desmejorar.';
  }
};
