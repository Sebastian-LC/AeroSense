import React from 'react';
import {View, StyleSheet} from 'react-native';

const RootGradient = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1724',
  },
});

export default RootGradient;
