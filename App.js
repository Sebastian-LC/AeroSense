import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './src/presentation/navigation/RootNavigator';
import {StatusBar} from 'react-native';
import CriticalAlert from './src/presentation/components/CriticalAlert';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
      <CriticalAlert />
    </>
  );
};

export default App;
