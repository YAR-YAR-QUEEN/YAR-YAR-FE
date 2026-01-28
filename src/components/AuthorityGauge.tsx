import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDayNight } from '../contexts/DayNightContext';

interface AuthorityGaugeProps {
  value: number;
  leftLabel?: string;
  rightLabel?: string;
  title?: string;
  showTitle?: boolean;
  showValues?: boolean;
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

export function AuthorityGauge({ 
    value,
    leftLabel = "대원군",
    rightLabel = "황후",
    title = "현재 권위 상태",
    showTitle = true,
    showValues = true,
}: AuthorityGaugeProps) {
  const { isNight } = useDayNight();
  const clampedValue = Math.min(100, Math.max(0, value));
  const leftValue = 100 - clampedValue;

  const badgeText =
    clampedValue > 60 ? '🔥 힙한 통치자' : clampedValue < 40 ? '💧 수렴청정 중' : '';

  return (
    <View style={styles.container}>
      {showTitle && (
        <View style={styles.header}>
          <ScaleIcon color={isNight ? '#93c5fd' : '#78350f'} />
          <Text style={[styles.titleText, isNight ? styles.titleNight : styles.titleDay]}>
            {title}
          </Text>
        </View>
      )}
      {showValues ? (
      <View style={styles.headerRow}>
        <View style={styles.sideBlock}>
          <Text style={[styles.label, isNight ? styles.labelMuted : styles.labelWarm]}>
            {leftLabel}
          </Text>
          <Text style={styles.sideValue}>{leftValue}%</Text>
        </View>

        <View style={styles.badgeWrap}>
          {badgeText ? (
            <Text
              style={[
                styles.badge,
                clampedValue > 60
                  ? styles.badgeHot
                  : clampedValue < 40
                  ? styles.badgeLow
                  : styles.badgeHidden,
              ]}
            >
              {badgeText}
            </Text>
          ) : (
            <Text style={styles.badgeHidden}>.</Text>
          )}
        </View>

        <View style={[styles.sideBlock, styles.sideBlockRight]}>
          <Text style={[styles.label, isNight ? styles.labelBlue : styles.labelRed]}>
            {rightLabel}
          </Text>
          <Text style={[styles.sideValue, isNight ? styles.labelBlue : styles.labelRed]}>
            {clampedValue}%
          </Text>
        </View>
      </View>
      ) : null}

    <View style={[styles.track, isNight ? styles.trackNight : styles.trackDay]}>
    {/* 대원군 (왼쪽) */}
    <View
        style={[
        styles.fillLeft,
        isNight ? styles.fillLeftNight : styles.fillLeftDay,
        { width: `${leftValue}%` },
        ]}
    />
    {/* 황후 (오른쪽) */}
    <View
        style={[
        styles.fillRight,
        isNight ? styles.fillRightNight : styles.fillRightDay,
        { width: `${clampedValue}%` },
        ]}
    />
    {/* 중앙 마커 */}
    <View style={styles.centerMarker} />
    </View>

      {showValues ? (
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>{leftLabel}</Text>
        <Text style={styles.footerText}>{rightLabel}</Text>
      </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  titleDay: {
    color: '#78350f',
  },
  titleNight: {
    color: '#93c5fd',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  sideBlock: {
    alignItems: 'flex-start',
  },
  sideBlockRight: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  labelMuted: {
    color: '#94a3b8',
  },
  labelWarm: {
    color: 'rgba(120, 53, 15, 0.7)',
  },
  labelBlue: {
    color: '#60a5fa',
  },
  labelRed: {
    color: '#dc2626',
  },
  sideValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#64748b',
  },
  badgeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    fontWeight: '700',
    overflow: 'hidden',
  },
  badgeHot: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
  },
  badgeLow: {
    backgroundColor: '#e2e8f0',
    color: '#64748b',
  },
  badgeHidden: {
    fontSize: 10,
    color: 'transparent',
  },
  track: {
    height: 16,
    borderRadius: 999,
    overflow: 'hidden',
    flexDirection: 'row',
    position: 'relative',
  },
  trackDay: {
    backgroundColor: '#fde68a',
  },
  trackNight: {
    backgroundColor: '#1e293b',
  },
  centerMarker: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
        zIndex: 2,
  },
    fillLeft: {
        height: '100%',
    },
    fillLeftDay: {
        backgroundColor: '#64748b',  // 대원군 - 회색
    },
    fillLeftNight: {
        backgroundColor: '#475569',
    },
    fillRight: {
        height: '100%',
    },
    fillRightDay: {
        backgroundColor: '#ef4444',  // 황후 - 빨강
    },
    fillRightNight: {
        backgroundColor: '#3b82f6',  // 황후 - 파랑
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
  footerText: {
    fontSize: 10,
    opacity: 0.5,
  },
});
