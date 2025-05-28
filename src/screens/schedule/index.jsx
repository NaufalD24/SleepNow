import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
});
