import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, StatusBar} from 'react-native';
import RootGradient from '../components/RootGradient';
import {useAirQualityStore} from '../state/useAirQualityStore';
import {useNotifications} from '../hooks/useNotifications';

const OnboardingScreen = ({navigation}) => {
  const startStream = useAirQualityStore(state => state.startStream);
  useNotifications();

  useEffect(() => {
    startStream('simulation');
  }, [startStream]);

  return (
    <RootGradient>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>AeroSense</Text>
        <Text style={styles.subtitle}>
          Monitoreo inteligente de aire interior
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.replace('Tabs')}>
          <Text style={styles.buttonText}>Entrar al panel</Text>
        </Pressable>
      </View>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {fontSize: 32, fontWeight: '700', color: '#e8f1fb', marginBottom: 12},
  subtitle: {
    fontSize: 16,
    color: '#9fb6ce',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#4dabf7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {color: '#0b1724', fontWeight: '700', fontSize: 16},
});

export default OnboardingScreen;
