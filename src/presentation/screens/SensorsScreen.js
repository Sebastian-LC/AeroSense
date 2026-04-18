import React, {useEffect, useState} from \u0027react\u0027;
import {View, Text, StyleSheet, ScrollView} from \u0027react-native\u0027;
import {useAirQualityStore} from \u0027../state/useAirQualityStore\u0027;
import RootGradient from \u0027../components/RootGradient\u0027;
import {format} from \u0027date-fns\u0027;
import {es} from \u0027date-fns/locale\u0027;

const SensorCard = ({name, status, lastUpdate, type}) => (
  \u003cView style={styles.card}\u003e
    \u003cView style={styles.cardHeader}\u003e
      \u003cText style={styles.sensorIcon}\u003e{name === \u0027CO₂\u0027 ? \u0027💨\u0027 : \u0027🌫️\u0027}\u003c/Text\u003e
      \u003cView\u003e
        \u003cText style={styles.sensorName}\u003eSensor de {name}\u003c/Text\u003e
        \u003cText style={styles.sensorType}\u003e{type}\u003c/Text\u003e
      \u003c/View\u003e
    \u003c/View\u003e
    \u003cView style={styles.statusBadge(status === \u0027Activo\u0027)}\u003e
      \u003cView style={styles.dot(status === \u0027Activo\u0027)} /\u003e
      \u003cText style={styles.statusText}\u003e{status}\u003c/Text\u003e
    \u003c/View\u003e
    \u003cText style={styles.updateText}\u003eÚltimo dato: {lastUpdate}\u003c/Text\u003e
  \u003c/View\u003e
);

const SensorsScreen = () => {
  const {currentReading, dataSourceType} = useAirQualityStore();
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] = useState(0);

  useEffect(() \u003d\u003e {
    if (!currentReading) return;

    const interval \u003d setInterval(() \u003d\u003e {
      const seconds \u003d Math.floor((Date.now() - currentReading.timestamp) / 1000);
      setTimeSinceLastUpdate(seconds);
    }, 1000);

    return () \u003d\u003e clearInterval(interval);
  }, [currentReading]);

  const lastUpdateStr \u003d currentReading
    ? format(currentReading.timestamp, \u0027HH:mm:ss\u0027, {locale: es})
    : \u0027--:--:--\u0027;

  return (
    \u003cRootGradient\u003e
      \u003cScrollView style={styles.container}\u003e
        \u003cText style={styles.heading}\u003eEstado de Sensores\u003c/Text\u003e

        \u003cView style={styles.grid}\u003e
          \u003cSensorCard
            name\u003d\"CO₂\"
            type\u003d{dataSourceType \u003d\u003d\u003d \u0027simulation\u0027 ? \u0027Simulado (SCD4x)\u0027 : \u0027Firebase Cloud\u0027}
            status\u003d{currentReading ? \u0027Activo\u0027 : \u0027Inactivo\u0027}
            lastUpdate\u003d{lastUpdateStr}
          /\u003e
          \u003cSensorCard
            name\u003d\"PM2.5\"
            type\u003d{dataSourceType \u003d\u003d\u003d \u0027simulation\u0027 ? \u0027Simulado (SPS30)\u0027 : \u0027Firebase Cloud\u0027}
            status\u003d{currentReading ? \u0027Activo\u0027 : \u0027Inactivo\u0027}
            lastUpdate\u003d{lastUpdateStr}
          /\u003e
        \u003c/View\u003e

        \u003cView style={styles.systemCard}\u003e
          \u003cText style={styles.systemTitle}\u003eEstado del Sistema\u003c/Text\u003e

          \u003cView style={styles.systemRow}\u003e
            \u003cText style={styles.systemLabel}\u003eFrecuencia de muestreo\u003c/Text\u003e
            \u003cText style={styles.systemValue}\u003e{__DEV__ ? \u00275 segundos\u0027 : \u002760 segundos\u0027}\u003c/Text\u003e
          \u003c/View\u003e

          \u003cView style={styles.systemRow}\u003e
            \u003cText style={styles.systemLabel}\u003eTiempo desde última lectura\u003c/Text\u003e
            \u003cText style={styles.systemValue}\u003e{timeSinceLastUpdate}s\u003c/Text\u003e
          \u003c/View\u003e

          \u003cView style={styles.systemRow}\u003e
            \u003cText style={styles.systemLabel}\u003eServicio en 2º plano\u003c/Text\u003e
            \u003cView style={styles.activeTag}\u003e
              \u003cText style={styles.activeTagText}\u003eEN EJECUCIÓN\u003c/Text\u003e
            \u003c/View\u003e
          \u003c/View\u003e

          \u003cView style={styles.systemRow}\u003e
            \u003cText style={styles.systemLabel}\u003eFuente de datos\u003c/Text\u003e
            \u003cText style={[styles.systemValue, {textTransform: \u0027uppercase\u0027}]}\u003e{dataSourceType}\u003c/Text\u003e
          \u003c/View\u003e
        \u003c/View\u003e
      \u003c/ScrollView\u003e
    \u003c/RootGradient\u003e
  );
};

