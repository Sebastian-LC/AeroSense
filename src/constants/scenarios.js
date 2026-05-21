export const SCENARIOS = {
  office_empty: {
    id: 'office_empty',
    label: 'Oficina vacía',
    description: 'Espacio vacío, leve acumulación por mala circulación',
    base: {gases: 450, pm25: 8},
    drift: {gases: [1, 3], pm25: [-0.2, 0.3]},
    ventilationEvery: 18,
    ventilationDrop: {gases: 100, pm25: 4},
    max: {gases: 800, pm25: 15},
  },
  office_busy: {
    id: 'office_busy',
    label: 'Oficina ocupada',
    description: 'Actividad humana y gases ambientales detectados por MQ135',
    base: {gases: 600, pm25: 12},
    drift: {gases: [5, 15], pm25: [0.4, 1.2]},
    ventilationEvery: 12,
    ventilationDrop: {gases: 150, pm25: 8},
    max: {gases: 1400, pm25: 40},
  },
  poor_ventilation: {
    id: 'poor_ventilation',
    label: 'Mala ventilación',
    description: 'Acumulación peligrosa de gases VOCs detectados por MQ135',
    base: {gases: 800, pm25: 18},
    drift: {gases: [10, 20], pm25: [0.8, 1.6]},
    ventilationEvery: 28,
    ventilationDrop: {gases: 80, pm25: 6},
    max: {gases: 1800, pm25: 55},
  },
};

export const DEFAULT_SCENARIO = SCENARIOS.office_empty.id;
