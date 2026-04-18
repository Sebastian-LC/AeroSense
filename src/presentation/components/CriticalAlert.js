import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, Vibration} from 'react-native';
import {useAirQualityStore} from '../state/useAirQualityStore';
import {LEVELS} from '../../constants/thresholds';

const CriticalAlert = () => {
  const {status, currentReading} = useAirQualityStore();

  const isCritical = status?.level === LEVELS.CRITICAL;

  if (isCritical) {
    Vibration.vibrate([500, 500, 500, 500], true);
  } else {
    Vibration.cancel();
  }

  return (
    <Modal
      visible={isCritical}
      animationType="fade"
      transparent={false}
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.title}>PELIGRO CRÍTICO</Text>
          <Text style={styles.subtitle}>Calidad del Aire Peligrosa Detectada</Text>

          <View style={styles.dataContainer}>
            <View style={styles.dataBox}>
              <Text style={styles.label}>CO₂</Text>
              <Text style={styles.value}>{currentReading?.co2} ppm</Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.label}>PM2.5</Text>
              <Text style={styles.value}>{currentReading?.pm25} µg/m³</Text>
            </View>
          </View>

          <Text style={styles.instruction}>
            Abra las ventanas inmediatamente y evacue el área si es necesario.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => Vibration.cancel()}
          >
            <Text style={styles.buttonText}>ENTENDIDO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  warningIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#ffcccc',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  dataBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 15,
    width: '45%',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  value: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  instruction: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#ff0000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CriticalAlert;