import React, { useEffect } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigations/Router';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  useEffect(() => {
    const initNotifications = async () => {
      try {
        // 1. Minta izin notifikasi (Android 13+)
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Izin notifikasi ditolak');
            return;
          }
        }

        // 2. Daftarkan perangkat untuk remote messages (penting di Android)
        await messaging().registerDeviceForRemoteMessages();

        // 3. Ambil token FCM
        const token = await messaging().getToken();
        console.log('✅ FCM Token:', token);

        // 4. Dengarkan notifikasi saat app dibuka (foreground)
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert(
            remoteMessage.notification?.title || 'Notifikasi',
            remoteMessage.notification?.body || 'Anda menerima pesan baru.'
          );
        });

        // Optional: handle background notification / interaction

        return unsubscribe;
      } catch (error) {
        console.log('❌ Gagal inisialisasi notifikasi:', error);
      }
    };

    initNotifications();
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </ThemeProvider>
  );
}
