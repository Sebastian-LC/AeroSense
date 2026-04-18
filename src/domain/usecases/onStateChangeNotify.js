import {notifyStateChange} from '../../utils/notifications';

export const onStateChangeNotify = async (
  newState,
  reading,
  lastNotifiedLevel,
  notificationsEnabled,
) => {
  if (!newState?.level) {
    return lastNotifiedLevel;
  }

  try {
    const isNewLevel = newState.level !== lastNotifiedLevel;
    // La notificación de servicio en primer plano siempre se actualiza (silenciosamente)
    // Pero solo alertamos (sonido/vibración) si hay un cambio de nivel Y el switch está ON.
    const shouldAlert = notificationsEnabled && isNewLevel;

    await notifyStateChange(newState, reading, !shouldAlert);
    return newState.level;
  } catch (e) {
    console.warn('Notification error', e);
    return lastNotifiedLevel;
  }
};
