import React from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const chartWidth = Dimensions.get('window').width - 64;

const LineChartCard = ({title, labels, data, color, unit}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: data && data.length > 0 ? data : [0],
                color: () => color || '#4dabf7',
                strokeWidth: 2,
                withDots: false,
              },
            ],
            legend: [unit],
          }}
          width={chartWidth}
          height={180}
          chartConfig={{
            backgroundColor: '#0f2133',
            backgroundGradientFrom: '#0f2133',
            backgroundGradientTo: '#0f2133',
            decimalPlaces: 0,
            color: (opacity = 1) => color || `rgba(231, 124, 60, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(159, 182, 206, ${opacity})`,
            propsForDots: {r: '0'},
            propsForBackgroundLines: {stroke: '#1d3347', strokeDasharray: ''},
            paddingRight: 16,
          }}
          bezier
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          fromZero={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#0f2133',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1d3347',
    alignItems: 'center',
  },
  title: {
    color: '#e8f1fb',
    marginBottom: 4,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  chartContainer: {
    paddingRight: 12,
  },
  chart: {
    borderRadius: 12,
  },
});

export default LineChartCard;
