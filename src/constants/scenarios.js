export const SCENARIOS = {
  office_empty: {
    id: 'office_empty',
    label: 'Oficina vacía',
    description: 'Espacio vacío, leve acumulación por mala circulación',
    base: {co2: 550, pm25: 8},
    drift: {co2: [1, 3], pm25: [-0.2, 0.3]},
    ventilationEvery: 18,
    ventilationDrop: {co2: 120, pm25: 4},
    max: {co2: 900, pm25: 15},
  },
  office_busy: {
    id: 'office_busy',
    label: 'Oficina ocupada',
    description: 'Personas trabajando, respiración + equipos elevan CO₂',
    base: {co2: 700, pm25: 12},
    drift: {co2: [8, 18], pm25: [0.4, 1.2]},
    ventilationEvery: 12,
    ventilationDrop: {co2: 180, pm25: 8},
    max: {co2: 1600, pm25: 40},
  },
  poor_ventilation: {
    id: 'poor_ventilation',
    label: 'Mala ventilación',
    description: 'Acumulación continua, ventilaciones esporádicas',
    base: {co2: 900, pm25: 18},
    drift: {co2: [10, 24], pm25: [0.8, 1.6]},
    ventilationEvery: 28,
    ventilationDrop: {co2: 90, pm25: 6},
    max: {co2: 2000, pm25: 55},
  },
};

export const DEFAULT_SCENARIO = SCENARIOS.office_empty.id;
