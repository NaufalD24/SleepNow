import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const sleepAidOptions = [
  { id: '1', title: 'Rain Sounds', icon: 'weather-rainy' },
  { id: '2', title: 'Ocean Waves', icon: 'waves' },
  { id: '3', title: 'Forest Ambience', icon: 'pine-tree' },
  { id: '4', title: 'White Noise', icon: 'volume-high' },
  { id: '5', title: 'Guided Meditation', icon: 'meditation' },
];

export default function SleepAidScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Aid</Text>
      <FlatList
        data={sleepAidOptions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Icon name={item.icon} size={32} color="#fff" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 15,
  },
});
