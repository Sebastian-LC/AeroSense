import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {roundMetric} from '../../utils/format';
import {LEVEL_COLORS} from '../../constants/thresholds';

const MetricCard = ({title, value, unit, thresholds}) => {

  // Determinar el nivel de este sensor específico
  const getStatusColor = () => {
    if (!thresholds) return '#e8f1fb';
    if (value >= thresholds.CRITICO) return LEVEL_COLORS.critical;
    if (value >= thresholds.RIESGO) return LEVEL_COLORS.cognitive;
    if (value >= thresholds.MODERADO) return LEVEL_COLORS.progressive;
    return '#2ecc71'; // Verde para normal
  };

  const statusColor = getStatusColor();
  const isAlert = thresholds && value >= thresholds.MODERADO;

  return (
    <View style={[styles.card, isAlert && { borderColor: statusColor + '40' }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Text style={[styles.value, { color: statusColor }]}>
          {roundMetric(value)}
        </Text>
        <View style={styles.unitContainer}>
          <Text style={styles.unit}>{unit}</Text>
          {isAlert && <Text style={[styles.alertIcon, { color: statusColor }]}> ⚠️</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#0f2133',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1d3347',
  },
  title: {
    color: '#9fb6ce',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  unit: {
    color: '#9fb6ce',
    fontSize: 10
  },
  alertIcon: {
    fontSize: 12,
    marginLeft: 4
  }
});

export default MetricCard;
