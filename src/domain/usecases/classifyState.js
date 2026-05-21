import {LEVELS, THRESHOLDS} from '../../constants/thresholds';
import {createState} from '../models/AirQualityState';

let persistenceCounter = 0;
let pendingLevel = null;

// REACCIÓN INMEDIATA PARA SUBIDAS, LENTA PARA BAJADAS
const PERSISTENCE_UP = 1;    // Reacción inmediata al detectar contaminación
const PERSISTENCE_DOWN = 8;  // Confirmar que el aire realmente se limpió antes de bajar

const getSeverityIndex = (level) => {
  const order = [LEVELS.NORMAL, LEVELS.PROGRESSIVE, LEVELS.COGNITIVE, LEVELS.CRITICAL];
  return order.indexOf(level);
};

export const classifyState = (reading, trend, prevLevel = LEVELS.NORMAL) => {
  let targetLevel = LEVELS.NORMAL;
  let currentTriggers = [];

  const evaluateThreshold = (key) => {
    const gasValue = reading.gases ?? reading.co2 ?? 0;
    let found = false;
    if (gasValue >= THRESHOLDS.GASES[key]) { currentTriggers.push('Gases'); found = true; }
    if (reading.pm1 >= THRESHOLDS.PM1[key]) { currentTriggers.push('PM1'); found = true; }
    if (reading.pm25 >= THRESHOLDS.PM25[key]) { currentTriggers.push('PM2.5'); found = true; }
    if (reading.pm10 >= THRESHOLDS.PM10[key]) { currentTriggers.push('PM10'); found = true; }
    return found;
  };

  if (evaluateThreshold('CRITICO')) targetLevel = LEVELS.CRITICAL;
  else if (evaluateThreshold('RIESGO')) targetLevel = LEVELS.COGNITIVE;
  else if (evaluateThreshold('MODERADO')) targetLevel = LEVELS.PROGRESSIVE;

  // Si el nivel es el mismo, reseteamos y devolvemos con triggers actuales
  if (targetLevel === prevLevel) {
    persistenceCounter = 0;
    pendingLevel = null;
    return createState(prevLevel, currentTriggers);
  }

  // Manejo de persistencia para cambios
  if (targetLevel !== pendingLevel) {
    pendingLevel = targetLevel;
    persistenceCounter = 1;
  } else {
    persistenceCounter++;
  }

  const isWorsening = getSeverityIndex(targetLevel) > getSeverityIndex(prevLevel);
  const requiredCount = isWorsening ? PERSISTENCE_UP : PERSISTENCE_DOWN;

  if (persistenceCounter >= requiredCount) {
    const finalLevel = pendingLevel;
    const finalTriggers = [...currentTriggers];
    persistenceCounter = 0;
    pendingLevel = null;
    return createState(finalLevel, finalTriggers);
  }

  // Mientras espera, ya empezamos a mostrar los triggers que causarán el cambio
  return createState(prevLevel, currentTriggers);
};
