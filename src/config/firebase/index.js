import app from '@react-native-firebase/app';

// Firebase se auto-configura con google-services.json / GoogleService-Info.plist
// Esto permite que Firestore y Messaging funcionen sin código extra.
export const ensureFirebase = () => {
  try {
    return app();
  } catch (e) {
    console.warn('Firebase no inicializado: coloca google-services.json', e.message);
    return null;
  }
};
