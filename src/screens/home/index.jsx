import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  const [userName, setUserName] = useState('Nopal');
  const [sleepScore, setSleepScore] = useState(85);
  const [search, setSearch] = useState('');

  const categories = [
    { id: '1', title: 'Deep Sleep', icon: 'weather-night' },
    { id: '2', title: 'Nap Tracker', icon: 'power-sleep' },
    { id: '3', title: 'Sleep Tips', icon: 'lightbulb-on-outline' },
    { id: '4', title: 'Sleep Aid', icon: 'music' },
  ];

  const sleepData = [
    { id: '1', title: 'Total Sleep', duration: '8h 15m', icon: 'sleep' },
    { id: '2', title: 'Deep Sleep', duration: '3h 40m', icon: 'weather-night' },
    { id: '3', title: 'Light Sleep', duration: '4h 20m', icon: 'cloud' },
    { id: '4', title: 'REM Sleep', duration: '1h 10m', icon: 'eye' },
  ];

  const scrollY = useRef(new Animated.Value(0)).current;

  const diffClampY = Animated.diffClamp(scrollY, 0, 100);
  const headerTranslateY = diffClampY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <Text style={styles.headerText}>SleepNow</Text>
        <Icon name="account-circle" size={32} color="#fff" />
      </Animated.View>

      {/* Scrollable content */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 100 }} // prevent content overlap
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Image
            source={{ uri: 'https://i.imgur.com/Yf6cFvG.png' }}
            style={styles.profilePic}
          />
          <View>
            <Text style={styles.userName}>Good Morning, {userName}</Text>
            <Text style={styles.userSubtitle}>
              <Icon name="star-circle" size={16} color="#ffd700" /> Your sleep score: {sleepScore}
            </Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search sleep info..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>

        {/* Category */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Icon name={item.icon} size={30} color="#fff" />
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Sleep Summary */}
        <Text style={styles.sectionTitle}>Sleep Summary</Text>
        <View style={styles.sleepSummaryCard}>
          {sleepData.map((item) => (
            <View key={item.id} style={styles.sleepDetail}>
              <Icon name={item.icon} size={30} color="#4c669f" />
              <View>
                <Text style={styles.sleepTitle}>{item.title}</Text>
                <Text style={styles.sleepDuration}>{item.duration}</Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f3460' },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a2e',
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  headerText: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  profilePic: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  userSubtitle: {
    fontSize: 14,
    color: '#aaa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 20,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    marginTop: 15,
  },
  categoryList: { paddingHorizontal: 20, marginVertical: 15 },
  categoryCard: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    width: 120,
    height: 100,
    elevation: 5,
  },
  categoryText: {
    fontSize: 14,
    marginTop: 5,
    color: '#fff',
    textAlign: 'center',
  },
  sleepSummaryCard: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sleepDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sleepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  sleepDuration: {
    fontSize: 16,
    color: '#aaa',
    marginLeft: 15,
  },
});
