import React from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {LEVEL_COLORS} from '../../constants/thresholds';

const chartWidth = Dimensions.get('window').width - 32;

const LineChartCard = ({labels, co2Data, pmData}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tendencia</Text>
      <LineChart
        data={{
          labels,
          datasets: [
            {data: co2Data, color: () => LEVEL_COLORS.critical, strokeWidth: 2, withDots: false},
            {data: pmData, color: () => '#4dabf7', strokeWidth: 2, withDots: false},
          ],
          legend: ['CO₂ ppm', 'PM2.5'],
        }}
        width={chartWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#0f2133',
          backgroundGradientFrom: '#0f2133',
          backgroundGradientTo: '#0f2133',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(231, 124, 60, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(159, 182, 206, ${opacity})`,
          propsForDots: {r: '0'},
          propsForBackgroundLines: {stroke: '#1d3347'},
        }}
        bezier
        style={{borderRadius: 12}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#0f2133',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1d3347',
  },
  title: {color: '#e8f1fb', marginBottom: 8, fontWeight: '700'},
});

export default LineChartCard;
