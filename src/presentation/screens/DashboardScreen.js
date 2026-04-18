import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useAirQualityStore} from '../state/useAirQualityStore';
import RootGradient from '../components/RootGradient';
import MetricCard from '../components/MetricCard';
import StatusPill from '../components/StatusPill';
import LineChartCard from '../components/LineChartCard';
import {formatTimestamp} from '../../utils/format';

const DashboardScreen = () => {
  const {currentReading, trend, status, history} = useAirQualityStore();

  const lastItems = history.slice(-10);
  const fullLabels = lastItems.map(r => formatTimestamp(r.timestamp));
  // Solo mostramos la primera, la del medio y la última etiqueta para evitar superposición
  const labels = fullLabels.map((l, i) =>
    i === 0 ||
    i === Math.floor(fullLabels.length / 2) ||
    i === fullLabels.length - 1
      ? l
      : '',
  );
  const co2Data =
    lastItems.length > 0 ? lastItems.map(r => r.co2) : [0, 0, 0, 0];
  const pmData =
    lastItems.length > 0 ? lastItems.map(r => r.pm25) : [0, 0, 0, 0];

  return (
    <RootGradient>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Dashboard</Text>
        {status ? (
          <StatusPill
            label={status.label}
            color={status.color}
            message={status.message}
          />
        ) : null}

        <View style={styles.metricsRow}>
          <MetricCard
            title="CO₂"
            value={currentReading?.co2 ?? 0}
            unit="ppm"
            trend={trend}
          />
          <MetricCard
            title="PM2.5"
            value={currentReading?.pm25 ?? 0}
            unit="µg/m³"
            trend={trend}
          />
        </View>

        <LineChartCard
          title="Histórico CO₂"
          labels={labels}
          data={co2Data}
          unit="ppm"
          color="#e74c3c"
        />

        <LineChartCard
          title="Histórico PM2.5"
          labels={labels}
          data={pmData}
          unit="µg/m³"
          color="#4dabf7"
        />
      </ScrollView>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16, gap: 12},
  heading: {color: '#e8f1fb', fontSize: 24, fontWeight: '700'},
  metricsRow: {flexDirection: 'row', gap: 12},
});

export default DashboardScreen;
