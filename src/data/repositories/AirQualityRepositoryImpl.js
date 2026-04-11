import firestore from '@react-native-firebase/firestore';
import {readingToDoc, docToReading} from '../mappers/readingMapper';

export class AirQualityRepositoryImpl {
  constructor(collection = 'air_quality') {
    this.collection = firestore().collection(collection);
  }

  async saveReading(reading, state) {
    try {
      await this.collection.doc(String(reading.timestamp)).set(readingToDoc(reading, state));
    } catch (e) {
      console.warn('No se pudo guardar en Firestore (ok en modo simulación)', e.message);
    }
  }

  async getHistory(limit = 500) {
    try {
      const snapshot = await this.collection
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();
      return snapshot.docs.map(doc => docToReading(doc.data()));
    } catch (e) {
      console.warn('No se pudo leer Firestore', e.message);
      return [];
    }
  }
}
