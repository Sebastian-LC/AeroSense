export const readingToDoc = (reading, state) => ({
  timestamp: reading.timestamp,
  co2: reading.co2,
  pm25: reading.pm25,
  state: state?.level,
  createdAt: new Date(),
});

export const docToReading = doc => ({
  timestamp: doc.timestamp,
  co2: doc.co2,
  pm25: doc.pm25,
  state: doc.state,
});
