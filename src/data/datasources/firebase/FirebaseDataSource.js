import firestore from '@react-native-firebase/firestore';
import {createReading} from '../../../domain/models/Reading';

export class FirebaseDataSource {
  constructor(collection = 'air_quality') {
    this.collection = firestore().collection(collection);
  }

  async getData(limit = 1) {
    const snap = await this.collection.orderBy('timestamp', 'desc').limit(limit).get();
    return snap.docs.map(doc => mapDoc(doc))[0];
  }

  subscribe(callback) {
    const unsubscribe = this.collection
      .orderBy('timestamp', 'desc')
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const reading = mapDoc(change.doc);
          callback(reading);
        });
      });
    return unsubscribe;
  }
}

const mapDoc = doc =>
  createReading({
    timestamp: doc.data()?.timestamp,
    co2: doc.data()?.co2,
    pm25: doc.data()?.pm25,
  });
