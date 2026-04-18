import {
  generateSimReading,
  buildScenarioRng,
} from '../../../domain/usecases/generateSimReading';
import {DEFAULT_SCENARIO} from '../../../constants/scenarios';

const TICK_MS = 2000; // Forzado a 2s para la presentación (incluso en Release)

export class SimulationDataSource {
  constructor(scenarioId = DEFAULT_SCENARIO) {
    this.scenarioId = scenarioId;
    this.rng = buildScenarioRng(scenarioId);
    this.tick = 0;
    this.lastReading = null;
    this.timer = null;
  }

  setScenario(id) {
    this.scenarioId = id;
    this.rng = buildScenarioRng(id);
    this.tick = 0;
  }

  getData() {
    this.lastReading = generateSimReading({
      scenarioId: this.scenarioId,
      prevReading: this.lastReading,
      tick: this.tick,
      rng: this.rng,
    });
    this.tick += 1;
    return this.lastReading;
  }

  subscribe(callback) {
    // emit immediately
    callback(this.getData());
    this.timer = setInterval(() => {
      const reading = this.getData();
      callback(reading);
    }, TICK_MS);

    return () => {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = null;
    };
  }
}
