import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TrendArrow = ({direction}) => {
  if (direction === 'up') {
    return <Text style={[styles.arrow, styles.up]}>▲</Text>;
  }
  if (direction === 'down') {
    return <Text style={[styles.arrow, styles.down]}>▼</Text>;
  }
  return <Text style={[styles.arrow, styles.flat]}>■</Text>;
};

const styles = StyleSheet.create({
  arrow: {marginLeft: 8, fontSize: 14, fontWeight: '700'},
  up: {color: '#e67e22'},
  down: {color: '#2ecc71'},
  flat: {color: '#9fb6ce'},
});

export default TrendArrow;
