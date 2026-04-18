import firestore from '@react-native-firebase/firestore';
import {readingToDoc, docToReading} from '../mappers/readingMapper';
import {isFirebaseAvailable} from '../../config/firebase';

export class AirQualityRepositoryImpl {
  constructor(collection = 'air_quality') {
    if (isFirebaseAvailable()) {
      this.collection = firestore().collection(collection);
    }
  }

  async saveReading(reading, state) {
    if (!this.collection) {
      return;
    }
    try {
      await this.collection
        .doc(String(reading.timestamp))
        .set(readingToDoc(reading, state));
    } catch (e) {
      console.warn(
        'No se pudo guardar en Firestore (ok en modo simulación)',
        e.message,
      );
    }
  }

  async getHistory(limit = 500) {
    if (!this.collection) {
      return [];
    }
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
