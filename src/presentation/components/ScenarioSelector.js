import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {SCENARIOS} from '../../constants/scenarios';

const ScenarioSelector = ({selected, onChange}) => {
  return (
    <View style={styles.container}>
      {Object.values(SCENARIOS).map(s => (
        <Pressable
          key={s.id}
          style={[styles.item, selected === s.id && styles.itemActive]}
          onPress={() => onChange(s.id)}>
          <Text style={styles.title}>{s.label}</Text>
          <Text style={styles.desc}>{s.description}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {gap: 10},
  item: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1d3347',
    backgroundColor: '#0f2133',
  },
  itemActive: {borderColor: '#4dabf7', backgroundColor: '#103556'},
  title: {color: '#e8f1fb', fontWeight: '700'},
  desc: {color: '#9fb6ce', marginTop: 4},
});

export default ScenarioSelector;
