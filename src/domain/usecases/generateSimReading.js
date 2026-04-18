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
      co2: base.co2,
      pm25: base.pm25,
    });

  const shouldVentilate = tick !== 0 && tick % ventilationEvery === 0;
  const ventilationImpulse = shouldVentilate ? rng() : 0;

  const co2Delta =
    randomBetween(drift.co2[0], drift.co2[1], rng) + sinusoidal(tick, 12);
  const pmDelta =
    randomBetween(drift.pm25[0], drift.pm25[1], rng) +
    sinusoidal(tick, 18) * 0.2;

  const nextCo2 = clamp(
    prev.co2 + co2Delta - ventilationImpulse * ventilationDrop.co2,
    base.co2 - 150,
    max.co2,
  );

  const nextPm = clamp(
    prev.pm25 + pmDelta - ventilationImpulse * ventilationDrop.pm25,
    Math.max(2, base.pm25 - 8),
    max.pm25,
  );

  return createReading({
    timestamp: Date.now(),
    co2: Number(nextCo2.toFixed(1)),
    pm25: Number(nextPm.toFixed(1)),
  });
};

const randomBetween = (min, max, rng) => min + rng() * (max - min);
const sinusoidal = (tick, period) => Math.sin((2 * Math.PI * tick) / period);
