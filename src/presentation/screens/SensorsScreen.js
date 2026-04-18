import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useAirQualityStore} from '../state/useAirQualityStore';
import RootGradient from '../components/RootGradient';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

const SensorCard = ({name, status, lastUpdate, type, currentReading}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={{flex: 1}}>
        <Text style={styles.sensorName} numberOfLines={1} adjustsFontSizeToFit>
          Sensor {name}
        </Text>
        <Text style={styles.sensorType} numberOfLines={1}>{type}</Text>
      </View>
    </View>
    <View style={status === 'Activo' ? styles.statusBadgeActive : styles.statusBadgeInactive}>
      <View style={status === 'Activo' ? styles.dotActive : styles.dotInactive} />
      <Text style={styles.statusText}>{status}</Text>
    </View>

    <View style={styles.valueContainer}>
      <Text style={styles.sensorValue}>{status === 'Activo' ? (name === 'CO2' ? 'CO₂' : 'PM2.5') : '--'}</Text>
      <Text style={styles.currentValue}>{status === 'Activo' ? (name === 'CO2' ? `${currentReading?.co2 || 0} ppm` : `${currentReading?.pm25 || 0} µg/m³`) : '---'}</Text>
    </View>

    <Text style={styles.updateText}>Último dato: {lastUpdate}</Text>
  </View>
);

const SensorsScreen = () => {
  const {currentReading, dataSourceType} = useAirQualityStore();
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] = useState(0);

  useEffect(() => {
    if (!currentReading) return;

    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - currentReading.timestamp) / 1000);
      setTimeSinceLastUpdate(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentReading]);

  const lastUpdateStr = currentReading
    ? format(currentReading.timestamp, 'HH:mm:ss', {locale: es})
    : '--:--:--';

  // Si han pasado más de 15s sin datos, consideramos que el sensor está inactivo.
  const isStale = timeSinceLastUpdate > 15;
  const sensorStatus = (currentReading && !isStale) ? 'Activo' : 'Inactivo';

  return (
    <RootGradient>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Estado de Sensores</Text>

        <View style={styles.grid}>
          <SensorCard
            name="CO2"
            type={dataSourceType === 'simulation' || dataSourceType === 'simulación' ? 'Simulación (SCD4x)' : 'Firebase Cloud'}
            status={sensorStatus}
            lastUpdate={lastUpdateStr}
            currentReading={currentReading}
          />
          <SensorCard
            name="PM2.5"
            type={dataSourceType === 'simulation' || dataSourceType === 'simulación' ? 'Simulación (SPS30)' : 'Firebase Cloud'}
            status={sensorStatus}
            lastUpdate={lastUpdateStr}
            currentReading={currentReading}
          />
        </View>

        <View style={styles.systemCard}>
          <Text style={styles.systemTitle}>Estado del Sistema</Text>

          <View style={styles.systemRow}>
            <Text style={styles.systemLabel}>Frecuencia de muestreo</Text>
            <Text style={styles.systemValue}>2 segundos</Text>
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
              {dataSourceType === 'simulation' ? 'SIMULACIÓN' : 'FIREBASE'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  heading: {color: '#e8f1fb', fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  grid: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20},
  card: {
    backgroundColor: 'rgba(15, 33, 51, 0.8)',
    borderRadius: 15,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#1d3347',
  },
  cardHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  sensorIcon: {fontSize: 24, marginRight: 8},
  sensorName: {color: '#e8f1fb', fontSize: 14, fontWeight: 'bold'},
  sensorType: {color: '#9fb6ce', fontSize: 10},
  statusBadgeActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusBadgeInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  dotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2ecc71',
    marginRight: 6,
  },
  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e74c3c',
    marginRight: 6,
  },
  statusText: {color: '#e8f1fb', fontSize: 12, fontWeight: '600'},
  updateText: {color: '#9fb6ce', fontSize: 11},
  valueContainer: {
    marginVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    paddingVertical: 8,
  },
  sensorValue: {
    color: '#9fb6ce',
    fontSize: 12,
    marginBottom: 2,
  },
  currentValue: {
    color: '#4dabf7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  systemCard: {
    backgroundColor: 'rgba(15, 33, 51, 0.8)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1d3347',
  },
  systemTitle: {color: '#4dabf7', fontSize: 18, fontWeight: 'bold', marginBottom: 16},
  systemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1d3347',
  },
  systemLabel: {color: '#9fb6ce', fontSize: 14},
  systemValue: {color: '#e8f1fb', fontSize: 14, fontWeight: '500'},
  activeTag: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  inactiveTag: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeTagText: {color: '#fff', fontSize: 10, fontWeight: 'bold'},
});

export default SensorsScreen;