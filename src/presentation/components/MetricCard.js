import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TrendArrow from './TrendArrow';
import {roundMetric} from '../../utils/format';

const MetricCard = ({title, value, unit, trend}) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.row}>
      <Text style={styles.value}>{roundMetric(value)}</Text>
      <Text style={styles.unit}>{unit}</Text>
      {trend ? <TrendArrow direction={trend.direction} /> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#0f2133',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1d3347',
    marginRight: 10,
  },
  title: {color: '#9fb6ce', marginBottom: 8},
  row: {flexDirection: 'row', alignItems: 'center'},
  value: {color: '#e8f1fb', fontSize: 28, fontWeight: '700'},
  unit: {color: '#9fb6ce', marginLeft: 6},
});

export default MetricCard;
