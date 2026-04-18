import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StatusPill = ({label, color, message}) => (
  <View
    style={[
      styles.container,
      {backgroundColor: color + '22', borderColor: color},
    ]}>
    <Text style={[styles.label, {color}]}>{label}</Text>
    {message ? <Text style={styles.message}>{message}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  label: {fontSize: 18, fontWeight: '700'},
  message: {color: '#9fb6ce', marginTop: 4},
});

export default StatusPill;
