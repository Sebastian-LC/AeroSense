import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './src/presentation/navigation/RootNavigator';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
    </>
  );
};

export default App;
