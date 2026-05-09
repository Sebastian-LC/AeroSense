import database from '@react-native-firebase/database';

export class FirebaseDataSource {
  constructor() {
    this.ref = database().ref('/air_quality/device_1');
  }

  async getData() {
    try {
      const snapshot = await this.ref.once('value');
      return this.mapData(snapshot.val());
    } catch (e) {
      console.warn('Firebase: Error al obtener datos iniciales', e);
      return null;
    }
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
      co2: data.co2 || 0,
      pm25: data.pm25 || 0,
      timestamp: data.timestamp || Date.now(),
    };
  }
}
