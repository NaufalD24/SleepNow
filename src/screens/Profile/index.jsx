import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Foto Profil dan Nama */}
      <Image
        source={{ uri: 'https://i.imgur.com/Yf6cFvG.png' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Naufal Dhiaurrafif</Text>
      <Text style={styles.email}>naufal@sleepnow.app</Text>

      {/* Menu Pengaturan */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="lock-reset" size={24} color="#fff" />
          <Text style={styles.menuText}>Ubah Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="bell-ring" size={24} color="#fff" />
          <Text style={styles.menuText}>Notifikasi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="theme-light-dark" size={24} color="#fff" />
          <Text style={styles.menuText}>Tema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help-circle" size={24} color="#fff" />
          <Text style={styles.menuText}>Bantuan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logout]}>
          <Icon name="logout" size={24} color="#e94560" />
          <Text style={[styles.menuText, { color: '#e94560' }]}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f3460',
    alignItems: 'center',
    paddingVertical: 40,
    flexGrow: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 30,
  },
  menuContainer: {
    width: '90%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#fff',
  },
  logout: {
    borderColor: '#e94560',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
});
