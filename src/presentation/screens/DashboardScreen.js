import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useAirQualityStore} from '../state/useAirQualityStore';
import RootGradient from '../components/RootGradient';
import MetricCard from '../components/MetricCard';
import StatusPill from '../components/StatusPill';
import LineChartCard from '../components/LineChartCard';
import {formatTimestamp} from '../../utils/format';
import {THRESHOLDS} from '../../constants/thresholds';

const DashboardScreen = () => {
  const {currentReading, trend, status, history} = useAirQualityStore();

  const lastItems = history.slice(-10);
  const fullLabels = lastItems.map(r => formatTimestamp(r.timestamp));
  const labels = fullLabels.map((l, i) =>
    i === 0 || i === Math.floor(fullLabels.length / 2) || i === fullLabels.length - 1 ? l : '',
  );

  const gasesData = lastItems.length > 0 ? lastItems.map(r => r.gases || 0) : [0];
  const pm25Data = lastItems.length > 0 ? lastItems.map(r => r.pm25 || 0) : [0];

  return (
    <RootGradient>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Panel de Control</Text>

        {status && (
          <StatusPill
            label={status.label}
            color={status.color}
            message={status.message}
            level={status.level}
            triggers={status.triggers}
          />
        )}

        {/* Fila 1: Gases y PM1 */}
        <View style={styles.metricsRow}>
          <MetricCard
            title="Gases (MQ135)"
            value={currentReading?.gases ?? 0}
            unit="ppm"
            thresholds={THRESHOLDS.GASES}
          />
          <MetricCard
            title="PM1 (Ultra)"
            value={currentReading?.pm1 ?? 0}
            unit="µg/m³"
            thresholds={THRESHOLDS.PM1}
          />
        </View>

        {/* Fila 2: PM2.5 y PM10 */}
        <View style={styles.metricsRow}>
          <MetricCard
            title="PM2.5 (Finas)"
            value={currentReading?.pm25 ?? 0}
            unit="µg/m³"
            thresholds={THRESHOLDS.PM25}
          />
          <MetricCard
            title="PM10 (Macro)"
            value={currentReading?.pm10 ?? 0}
            unit="µg/m³"
            thresholds={THRESHOLDS.PM10}
          />
        </View>

        <LineChartCard
          title="Tendencia de Gases"
          labels={labels}
          data={gasesData}
          unit="ppm"
          color="#e74c3c"
          thresholds={THRESHOLDS.GASES}
        />

        <LineChartCard
          title="Histórico PM2.5"
          labels={labels}
          data={pm25Data}
          unit="µg/m³"
          color="#4dabf7"
          thresholds={THRESHOLDS.PM25}
        />
      </ScrollView>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16, gap: 12, paddingBottom: 120},
  heading: {color: '#e8f1fb', fontSize: 26, fontWeight: '800', marginBottom: 8},
  metricsRow: {flexDirection: 'row', gap: 12},
});

export default DashboardScreen;
