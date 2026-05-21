export const readingToDoc = (reading, state) => ({
  timestamp: reading.timestamp,
  gases: reading.gases, // Cambiado de co2 a gases
  pm1: reading.pm1 || 0,
  pm25: reading.pm25,
  pm10: reading.pm10 || 0,
  state: state?.level,
  createdAt: new Date().toISOString(),
});

export const docToReading = doc => ({
  timestamp: doc.timestamp,
  gases: doc.gases || doc.co2 || 0, // Soporte para datos antiguos que usaban 'co2'
  pm1: doc.pm1 || 0,
  pm25: doc.pm25,
  pm10: doc.pm10 || 0,
  state: doc.state,
});
