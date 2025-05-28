import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/Home';
import StatisticsScreen from '../screens/Statistics';
import ScheduleScreen from '../screens/Schedule';
import SleepAidScreen from '../screens/SleepAid';
import TipsScreen from '../screens/Tips';
import ProfileScreen from '../screens/Profile';
// import AddSleepLog from '../screens/addSleepLog'; // opsional

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#e94560',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { backgroundColor: '#0f3460', paddingBottom: 5 },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Statistics':
              iconName = 'chart-bar';
              break;
            case 'Schedule':
              iconName = 'calendar-clock';
              break;
            case 'SleepAid':
              iconName = 'music-note';
              break;
            case 'Tips':
              iconName = 'book-open-page-variant';
              break;
            case 'Profile':
              iconName = 'account-circle';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="SleepAid" component={SleepAidScreen} />
      <Tab.Screen name="Tips" component={TipsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      {/* Tambahkan layar tambahan berbasis stack jika diperlukan */}
      {/* <Stack.Screen
        name="AddSleepLog"
        component={AddSleepLog}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      /> */}
    </Stack.Navigator>
  );
}
