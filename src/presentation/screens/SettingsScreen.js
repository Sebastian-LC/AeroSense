import React from 'react';
import {View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity} from 'react-native';
import {useAirQualityStore} from '../state/useAirQualityStore';
import {useAuthStore} from '../../state/useAuthStore';
import RootGradient from '../components/RootGradient';
import ScenarioSelector from '../components/ScenarioSelector';

const SettingsScreen = () => {
  const {
    scenario,
    dataSourceType,
    notificationsEnabled,
    switchScenario,
    switchDataSource,
    setNotificationsEnabled,
  } = useAirQualityStore();

  const {user, signOut} = useAuthStore();

  return (
    <RootGradient>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Ajustes</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Usar Firebase</Text>
          <Switch
            value={dataSourceType === 'firebase'}
            onValueChange={v => switchDataSource(v ? 'firebase' : 'simulation')}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Notificaciones</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <Text style={[styles.heading, styles.mt20]}>Cuenta</Text>
        <View style={styles.accountBox}>
          <Text style={styles.accountEmail}>{user?.email}</Text>
          <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <Text style={styles.signOutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.heading, styles.mt20]}>Escenario simulado</Text>
        <ScenarioSelector selected={scenario} onChange={switchScenario} />
      </ScrollView>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16, gap: 12, paddingBottom: 100},
  heading: {color: '#e8f1fb', fontSize: 22, fontWeight: '700'},
  mt20: {marginTop: 20},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f2133',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1d3347',
    padding: 16,
  },
  label: {color: '#e8f1fb', fontSize: 16},
  accountBox: {
    backgroundColor: '#0f2133',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1d3347',
    padding: 16,
    gap: 12,
  },
  accountEmail: {
    color: '#9fb6ce',
    fontSize: 14,
  },
  signOutButton: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderWidth: 1,
    borderColor: '#e74c3c',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
