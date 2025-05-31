import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const API_URL = 'https://6839aba46561b8d882b14221.mockapi.io/sleeplog';

export default function EditLogScreen({ route, navigation }) {
  const { id } = route.params;
  const [sleepTime, setSleepTime] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState({ type: null });

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then(res => {
      const data = res.data;
      const [start, end] = data.title
        .replace('Sleep from ', '')
        .split(' to ')
        .map(t => new Date(`2025-01-01T${t}:00`));
      setSleepTime(start);
      setWakeTime(end);
    });
  }, [id]);

  const handleTimeChange = (event, selectedDate) => {
    if (!selectedDate) return setShowPicker({ type: null });
    if (showPicker.type === 'sleep') setSleepTime(selectedDate);
    else if (showPicker.type === 'wake') setWakeTime(selectedDate);
    setShowPicker({ type: null });
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getSleepDuration = () => {
    const duration = (wakeTime - sleepTime + 86400000) % 86400000;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleUpdateLog = async () => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        title: `Sleep from ${formatTime(sleepTime)} to ${formatTime(wakeTime)}`,
        duration: getSleepDuration(),
      });
      Alert.alert('Success', 'Log berhasil diperbarui');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Sleep Log</Text>

      <TouchableOpacity style={styles.timeCard} onPress={() => setShowPicker({ type: 'sleep' })}>
        <Icon name="moon-waning-crescent" size={28} color="#fff" />
        <Text style={styles.label}>Bed Time</Text>
        <Text style={styles.time}>{formatTime(sleepTime)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.timeCard} onPress={() => setShowPicker({ type: 'wake' })}>
        <Icon name="white-balance-sunny" size={28} color="#fff" />
        <Text style={styles.label}>Wake Up</Text>
        <Text style={styles.time}>{formatTime(wakeTime)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateLog}>
        <Text style={styles.saveText}>Perbarui Log</Text>
      </TouchableOpacity>

      {showPicker.type && (
        <DateTimePicker
          value={showPicker.type === 'sleep' ? sleepTime : wakeTime}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#0f3460', alignItems: 'center', paddingTop: 40,
  },
  title: { fontSize: 22, color: '#fff', marginBottom: 20 },
  timeCard: {
    backgroundColor: '#16213e', borderRadius: 15, padding: 20,
    width: '85%', alignItems: 'center', marginVertical: 10, elevation: 5,
  },
  label: { fontSize: 16, color: '#aaa', marginTop: 10 },
  time: { fontSize: 22, color: '#fff', marginTop: 5, fontWeight: 'bold' },
  saveButton: {
    backgroundColor: '#ffd700', marginTop: 30,
    paddingVertical: 15, paddingHorizontal: 25, borderRadius: 12,
  },
  saveText: {
    color: '#0f3460', fontSize: 16, fontWeight: 'bold',
  },
});
