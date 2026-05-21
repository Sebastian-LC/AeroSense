import React from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const chartWidth = Dimensions.get('window').width - 32;

const LineChartCard = ({title, labels, data, color, unit, thresholds}) => {
  const safeData = data && data.length > 0 ? data : [0];
  const lastValue = safeData[safeData.length - 1];

  // Determinamos el color dinámico de la línea según el último valor
  const getDynamicColor = (opacity = 1) => {
    if (!thresholds) return color || `rgba(77, 171, 247, ${opacity})`;
    if (lastValue >= thresholds.CRITICO) return `rgba(231, 76, 60, ${opacity})`; // Rojo
    if (lastValue >= thresholds.RIESGO) return `rgba(230, 126, 34, ${opacity})`;  // Naranja
    if (lastValue >= thresholds.MODERADO) return `rgba(241, 196, 15, ${opacity})`; // Amarillo
    return `rgba(46, 204, 113, ${opacity})`; // Verde
  };

  const thresholdMax = thresholds ? thresholds.CRITICO : 100;
  const dataMax = Math.max(...safeData, thresholdMax);
  const maxValue = Math.ceil(dataMax * 1.5 / 10) * 10;

  const chartHeight = 180;
  const paddingVertical = 32;

  const getY = (val) => {
    const usableHeight = chartHeight - paddingVertical * 2;
    return chartHeight - paddingVertical - (val * usableHeight) / maxValue;
  };

  const datasets = [
    {
      data: safeData,
      color: getDynamicColor, // Color inteligente aquí
      strokeWidth: 3,
    },
    {
      // Dataset invisible para fijar el rango Y.
      // Usamos el mismo largo que safeData para evitar pendientes/triángulos.
      data: safeData.map(() => maxValue),
      color: () => 'rgba(0,0,0,0)',
      withDots: false,
      strokeWidth: 0,
    }
  ];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.unitBadge, { backgroundColor: getDynamicColor(0.1) }]}>
           <Text style={[styles.unitText, { color: getDynamicColor(1) }]}>{unit}</Text>
        </View>
      </View>

      <View style={styles.chartWrapper}>
        {thresholds && (
          <View style={styles.bandsContainer}>
            <View
              style={[
                styles.band,
                {
                  top: 0,
                  height: getY(thresholds.CRITICO),
                  backgroundColor: 'rgba(231, 76, 60, 0.05)'
                }
              ]}
            />
          </View>
        )}

        {thresholds && (
          <>
            <View style={[styles.referenceLine, { top: getY(thresholds.CRITICO), borderColor: 'rgba(231, 76, 60, 0.5)' }]} />
            <View style={[styles.referenceLine, { top: getY(thresholds.RIESGO), borderColor: 'rgba(230, 126, 34, 0.3)', borderStyle: 'dashed' }]} />
            <View style={[styles.referenceLine, { top: getY(thresholds.MODERADO), borderColor: 'rgba(241, 196, 15, 0.2)', borderStyle: 'dotted' }]} />
          </>
        )}

        <LineChart
          data={{
            labels: labels,
            datasets: datasets,
          }}
          width={chartWidth}
          height={chartHeight}
          chartConfig={{
            backgroundColor: '#0f2133',
            backgroundGradientFrom: '#0f2133',
            backgroundGradientTo: '#0f2133',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(159, 182, 206, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(159, 182, 206, 0.6)`,
            style: { borderRadius: 16 },
            propsForDots: { r: "3" },
            propsForBackgroundLines: {
              stroke: '#1d3347',
              strokeDasharray: '0',
              strokeWidth: 0.5
            },
            // CLAVE: Usar el color del dataset para la sombra.
            // Al ser el dataset de escala rgba(0,0,0,0), su sombra desaparece.
            useShadowColorFromDataset: true,
            fillShadowGradientFromOpacity: 0.2,
            fillShadowGradientToOpacity: 0,
          }}
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          fromZero={true}
        />

        {thresholds && (
          <>
            <Text style={[styles.thresholdLabel, { top: getY(thresholds.CRITICO) - 12, color: '#e74c3c' }]}>
              CRÍTICO
            </Text>
            <Text style={[styles.thresholdLabel, { top: getY(thresholds.RIESGO) - 12, color: '#e67e22' }]}>
              RIESGO
            </Text>
            <Text style={[styles.thresholdLabel, { top: getY(thresholds.MODERADO) - 12, color: '#f1c40f' }]}>
              AVISO
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f2133',
    borderRadius: 20,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#1d3347',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  title: {
    color: '#e8f1fb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  unitBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  unitText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  chartWrapper: {
    position: 'relative',
    height: 180,
    width: '100%',
  },
  chart: {
    borderRadius: 16,
    marginLeft: -10,
  },
  bandsContainer: {
    position: 'absolute',
    left: 40,
    right: 0,
    top: 0,
    height: 180,
    zIndex: -1,
  },
  band: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  referenceLine: {
    position: 'absolute',
    left: 40,
    right: 0,
    borderTopWidth: 1.5,
    zIndex: 1,
  },
  thresholdLabel: {
    position: 'absolute',
    right: 5,
    fontSize: 8,
    fontWeight: '900',
    backgroundColor: 'rgba(15, 33, 51, 0.8)',
    paddingHorizontal: 4,
    borderRadius: 2,
  },
});

export default LineChartCard;
