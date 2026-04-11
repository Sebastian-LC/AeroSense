import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {useAirQualityStore} from '../state/useAirQualityStore';
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

  return (
    <RootGradient>
      <View style={styles.container}>
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

        <Text style={[styles.heading, {marginTop: 20}]}>Escenario simulado</Text>
        <ScenarioSelector selected={scenario} onChange={switchScenario} />
      </View>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, gap: 12},
  heading: {color: '#e8f1fb', fontSize: 22, fontWeight: '700'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f2133',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1d3347',
    padding: 12,
  },
  label: {color: '#e8f1fb', fontSize: 16},
});

export default SettingsScreen;
