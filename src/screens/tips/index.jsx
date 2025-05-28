import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const tipsData = [
  { id: '1', title: 'Hindari layar biru sebelum tidur', icon: 'cellphone-off' },
  { id: '2', title: 'Tidur dan bangun di waktu yang sama', icon: 'calendar-clock' },
  { id: '3', title: 'Gunakan aroma terapi atau diffuser', icon: 'spray' },
  { id: '4', title: 'Meditasi ringan sebelum tidur', icon: 'meditation' },
  { id: '5', title: 'Jangan konsumsi kafein larut malam', icon: 'coffee-off' },
];

export default function TipsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tips & Articles</Text>
      <FlatList
        data={tipsData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tipCard}>
            <Icon name={item.icon} size={28} color="#4c669f" />
            <Text style={styles.tipText}>{item.title}</Text>
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
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  tipText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
});
