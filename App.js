import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import RootNavigator from './src/presentation/navigation/RootNavigator';
import {StatusBar} from 'react-native';
import CriticalAlert from './src/presentation/components/CriticalAlert';
import {useAirQualityStore} from './src/presentation/state/useAirQualityStore';

const App = () => {
  const startStream = useAirQualityStore(state => state.startStream);

  useEffect(() => {
    // Iniciamos la conexión con Firebase al arrancar
    startStream('firebase');
  }, [startStream]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
      <CriticalAlert />
    </>
  );
};

export default App;
