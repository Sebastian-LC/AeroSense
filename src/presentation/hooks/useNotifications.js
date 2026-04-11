import {useEffect} from 'react';
import {requestNotificationPermission} from '../../utils/notifications';
import {useAirQualityStore} from '../state/useAirQualityStore';

export const useNotifications = () => {
  const {setNotificationsEnabled} = useAirQualityStore();
  useEffect(() => {
    requestNotificationPermission().then(setNotificationsEnabled);
  }, [setNotificationsEnabled]);
};
