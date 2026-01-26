import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface ReactionPageProps {
  onNavigate?: (route: string) => void;
}

export function ReactionPage({ onNavigate }: ReactionPageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.frame} />

      <View style={styles.statusBar}>
        <Text style={styles.statusTime}>해시(亥時) 🐷</Text>
        <View style={styles.statusIcons}>
          <Feather name="signal" size={12} color="#e2e8f0" />
          <Feather name="battery" size={16} color="#e2e8f0" />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>어젯밤 릴스 정산</Text>
        <Text style={styles.subtitle}>백성들의 반응이 도착했습니다</Text>

        <View style={styles.pulseWrap}>
          <View style={styles.pulseOuter} />
          <View style={styles.pulseRing} />
          <View style={styles.pulseInner}>
            <Feather name="heart" size={42} color="#ef4444" />
            <Text style={styles.scoreValue}>+2,450</Text>
            <Text style={styles.scoreLabel}>획득 민심</Text>
          </View>
        </View>

        <View style={styles.statList}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>도파민 기여도</Text>
            <Text style={styles.statValueRed}>+1,200</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>화제성 보너스</Text>
            <Text style={styles.statValueYellow}>+800</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.ctaButton}
          onPress={() => onNavigate?.('/')}
        >
          <Text style={styles.ctaText}>확인 (메인으로)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingTop: 12,
  },
  frame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 8,
    borderColor: '#0f172a',
    borderRadius: 48,
  },
  statusBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  statusTime: {
    fontSize: 12,
    color: '#e2e8f0',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#93c5fd',
    marginBottom: 32,
  },
  pulseWrap: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  pulseOuter: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  pulseRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#60a5fa',
    opacity: 0.7,
  },
  pulseInner: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 8,
  },
  scoreLabel: {
    fontSize: 11,
    color: '#93c5fd',
    marginTop: 4,
  },
  statList: {
    width: '100%',
    maxWidth: 320,
    gap: 10,
    marginBottom: 32,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statValueRed: {
    fontSize: 12,
    fontWeight: '700',
    color: '#f87171',
  },
  statValueYellow: {
    fontSize: 12,
    fontWeight: '700',
    color: '#facc15',
  },
  ctaButton: {
    width: '100%',
    maxWidth: 320,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  ctaText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
