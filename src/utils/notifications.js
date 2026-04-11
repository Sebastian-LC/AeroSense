import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {LEVEL_LABELS, LEVEL_COLORS} from '../constants/thresholds';

export const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled && notifee?.createChannel) {
    await notifee.createChannel({
      id: 'air-quality',
      name: 'Air Quality',
      importance: AndroidImportance.HIGH,
    });
  }
  return enabled;
};

export const notifyStateChange = async (state, reading) => {
  if (!state) return;
  try {
    await notifee.displayNotification({
      title: `Estado: ${LEVEL_LABELS[state.level]}`,
      body: `CO₂ ${reading.co2} ppm | PM2.5 ${reading.pm25} µg/m³`,
      android: {
        channelId: 'air-quality',
        color: LEVEL_COLORS[state.level],
        pressAction: {id: 'default'},
      },
    });
  } catch (e) {
    console.warn('No se pudo mostrar notificación', e.message);
  }
};
