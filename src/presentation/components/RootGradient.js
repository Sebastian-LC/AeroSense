import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const RootGradient = ({children}) => {
  const insets = useSafeAreaInsets();

  // En Android, aumentamos el margen a +35 para asegurar que el notch del Honor 200 no tape el título.
  const topPadding = Platform.OS === 'android'
    ? Math.max(insets.top, StatusBar.currentHeight || 0) + 5
    : insets.top;

  return (
    <View style={[styles.container, {paddingTop: topPadding}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1724',
  },
});

export default RootGradient;
