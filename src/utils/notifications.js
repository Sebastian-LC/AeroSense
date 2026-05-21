import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  AndroidForegroundServiceType,
  AndroidCategory,
  AndroidVisibility,
  AndroidStyle,
} from '@notifee/react-native';
import {LEVEL_LABELS, LEVEL_COLORS, LEVELS} from '../constants/thresholds';

export const requestNotificationPermission = async () => {
  try {
    const settings = await notifee.requestPermission();
    const enabled = settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;

    if (enabled) {
      await notifee.createChannel({
        id: 'air-quality',
        name: 'Calidad del Aire',
        importance: AndroidImportance.HIGH,
        vibration: true,
        bypassDnd: true, // Opcional: permite saltar el "No molestar" si es crítico
      });
    }
    return enabled;
  } catch (e) {
    console.warn('Error al pedir permisos de notificación:', e);
    return false;
  }
};

export const notifyStateChange = async (state, reading, updateOnly = false) => {
  if (!state) {
    return;
  }
  try {
    await notifee.displayNotification({
      id: 'air-quality-status',
      title: `Estado: ${LEVEL_LABELS[state.level]}`,
      body: state.message,
      android: {
        channelId: 'air-quality',
        color: LEVEL_COLORS[state.level],
        pressAction: {id: 'default'},
        onlyAlertOnce: updateOnly, // Evita sonar/vibrar si es solo una actualización de valores
        asForegroundService: true,
        foregroundServiceType: AndroidForegroundServiceType.DATA_SYNC,
        ongoing: true,
        importance: state.level === LEVELS.CRITICAL ? AndroidImportance.HIGH : AndroidImportance.LOW,
        priority: state.level === LEVELS.CRITICAL ? 'high' : 'low',
        // Información resumida adicional en el estilo de notificación expandida
        style: {
          type: AndroidStyle.BIGTEXT,
          text: `${state.message}\n\nLecturas actuales:\nGases (MQ135): ${reading.gases} ppm\nPM1: ${reading.pm1} µg/m³\nPM2.5: ${reading.pm25} µg/m³\nPM10: ${reading.pm10} µg/m³`,
        },
        // Solo activamos comportamiento de alarma si es CRÍTICO
        ...(state.level === LEVELS.CRITICAL ? {
          category: AndroidCategory.ALARM,
          fullScreenAction: {
            id: 'default',
            launchActivity: 'default',
          },
          visibility: AndroidVisibility.PUBLIC,
        } : {}),
      },
    });
  } catch (e) {
    console.warn('No se pudo mostrar notificación', e.message);
  }
};
