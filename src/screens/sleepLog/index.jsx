import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // pastikan path ini sesuai

export default function SleepLogScreen() {
  const navigation = useNavigation();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'sleeplogs'));
      const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(logs);
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const deleteLog = async (id) => {
    try {
      await deleteDoc(doc(db, 'sleeplogs', id));
      getData();
    } catch (error) {
      Alert.alert('Error', 'Gagal menghapus data');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getData);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>Durasi: {item.duration}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('EditLog', { id: item.id })}>
        <Icon name="pencil" size={24} color="#ffd700" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteLog(item.id)}>
        <Icon name="trash-can" size={24} color="#e94560" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#e94560" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddLog')}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
  },
  card: {
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    color: '#aaa',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#e94560',
    borderRadius: 30,
    padding: 16,
    elevation: 5,
  },
});
