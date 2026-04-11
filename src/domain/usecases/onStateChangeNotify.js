import {notifyStateChange} from '../../utils/notifications';

export const onStateChangeNotify = async (newState, reading, lastNotifiedLevel, notificationsEnabled) => {
  if (!notificationsEnabled) return lastNotifiedLevel;
  if (!newState?.level) return lastNotifiedLevel;
  if (newState.level === lastNotifiedLevel) return lastNotifiedLevel;
  try {
    await notifyStateChange(newState, reading);
    return newState.level;
  } catch (e) {
    console.warn('Notification error', e);
    return lastNotifiedLevel;
  }
};
