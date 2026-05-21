import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useAirQualityStore} from '../state/useAirQualityStore';
import RootGradient from '../components/RootGradient';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

const SensorCard = ({name, status, lastUpdate, type, value, unit}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={{flex: 1}}>
        <Text style={styles.sensorName} numberOfLines={1} adjustsFontSizeToFit>
          {name}
        </Text>
        <Text style={styles.sensorType} numberOfLines={1}>{type}</Text>
      </View>
    </View>
    <View style={status === 'Activo' ? styles.statusBadgeActive : styles.statusBadgeInactive}>
      <View style={status === 'Activo' ? styles.dotActive : styles.dotInactive} />
      <Text style={styles.statusText}>{status}</Text>
    </View>

    <View style={styles.valueContainer}>
      <Text style={styles.currentValue}>{status === 'Activo' ? `${value} ${unit}` : '---'}</Text>
    </View>

    <Text style={styles.updateText}>Último dato: {lastUpdate}</Text>
  </View>
);

const SensorsScreen = () => {
  const {currentReading, dataSourceType} = useAirQualityStore();
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] = useState(0);

  useEffect(() => {
    if (!currentReading) return;

    // Reset visual inmediato del contador al recibir una lectura
    const updateCounter = () => {
      const seconds = Math.floor((Date.now() - currentReading.timestamp) / 1000);
      setTimeSinceLastUpdate(seconds);
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, [currentReading]);

  const lastUpdateStr = currentReading
    ? format(currentReading.timestamp, 'HH:mm:ss', {locale: es})
    : '--:--:--';

  // LOGICA PARA EVITAR PARPADEO: Calculamos el estado de conexión directamente
  // comparando el timestamp del dato con la hora actual, sin depender del lag del estado local.
  const diffSeconds = currentReading
    ? Math.floor((Date.now() - currentReading.timestamp) / 1000)
    : 999;

  const isStale = diffSeconds > 15;
  const sensorStatus = (currentReading && !isStale) ? 'Activo' : 'Inactivo';

  return (
    <RootGradient>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Estado de Sensores</Text>

        <View style={styles.grid}>
          <SensorCard
            name="Gases"
            type="MQ135"
            status={sensorStatus}
            lastUpdate={lastUpdateStr}
            value={currentReading?.gases || 0}
            unit="ppm"
          />
          <SensorCard
            name="PM1.0"
            type="Ultra Fina"
            status={sensorStatus}
            lastUpdate={lastUpdateStr}
            value={currentReading?.pm1 || 0}
            unit="µg/m³"
          />
        </View>

        <View style={styles.grid}>
          <SensorCard
            name="PM2.5"
            type="Fina"
            status={sensorStatus}
            lastUpdate={lastUpdateStr}
            value={currentReading?.pm25 || 0}
            unit="µg/m³"
          />
          <SensorCard
            name="PM10"
            type="Macro"
            status={sensorStatus}
            lastUpdate={lastUpdateStr}
            value={currentReading?.pm10 || 0}
            unit="µg/m³"
          />
        </View>

        <View style={styles.systemCard}>
          <Text style={styles.systemTitle}>Estado del Sistema</Text>

          <View style={styles.systemRow}>
            <Text style={styles.systemLabel}>Frecuencia de muestreo</Text>
            <Text style={styles.systemValue}>~2 segundos</Text>
          </View>

          <View style={styles.systemRow}>
            <Text style={styles.systemLabel}>Tiempo desde última lectura</Text>
            <Text style={styles.systemValue}>{timeSinceLastUpdate}s</Text>
          </View>

          <View style={styles.systemRow}>
            <Text style={styles.systemLabel}>Servicio en 2º plano</Text>
            <View style={sensorStatus === 'Activo' ? styles.activeTag : styles.inactiveTag}>
              <Text style={styles.activeTagText}>
                {sensorStatus === 'Activo' ? 'EN EJECUCIÓN' : 'ESPERANDO DATOS'}
              </Text>
            </View>
          </View>

          <View style={styles.systemRow}>
            <Text style={styles.systemLabel}>Fuente de datos</Text>
            <Text style={styles.systemValue}>
              {dataSourceType === 'simulation' ? 'SIMULACIÓN' : 'FIREBASE (REALTIME)'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16, paddingBottom: 100},
  heading: {color: '#e8f1fb', fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  grid: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12},
  card: {
    backgroundColor: 'rgba(15, 33, 51, 0.8)',
    borderRadius: 15,
    padding: 14,
    width: '48%',
    borderWidth: 1,
    borderColor: '#1d3347',
  },
  cardHeader: {marginBottom: 8},
  sensorName: {color: '#e8f1fb', fontSize: 16, fontWeight: 'bold'},
  sensorType: {color: '#9fb6ce', fontSize: 11},
  statusBadgeActive: {flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(46, 204, 113, 0.1)', padding: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 8},
  statusBadgeInactive: {flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(231, 76, 60, 0.1)', padding: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 8},
  dotActive: {width: 6, height: 6, borderRadius: 3, backgroundColor: '#2ecc71', marginRight: 6},
  dotInactive: {width: 6, height: 6, borderRadius: 3, backgroundColor: '#e74c3c', marginRight: 6},
  statusText: {color: '#e8f1fb', fontSize: 10, fontWeight: '600'},
  updateText: {color: '#9fb6ce', fontSize: 10},
  valueContainer: {marginVertical: 10, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, paddingVertical: 6},
  currentValue: {color: '#4dabf7', fontSize: 16, fontWeight: 'bold'},
  systemCard: {backgroundColor: 'rgba(15, 33, 51, 0.8)', borderRadius: 15, padding: 20, borderWidth: 1, borderColor: '#1d3347', marginTop: 10},
  systemTitle: {color: '#4dabf7', fontSize: 18, fontWeight: 'bold', marginBottom: 16},
  systemRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1d3347'},
  systemLabel: {color: '#9fb6ce', fontSize: 14},
  systemValue: {color: '#e8f1fb', fontSize: 14, fontWeight: '500'},
  activeTag: {backgroundColor: '#2ecc71', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4},
  inactiveTag: {backgroundColor: '#e74c3c', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4},
  activeTagText: {color: '#fff', fontSize: 10, fontWeight: 'bold'},
});

export default SensorsScreen;
