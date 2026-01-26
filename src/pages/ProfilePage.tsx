import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDayNight } from '../contexts/DayNightContext';
import { useGameState } from '../contexts/GameStateContext';

const GRID_ITEMS = Array.from({ length: 9 }, (_, idx) => idx + 1);

export function ProfilePage() {
  const { isNight } = useDayNight();
  const { gameState } = useGameState();

  const stats = [
    { label: '도파민', value: gameState?.dopamine ?? 0, color: '#ef4444' },
    { label: '화제성', value: gameState?.buzz ?? 0, color: '#eab308' },
    { label: '인지도', value: gameState?.awareness ?? 0, color: '#3b82f6' },
  ];

  return (
    <View style={[styles.container, isNight ? styles.containerNight : styles.containerDay]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarGradient}>
              <Image
                source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Queen' }}
                style={styles.avatar}
              />
            </View>
          </View>
          <Text style={[styles.name, isNight ? styles.nameNight : styles.nameDay]}>
            황후
          </Text>

          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View
                key={stat.label}
                style={[styles.statCard, isNight ? styles.statCardNight : styles.statCardDay]}
              >
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.tabBar, isNight ? styles.tabBarNight : styles.tabBarDay]}>
          <View style={styles.tabItem}>
            <Feather name="grid" size={20} color={isNight ? '#60a5fa' : '#b45309'} />
          </View>
        </View>

        <View style={styles.grid}>
          {GRID_ITEMS.map((item) => (
            <View
              key={item}
              style={[styles.gridItem, isNight ? styles.gridItemNight : styles.gridItemDay]}
            >
              <Text style={styles.gridEmoji}>📹</Text>
              <Text style={styles.gridLike}>❤️ {Math.floor(Math.random() * 1000)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDay: {
    backgroundColor: '#fffbeb',
  },
  containerNight: {
    backgroundColor: '#0f172a',
  },
  content: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#f97316',
    padding: 3,
    marginBottom: 12,
  },
  avatarGradient: {
    flex: 1,
    borderRadius: 48,
    overflow: 'hidden',
    backgroundColor: '#e2e8f0',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  nameDay: {
    color: '#78350f',
  },
  nameNight: {
    color: '#f8fafc',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  statCard: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statCardDay: {
    backgroundColor: '#ffffff',
  },
  statCardNight: {
    backgroundColor: '#1e293b',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  tabBar: {
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  tabBarDay: {
    borderBottomColor: '#fde68a',
  },
  tabBarNight: {
    borderBottomColor: '#1e293b',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  gridItem: {
    width: '32%',
    aspectRatio: 3 / 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  gridItemDay: {
    backgroundColor: '#fde68a',
  },
  gridItemNight: {
    backgroundColor: '#1e293b',
  },
  gridEmoji: {
    fontSize: 20,
    opacity: 0.25,
  },
  gridLike: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  textMutedDay: {
    color: 'rgba(120, 53, 15, 0.6)',
  },
  textMutedNight: {
    color: '#94a3b8',
  },
});