const styles \u003d StyleSheet.create({
  container: {flex: 1, padding: 16},
  heading: {color: \u0027#e8f1fb\u0027, fontSize: 24, fontWeight: \u0027bold\u0027, marginBottom: 20},
  grid: {flexDirection: \u0027row\u0027, justifyContent: \u0027space-between\u0027, marginBottom: 20},
  card: {
    backgroundColor: \u0027rgba(15, 33, 51, 0.8)\u0027,
    borderRadius: 15,
    padding: 16,
    width: \u002748%\u0027,
    borderWidth: 1,
    borderColor: \u0027#1d3347\u0027,
  },
  cardHeader: {flexDirection: \u0027row\u0027, alignItems: \u0027center\u0027, marginBottom: 12, gap: 8},
  sensorIcon: {fontSize: 24},
  sensorName: {color: \u0027#e8f1fb\u0027, fontSize: 16, fontWeight: \u0027bold\u0027},
  sensorType: {color: \u0027#9fb6ce\u0027, fontSize: 10},
  statusBadge: (active) \u003d\u003e ({
    flexDirection: \u0027row\u0027,
    alignItems: \u0027center\u0027,
    backgroundColor: active ? \u0027rgba(46, 204, 113, 0.1)\u0027 : \u0027rgba(231, 76, 60, 0.1)\u0027,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: \u0027flex-start\u0027,
    marginBottom: 8,
  }),
  dot: (active) \u003d\u003e ({
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: active ? \u0027#2ecc71\u0027 : \u0027#e74c3c\u0027,
    marginRight: 6,
  }),
  statusText: {color: \u0027#e8f1fb\u0027, fontSize: 12, fontWeight: \u0027600\u0027},
  updateText: {color: \u0027#9fb6ce\u0027, fontSize: 11},
  systemCard: {
    backgroundColor: \u0027rgba(15, 33, 51, 0.8)\u0027,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: \u0027#1d3347\u0027,
  },
  systemTitle: {color: \u0027#4dabf7\u0027, fontSize: 18, fontWeight: \u0027bold\u0027, marginBottom: 16},
  systemRow: {
    flexDirection: \u0027row\u0027,
    justifyContent: \u0027space-between\u0027,
    alignItems: \u0027center\u0027,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: \u0027#1d3347\u0027,
  },
  systemLabel: {color: \u0027#9fb6ce\u0027, fontSize: 14},
  systemValue: {color: \u0027#e8f1fb\u0027, fontSize: 14, fontWeight: \u0027500\u0027},
  activeTag: {
    backgroundColor: \u0027#2ecc71\u0027,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeTagText: {color: \u0027#fff\u0027, fontSize: 10, fontWeight: \u0027bold\u0027},
});

export default SensorsScreen;
