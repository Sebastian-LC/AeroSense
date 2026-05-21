import database from '@react-native-firebase/database';

export class FirebaseDataSource {
  constructor() {
    this.path = '/air_quality/device_1';
    this.ref = database().ref(this.path);
  }

  subscribe(callback) {
    const onValueChange = this.ref.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        callback(this.mapData(data));
      }
    });

    return () => this.ref.off('value', onValueChange);
  }

  mapData(data) {
    if (!data) return null;

    return {
      gases: Number(data.gases || data.co2 || data.CO2 || 0),
      pm1: Number(data.pm1 || data.PM1 || 0),
      pm25: Number(data.pm25 || data.pm2_5 || data.PM25 || 0),
      pm10: Number(data.pm10 || data.PM10 || 0),
      // CRITICO: Usamos Date.now() del móvil para que el estado 'Activo' sea real e inmediato
      timestamp: Date.now(),
      deviceTime: data.timestamp || null
    };
  }
}
