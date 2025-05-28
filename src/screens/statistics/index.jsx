import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function StatisticsScreen() {
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [7.5, 6.2, 8.1, 5.8, 7.0, 8.5, 9.2],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1a1a2e',
    backgroundGradientTo: '#16213e',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.6,
    fillShadowGradient: '#4c669f',
    fillShadowGradientOpacity: 1,
    labelColor: () => '#fff',
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weekly Sleep Statistics</Text>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix="h"
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        style={styles.chart}
      />
      <Text style={styles.summary}>Rata-rata tidur minggu ini: 7.5 jam</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  chart: {
    borderRadius: 16,
  },
  summary: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
