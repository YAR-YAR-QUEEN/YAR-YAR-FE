import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useDayNight } from '../contexts/DayNightContext';
import { useGameState } from '../contexts/GameStateContext';

export function TimeHeader() {
  const { isNight, currentTime } = useDayNight();
  const { gameState } = useGameState();
  const minsimValue = gameState?.minsim ?? 0;
  const minsimLabel = minsimValue.toLocaleString();

  return (
    <View
      style={[
        styles.header,
        isNight ? styles.headerNight : styles.headerDay,
      ]}
    >
      {/* Left: Time Info */}
      <View style={styles.leftSection}>
        <View
          style={[
            styles.iconContainer,
            isNight ? styles.iconContainerNight : styles.iconContainerDay,
          ]}
        >
          {isNight ? (
            <Ionicons name="moon" size={16} color="#60a5fa" />
          ) : (
            <Ionicons name="sunny" size={16} color="#d97706" />
          )}
        </View>
        <View style={styles.timeInfo}>
          <View style={styles.timeNameRow}>
            <Text
              style={[
                styles.timeName,
                isNight ? styles.textNight : styles.textDay,
              ]}
            >
              {currentTime.name}
            </Text>
            <Text style={styles.emoji}>{currentTime.emoji}</Text>
          </View>
          <Text
            style={[
              styles.timeDescription,
              isNight ? styles.descriptionNight : styles.descriptionDay,
            ]}
          >
            {currentTime.description}
          </Text>
        </View>
      </View>

      {/* Center: Status Bar Style */}
      <View style={styles.centerSection}>
        <Feather name="wifi" size={12} color={isNight ? '#64748b' : '#92400e'} />
        <Text
          style={[
            styles.statusText,
            isNight ? styles.statusTextNight : styles.statusTextDay,
          ]}
        >
          5G 봉수대
        </Text>
      </View>

      {/* Right: Minshim (Public Sentiment) */}
      <View style={styles.rightSection}>
        <Text style={styles.heartIcon}>❤️</Text>
        <Text
          style={[
            styles.minsimValue,
            isNight ? styles.textNight : styles.textDay,
          ]}
        >
          {minsimLabel}
        </Text>
        <Feather
          name="battery"
          size={16}
          color={isNight ? '#64748b' : '#92400e'}
          style={styles.batteryIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  headerDay: {
    backgroundColor: 'rgba(255, 251, 235, 0.9)',
    borderBottomColor: '#fde68a',
  },
  headerNight: {
    backgroundColor: 'rgba(2, 6, 23, 0.95)',
    borderBottomColor: '#0f172a',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 20,
  },
  iconContainerDay: {
    backgroundColor: 'rgba(251, 191, 36, 0.3)',
  },
  iconContainerNight: {
    backgroundColor: 'rgba(30, 58, 138, 0.5)',
  },
  timeInfo: {
    flexDirection: 'column',
  },
  timeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeName: {
    fontWeight: '700',
    fontSize: 14,
  },
  emoji: {
    fontSize: 12,
  },
  timeDescription: {
    fontSize: 10,
  },
  textDay: {
    color: '#78350f',
  },
  textNight: {
    color: '#dbeafe',
  },
  descriptionDay: {
    color: 'rgba(180, 83, 9, 0.7)',
  },
  descriptionNight: {
    color: 'rgba(59, 130, 246, 0.7)',
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    opacity: 0.5,
  },
  statusText: {
    fontSize: 10,
  },
  statusTextDay: {
    color: '#92400e',
  },
  statusTextNight: {
    color: '#64748b',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heartIcon: {
    fontSize: 16,
  },
  minsimValue: {
    fontWeight: '700',
    fontSize: 14,
  },
  batteryIcon: {
    marginLeft: 4,
    opacity: 0.7,
  },
});
