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

  const labels = history.slice(-10).map(r => formatTimestamp(r.timestamp));
  const co2Data = history.slice(-10).map(r => r.co2);
  const pmData = history.slice(-10).map(r => r.pm25);

  return (
    <RootGradient>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Dashboard</Text>
        {status ? (
          <StatusPill label={status.label} color={status.color} message={status.message} />
        ) : null}

        <View style={styles.metricsRow}>
          <MetricCard title="CO₂" value={currentReading?.co2 ?? 0} unit="ppm" trend={trend} />
          <MetricCard title="PM2.5" value={currentReading?.pm25 ?? 0} unit="µg/m³" trend={trend} />
        </View>

        <LineChartCard labels={labels} co2Data={co2Data} pmData={pmData} />
      </ScrollView>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16, gap: 12},
  heading: {color: '#e8f1fb', fontSize: 24, fontWeight: '700'},
  metricsRow: {flexDirection: 'row'},
});

export default DashboardScreen;
