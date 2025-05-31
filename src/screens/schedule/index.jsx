import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const API_URL = 'https://6839aba46561b8d882b14221.mockapi.io/sleeplog'; // Sesuaikan dengan endpoint MockAPI kamu

export default function ScheduleScreen() {
  const [sleepTime, setSleepTime] = useState(new Date(2025, 0, 1, 22, 0));
  const [wakeTime, setWakeTime] = useState(new Date(2025, 0, 2, 6, 30));
  const [showPicker, setShowPicker] = useState({ type: null });

  const handleTimeChange = (event, selectedDate) => {
    if (!selectedDate) return setShowPicker({ type: null });

    if (showPicker.type === 'sleep') {
      setSleepTime(selectedDate);
    } else if (showPicker.type === 'wake') {
      setWakeTime(selectedDate);
    }
    setShowPicker({ type: null });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getSleepDuration = () => {
    const duration = (wakeTime - sleepTime + 86400000) % 86400000; // millisecond diff
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleSaveLog = async () => {
    try {
      const response = await axios.post(API_URL, {
        title: `Sleep from ${formatTime(sleepTime)} to ${formatTime(wakeTime)}`,
        duration: getSleepDuration(),
      });
      Alert.alert('Berhasil', 'Jadwal tidur berhasil disimpan ke Sleep Log!');
    } catch (error) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan log.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Schedule</Text>

      {/* Sleep Time */}
      <TouchableOpacity
        style={styles.timeCard}
        onPress={() => setShowPicker({ type: 'sleep' })}
      >
        <Icon name="moon-waning-crescent" size={28} color="#fff" />
        <Text style={styles.label}>Bed Time</Text>
        <Text style={styles.time}>{formatTime(sleepTime)}</Text>
      </TouchableOpacity>

      {/* Wake Time */}
      <TouchableOpacity
        style={styles.timeCard}
        onPress={() => setShowPicker({ type: 'wake' })}
      >
        <Icon name="white-balance-sunny" size={28} color="#fff" />
        <Text style={styles.label}>Wake Up</Text>
        <Text style={styles.time}>{formatTime(wakeTime)}</Text>
      </TouchableOpacity>

      {/* Duration */}
      <View style={styles.durationCard}>
        <Icon name="chart-timeline-variant" size={24} color="#ffd700" />
        <Text style={styles.durationText}>Estimated Sleep: {getSleepDuration()}</Text>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveLog}>
        <Text style={styles.saveText}>Simpan ke Sleep Log</Text>
      </TouchableOpacity>

      {/* Picker */}
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
    flex: 1,
    backgroundColor: '#0f3460',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
  },
  timeCard: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 10,
  },
  time: {
    fontSize: 22,
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
  },
  durationCard: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderRadius: 10,
  },
  durationText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#e94560',
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
