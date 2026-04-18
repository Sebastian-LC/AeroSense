import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useAirQualityStore} from '../state/useAirQualityStore';
import RootGradient from '../components/RootGradient';
import {formatDateLabel} from '../../utils/format';

const Separator = () => <View style={styles.separator} />;

const HistoryScreen = () => {
  const {history, fetchHistory} = useAirQualityStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const sortedHistory = (history || []).slice().reverse();

  return (
    <RootGradient>
      <View style={styles.container}>
        <Text style={styles.heading}>Historial</Text>
        <FlatList
          data={sortedHistory}
          keyExtractor={(item, index) =>
            item?.timestamp ? String(item.timestamp) : String(index)
          }
          ItemSeparatorComponent={Separator}
          renderItem={({item}) =>
            item ? (
              <View style={styles.item}>
                <Text style={styles.time}>
                  {item.timestamp ? formatDateLabel(item.timestamp) : '--:--'}
                </Text>
                <Text style={styles.value}>CO₂ {item.co2 ?? 0} ppm</Text>
                <Text style={styles.value}>
                  PM2.5 {item.pm25 ?? 0} µg/m³
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  heading: {
    color: '#e8f1fb',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  separator: {height: 8},
  item: {
    backgroundColor: '#0f2133',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1d3347',
  },
  time: {color: '#9fb6ce', marginBottom: 4},
  value: {color: '#e8f1fb'},
});

export default HistoryScreen;
