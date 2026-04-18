import {create} from 'zustand';
import {SimulationDataSource} from '../../data/datasources/simulation/SimulationDataSource';
import {FirebaseDataSource} from '../../data/datasources/firebase/FirebaseDataSource';
import {AirQualityRepositoryImpl} from '../../data/repositories/AirQualityRepositoryImpl';
import {getTrend} from '../../domain/usecases/getTrend';
import {classifyState} from '../../domain/usecases/classifyState';
import {onStateChangeNotify} from '../../domain/usecases/onStateChangeNotify';
import {DEFAULT_SCENARIO} from '../../constants/scenarios';
import {LEVELS} from '../../constants/thresholds';

const repository = new AirQualityRepositoryImpl();

const buildDataSource = (type, scenario) => {
  if (type === 'firebase') {
    return new FirebaseDataSource();
  }
  return new SimulationDataSource(scenario);
};

export const useAirQualityStore = create((set, get) => ({
  scenario: DEFAULT_SCENARIO,
  dataSourceType: 'simulation',
  currentReading: null,
  history: [],
  trend: null,
  status: null,
  lastNotifiedStatus: null,
  notificationsEnabled: false,
  streamCleanup: null,

  setNotificationsEnabled: value => set({notificationsEnabled: value}),

  switchScenario: scenarioId => {
    const {dataSourceType} = get();
    set({scenario: scenarioId});
    if (dataSourceType === 'simulation') {
      get().startStream('simulation', scenarioId);
    }
  },

  switchDataSource: type => {
    set({dataSourceType: type});
    get().startStream(type, get().scenario);
  },

  startStream: (type, scenarioId = DEFAULT_SCENARIO) => {
    const {streamCleanup} = get();
    if (streamCleanup) {
      streamCleanup();
    }

    const source = buildDataSource(type, scenarioId);

    const cleanup = source.subscribe(async reading => {
      console.log(`[DATA] Nueva lectura recibida (${type}):`, reading);
      const {history, status, notificationsEnabled, lastNotifiedStatus} = get();
      const nextHistory = [...history.slice(-499), reading];
      const trend = getTrend(nextHistory, 5, get().trend);
      const newState = classifyState(
        reading,
        trend,
        status?.level ?? LEVELS.NORMAL,
      );
      set({
        currentReading: reading,
        history: nextHistory,
        trend,
        status: newState,
      });
      // Persist simulation to Firestore (best effort)
      repository.saveReading(reading, newState);

      const notifiedLevel = await onStateChangeNotify(
        newState,
        reading,
        lastNotifiedStatus,
        notificationsEnabled,
      );
      if (notifiedLevel !== lastNotifiedStatus) {
        set({lastNotifiedStatus: notifiedLevel});
      }
    });

    set({streamCleanup: cleanup});
  },

  stopStream: () => {
    const {streamCleanup} = get();
    if (streamCleanup) {
      streamCleanup();
    }
    set({streamCleanup: null});
  },

  fetchHistory: async () => {
    const items = await repository.getHistory(200);
    const sorted = items.sort((a, b) => a.timestamp - b.timestamp);
    set({history: sorted});
  },
}));
