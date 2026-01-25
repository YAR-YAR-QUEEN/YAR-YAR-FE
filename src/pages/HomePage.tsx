import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HomePageProps {
  isNight: boolean;
  onToggleTime: () => void;
  onNavigate: (route: string) => void;
}

export function HomePage({ isNight, onToggleTime, onNavigate }: HomePageProps) {
  return (
    <View
      style={[
        styles.container,
        isNight ? styles.containerNight : styles.containerDay,
      ]}
    >
      {/* Day/Night Toggle Button */}
      <TouchableOpacity
        onPress={onToggleTime}
        style={[
          styles.toggleButton,
          isNight ? styles.toggleButtonNight : styles.toggleButtonDay,
        ]}
        activeOpacity={0.8}
      >
        {isNight ? (
          <Ionicons name="sunny" size={20} color="#60a5fa" />
        ) : (
          <Ionicons name="moon" size={20} color="#78350f" />
        )}
      </TouchableOpacity>

      <View style={styles.mainContent}>
        {/* Main Illustration Area */}
        <View style={styles.illustrationContainer}>
          <View
            style={[
              styles.illustrationBox,
              isNight ? styles.illustrationBoxNight : styles.illustrationBoxDay,
            ]}
          >
            {isNight ? (
              <View style={styles.illustrationContent}>
                <Text style={styles.illustrationEmoji}>🌙</Text>
                <Text style={styles.titleNight}>은밀한 침소</Text>
                <Text style={styles.descriptionNight}>
                  스마트폰 불빛만이{'\n'}방을 비추고 있습니다...
                </Text>
                <View style={styles.phonePlaceholder} />
              </View>
            ) : (
              <View style={styles.illustrationContent}>
                <Text style={styles.illustrationEmoji}>☀️</Text>
                <Text style={styles.titleDay}>화려한 집무실</Text>
                <Text style={styles.descriptionDay}>
                  오늘의 국정을{'\n'}살피실 시간입니다.
                </Text>
                <Text style={styles.birdEmoji}>🕊️</Text>
              </View>
            )}
          </View>

          {/* Notification Badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </View>

        {/* Main Action Button */}
        <TouchableOpacity
          onPress={() => onNavigate(isNight ? '/reaction' : '/petition')}
          style={[
            styles.actionButton,
            isNight ? styles.actionButtonNight : styles.actionButtonDay,
          ]}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>
            {isNight ? '백성 반응 확인' : '상소문 확인하기'}
          </Text>
          {isNight ? (
            <Feather name="chevron-right" size={20} color="#fff" />
          ) : (
            <ScrollTextIcon />
          )}
        </TouchableOpacity>
      </View>

      {/* Bottom Section: Authority Gauge */}
      <View
        style={[
          styles.gaugeContainer,
          isNight ? styles.gaugeContainerNight : styles.gaugeContainerDay,
        ]}
      >
        <View style={styles.gaugeHeader}>
          <ScaleIcon color={isNight ? '#93c5fd' : '#78350f'} />
          <Text
            style={[
              styles.gaugeTitle,
              isNight ? styles.gaugeTitleNight : styles.gaugeTitleDay,
            ]}
          >
            현재 권위 상태
          </Text>
        </View>
        {/* Simple Gauge */}
        <View style={styles.gaugeLabelRow}>
          <Text style={isNight ? styles.gaugeLabelNight : styles.gaugeLabelDay}>대원군</Text>
          <Text style={isNight ? styles.gaugeValueNight : styles.gaugeValueDay}>65%</Text>
          <Text style={isNight ? styles.gaugeLabelNight : styles.gaugeLabelDay}>개화파</Text>
        </View>
        <View style={[styles.gaugeTrack, isNight ? styles.gaugeTrackNight : styles.gaugeTrackDay]}>
          <View style={[styles.gaugeFill, { width: '65%' }]} />
        </View>
      </View>
    </View>
  );
}

// Custom SVG Icons
function ScrollTextIcon() {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M15 12h-5" />
      <Path d="M15 8h-5" />
      <Path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <Path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v2a2 2 0 0 0 2 2z" />
    </Svg>
  );
}

function ScaleIcon({ color }: { color: string }) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <Path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <Path d="M7 21h10" />
      <Path d="M12 3v18" />
      <Path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  containerDay: {
    backgroundColor: '#fffbeb',
  },
  containerNight: {
    backgroundColor: '#020617',
  },
  toggleButton: {
    position: 'absolute',
    top: 8,
    right: 16,
    zIndex: 50,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  toggleButtonDay: {
    backgroundColor: '#fde68a',
  },
  toggleButtonNight: {
    backgroundColor: '#0f172a',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    position: 'relative',
    width: 256,
    height: 256,
    marginBottom: 32,
  },
  illustrationBox: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 10,
  },
  illustrationBoxDay: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
  },
  illustrationBoxNight: {
    backgroundColor: '#0f172a',
    borderColor: 'rgba(30, 58, 138, 0.5)',
  },
  illustrationContent: {
    alignItems: 'center',
    padding: 24,
  },
  illustrationEmoji: {
    fontSize: 40,
    marginBottom: 16,
  },
  titleDay: {
    color: '#78350f',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 8,
  },
  titleNight: {
    color: '#93c5fd',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 8,
  },
  descriptionDay: {
    color: 'rgba(120, 53, 15, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  descriptionNight: {
    color: 'rgba(147, 197, 253, 0.5)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  phonePlaceholder: {
    marginTop: 16,
    width: 48,
    height: 80,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  birdEmoji: {
    fontSize: 32,
    marginTop: 16,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: SCREEN_WIDTH - 80,
    maxWidth: 320,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 5,
  },
  actionButtonDay: {
    backgroundColor: '#f59e0b',
  },
  actionButtonNight: {
    backgroundColor: '#1d4ed8',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  gaugeContainer: {
    borderRadius: 16,
    padding: 16,
    marginTop: 'auto',
  },
  gaugeContainerDay: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  gaugeContainerNight: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  gaugeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  gaugeTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  gaugeTitleDay: {
    color: '#78350f',
  },
  gaugeTitleNight: {
    color: '#93c5fd',
  },
  gaugeLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gaugeLabelDay: {
    fontSize: 12,
    color: '#92400e',
  },
  gaugeLabelNight: {
    fontSize: 12,
    color: '#93c5fd',
  },
  gaugeValueDay: {
    fontSize: 14,
    fontWeight: '700',
    color: '#78350f',
  },
  gaugeValueNight: {
    fontSize: 14,
    fontWeight: '700',
    color: '#60a5fa',
  },
  gaugeTrack: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  gaugeTrackDay: {
    backgroundColor: '#fde68a',
  },
  gaugeTrackNight: {
    backgroundColor: '#1e3a5f',
  },
  gaugeFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 6,
  },
});