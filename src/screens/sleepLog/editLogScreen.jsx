import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditLogScreen = ({ route, navigation }) => {
  const { id } = route.params; // ID dokumen sleep log

  const [sleepTime, setSleepTime] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [showSleepPicker, setShowSleepPicker] = useState(false);
  const [showWakePicker, setShowWakePicker] = useState(false);

  // Ambil data log dari Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'sleeplogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Misal format title: "Sleep from 22:00 to 06:00"
          const [start, end] = data.title
            .replace('Sleep from ', '')
            .split(' to ')
            .map(t => new Date(`2025-01-01T${t}:00`));
          setSleepTime(start);
          setWakeTime(end);
        } else {
          Alert.alert('Error', 'Data log tidak ditemukan');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Error', 'Gagal mengambil data');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigation]);

  // Format waktu jadi string HH:mm
  const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  // Hitung durasi tidur dalam jam (float)
  const getSleepDuration = () => {
    // Jika waktu bangun lebih kecil dari waktu tidur, anggap keesokan harinya
    let start = sleepTime.getHours() * 60 + sleepTime.getMinutes();
    let end = wakeTime.getHours() * 60 + wakeTime.getMinutes();
    if (end <= start) {
      end += 24 * 60; // tambah 24 jam
    }
    const durationMinutes = end - start;
    return (durationMinutes / 60).toFixed(2); // durasi dalam jam dengan 2 desimal
  };

  // Handle update ke Firestore
  const handleUpdateLog = async () => {
    try {
      const docRef = doc(db, 'sleeplogs', id);
      await updateDoc(docRef, {
        title: `Sleep from ${formatTime(sleepTime)} to ${formatTime(wakeTime)}`,
        duration: Number(getSleepDuration()),
      });
      Alert.alert('Success', 'Log berhasil diperbarui');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui data');
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sleep Time:</Text>
      <Text style={styles.time} onPress={() => setShowSleepPicker(true)}>
        {formatTime(sleepTime)}
      </Text>
      {showSleepPicker && (
        <DateTimePicker
          value={sleepTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowSleepPicker(false);
            if (selectedDate) setSleepTime(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Wake Time:</Text>
      <Text style={styles.time} onPress={() => setShowWakePicker(true)}>
        {formatTime(wakeTime)}
      </Text>
      {showWakePicker && (
        <DateTimePicker
          value={wakeTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowWakePicker(false);
            if (selectedDate) setWakeTime(selectedDate);
          }}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleUpdateLog} />
        <Button title="Cancel" onPress={() => navigation.goBack()} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 20,
  },
  time: {
    fontSize: 24,
    marginVertical: 10,
    color: 'blue',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditLogScreen;
