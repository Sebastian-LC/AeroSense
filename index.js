/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

// Manejador de eventos en segundo plano
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Forzamos la apertura si es una acción crítica o el usuario toca la notificación
  if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
    console.log('Despertando Aero-Sense desde el fondo...');
  }
});

// Registro obligatorio para que el Foreground Service no se detenga
notifee.registerForegroundService((notification) => {
  return new Promise(() => {
    // Esta promesa se mantiene viva mientras el servicio esté activo.
    // Permite que el proceso de la app (y tus sensores/simulación) sigan ejecutándose.
    console.log('Foreground Service registrado y corriendo...');
  });
});

AppRegistry.registerComponent(appName, () => App);
