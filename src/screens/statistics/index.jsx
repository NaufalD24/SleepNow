import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://6839aba46561b8d882b14221.mockapi.io/sleeplog';
const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const [dataByDay, setDataByDay] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const navigation = useNavigation();

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const logsData = response.data;
      setLogs(logsData);

      const grouped = {};
      logsData.forEach((log) => {
        const date = new Date(log.createdAt);
        const day = date.getDay(); // 0 (Sun) to 6 (Sat)
        const dayIndex = day === 0 ? 6 : day - 1; // Shift so Mon=0
        if (!grouped[dayIndex]) grouped[dayIndex] = [];
        grouped[dayIndex].push(parseFloat(log.duration));
      });

      const sleepData = [];
      let total = 0;
      let count = 0;

      for (let i = 0; i < 7; i++) {
        const dayLogs = grouped[i] || [];
        const dayAverage =
          dayLogs.length > 0
            ? dayLogs.reduce((a, b) => a + b, 0) / dayLogs.length
            : 0;
        sleepData.push(parseFloat(dayAverage.toFixed(2)));

        total += dayLogs.reduce((a, b) => a + b, 0);
        count += dayLogs.length;
      }

      setDataByDay(sleepData);
      setAverage(count > 0 ? (total / count).toFixed(2) : 0);
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil data statistik');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (error) {
      Alert.alert('Error', 'Gagal menghapus data');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation]);

  const chartConfig = {
    backgroundGradientFrom: '#1a1a2e',
    backgroundGradientTo: '#16213e',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: () => '#fff',
    barPercentage: 0.6,
    fillShadowGradient: '#4c669f',
    fillShadowGradientOpacity: 1,
    style: {
      borderRadius: 16,
    },
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#e94560" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.logCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.logTitle}>{item.title}</Text>
        <Text style={styles.logDate}>
          Durasi: {item.duration} jam | {new Date(item.createdAt).toDateString()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditLog', { id: item.id })}
        style={{ marginRight: 10 }}
      >
        <Icon name="pencil" size={22} color="#ffd700" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon name="trash-can" size={22} color="#e94560" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weekly Sleep Statistics</Text>
      <BarChart
        data={{
          labels: days,
          datasets: [{ data: dataByDay }],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix="h"
        chartConfig={chartConfig}
        style={styles.chart}
      />
      <Text style={styles.summary}>Rata-rata tidur minggu ini: {average} jam</Text>

      <Text style={styles.subTitle}>Log Tidur</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
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
  subTitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  logCard: {
    backgroundColor: '#16213e',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  logDate: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
});
