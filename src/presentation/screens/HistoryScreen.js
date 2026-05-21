import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useAirQualityStore} from '../state/useAirQualityStore';
import RootGradient from '../components/RootGradient';
import {formatDateLabel} from '../../utils/format';

const HistoryItem = ({item}) => {
  if (!item) return null;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.timeText}>
          {item.timestamp ? formatDateLabel(item.timestamp) : '--:--'}
        </Text>
        <View style={styles.deviceTag}>
          <Text style={styles.deviceTagText}>Dispositivo 1</Text>
        </View>
      </View>

      <View style={styles.dataGrid}>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>GASES</Text>
          <Text style={styles.dataValue}>{item.gases ?? item.co2 ?? 0} <Text style={styles.unit}>ppm</Text></Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>PM1.0</Text>
          <Text style={styles.dataValue}>{item.pm1 ?? 0} <Text style={styles.unit}>µg/m³</Text></Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>PM2.5</Text>
          <Text style={styles.dataValue}>{item.pm25 ?? 0} <Text style={styles.unit}>µg/m³</Text></Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>PM10</Text>
          <Text style={styles.dataValue}>{item.pm10 ?? 0} <Text style={styles.unit}>µg/m³</Text></Text>
        </View>
      </View>
    </View>
  );
};

const HistoryScreen = () => {
  const {history, fetchHistory} = useAirQualityStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const sortedHistory = (history || []).slice().reverse();

  return (
    <RootGradient>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Historial de Lecturas</Text>
          <Text style={styles.subheading}>Últimos registros almacenados</Text>
        </View>

        <FlatList
          data={sortedHistory}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item, index) =>
            item?.timestamp ? String(item.timestamp) : String(index)
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <HistoryItem item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay datos históricos disponibles</Text>
            </View>
          }
        />
      </View>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16},
  header: {marginTop: 10, marginBottom: 20},
  heading: {
    color: '#e8f1fb',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subheading: {
    color: '#9fb6ce',
    fontSize: 14,
    marginTop: 4,
  },
  listContent: {paddingBottom: 100},
  card: {
    backgroundColor: 'rgba(15, 33, 51, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1d3347',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(29, 51, 71, 0.5)',
    paddingBottom: 8,
  },
  timeText: {
    color: '#4dabf7',
    fontSize: 14,
    fontWeight: '700',
  },
  deviceTag: {
    backgroundColor: 'rgba(77, 171, 247, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  deviceTagText: {
    color: '#4dabf7',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dataItem: {
    width: '48%',
    marginBottom: 8,
  },
  dataLabel: {
    color: '#9fb6ce',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
  },
  dataValue: {
    color: '#e8f1fb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#9fb6ce',
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9fb6ce',
    fontSize: 16,
  },
});

export default HistoryScreen;
