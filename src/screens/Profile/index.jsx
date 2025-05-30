import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { theme, toggleTheme, isDark } = useTheme(); // 👈 ambil dari context

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah kamu yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={{ uri: 'https://i.imgur.com/Yf6cFvG.png' }}
        style={styles.avatar}
      />
      <Text style={[styles.name, { color: theme.text }]}>Naufal Dhiaurrafif</Text>
      <Text style={[styles.email, { color: theme.secondaryText }]}>nadiemdemian@email.com</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={[styles.menuItem, { backgroundColor: theme.card }]}>
          <Icon name="lock-reset" size={24} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>Ubah Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: theme.card }]}>
          <Icon name="bell-ring" size={24} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>Notifikasi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: theme.card }]} onPress={toggleTheme}>
          <Icon name="theme-light-dark" size={24} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>
            Tema ({isDark ? 'Gelap' : 'Terang'})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: theme.card }]} onPress={handleHelp}>
          <Icon name="help-circle" size={24} color={theme.text} />
          <Text style={[styles.menuText, { color: theme.text }]}>Bantuan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.logout, { borderColor: theme.accent }]}
          onPress={handleLogout}
        >
          <Icon name="logout" size={24} color={theme.accent} />
          <Text style={[styles.menuText, { color: theme.accent }]}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  email: {
    fontSize: 14,
    marginBottom: 30,
  },
  menuContainer: {
    width: '90%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },
  logout: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
});
