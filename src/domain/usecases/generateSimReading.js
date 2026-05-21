import seedrandom from 'seedrandom';
import {createReading} from '../models/Reading';
import {SCENARIOS} from '../../constants/scenarios';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const buildScenarioRng = scenarioId =>
  seedrandom(`scenario-${scenarioId}`);

export const generateSimReading = ({scenarioId, prevReading, tick, rng}) => {
  const scenario = SCENARIOS[scenarioId];
  if (!scenario) {
    throw new Error('Scenario not found');
  }
  const {base, drift, ventilationEvery, ventilationDrop, max} = scenario;

  const prev =
    prevReading ||
    createReading({
      gases: base.gases,
      pm25: base.pm25,
    });

  const shouldVentilate = tick !== 0 && tick % ventilationEvery === 0;
  const ventilationImpulse = shouldVentilate ? rng() : 0;

  const gasesDelta =
    randomBetween(drift.gases[0], drift.gases[1], rng) + sinusoidal(tick, 12);
  const pmDelta =
    randomBetween(drift.pm25[0], drift.pm25[1], rng) +
    sinusoidal(tick, 18) * 0.2;

  const nextGases = clamp(
    prev.gases + gasesDelta - ventilationImpulse * ventilationDrop.gases,
    base.gases - 100,
    max.gases,
  );

  const nextPm = clamp(
    prev.pm25 + pmDelta - ventilationImpulse * ventilationDrop.pm25,
    Math.max(2, base.pm25 - 8),
    max.pm25,
  );

  return createReading({
    timestamp: Date.now(),
    gases: Number(nextGases.toFixed(1)),
    pm1: Number((nextPm * 0.6).toFixed(1)), // Estimación simulación
    pm25: Number(nextPm.toFixed(1)),
    pm10: Number((nextPm * 1.8).toFixed(1)), // Estimación simulación
  });
};

const randomBetween = (min, max, rng) => min + rng() * (max - min);
const sinusoidal = (tick, period) => Math.sin((2 * Math.PI * tick) / period);
