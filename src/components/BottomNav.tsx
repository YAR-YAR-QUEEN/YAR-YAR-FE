import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useDayNight } from '../contexts/DayNightContext';

type RouteType = '/' | '/faction' | '/market' | '/profile';

interface BottomNavProps {
  currentRoute: RouteType;
  onNavigate: (route: RouteType) => void;
}

interface TabItem {
  id: RouteType;
  label: string;
  iconName: string;
}

export function BottomNav({ currentRoute, onNavigate }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  const { isNight } = useDayNight();
  const tabs: TabItem[] = [
    { id: '/faction', label: '정책', iconName: 'sliders' },
    { id: '/', label: '피드', iconName: 'home' },
    { id: '/market', label: '신문물', iconName: 'shopping-bag' },
    { id: '/profile', label: '나', iconName: 'user' },
  ];

  return (
    <View
      style={[
        styles.nav,
        isNight ? styles.navNight : styles.navDay,
        { height: 64 + insets.bottom, paddingBottom: 8 + insets.bottom },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onNavigate(tab.id)}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            {/* Active Indicator */}
            {isActive && (
              <View
                style={[
                  styles.activeIndicator,
                  isNight ? styles.indicatorNight : styles.indicatorDay,
                ]}
              />
            )}

            <Feather
              name={tab.iconName}
              size={24}
              color={
                isActive
                  ? isNight
                    ? '#60a5fa'
                    : '#b45309'
                  : isNight
                  ? '#64748b'
                  : 'rgba(180, 83, 9, 0.6)'
              }
            />

            <Text
              style={[
                styles.tabLabel,
                isActive
                  ? isNight
                    ? styles.activeLabelNight
                    : styles.activeLabelDay
                  : isNight
                  ? styles.inactiveLabelNight
                  : styles.inactiveLabelDay,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  navDay: {
    backgroundColor: '#fffbeb',
    borderTopColor: '#fde68a',
  },
  navNight: {
    backgroundColor: '#020617',
    borderTopColor: '#0f172a',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  indicatorDay: {
    backgroundColor: '#d97706',
  },
  indicatorNight: {
    backgroundColor: '#3b82f6',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  activeLabelDay: {
    color: '#b45309',
  },
  activeLabelNight: {
    color: '#60a5fa',
  },
  inactiveLabelDay: {
    color: 'rgba(180, 83, 9, 0.6)',
  },
  inactiveLabelNight: {
    color: '#64748b',
  },
});
