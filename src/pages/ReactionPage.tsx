import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../contexts/AuthContext';
import { useDayNight } from '../contexts/DayNightContext';
import { useGameState } from '../contexts/GameStateContext';
import { fetchReelsList } from '../services/reelsListService';
import { applyMinsim } from '../services/minsimService';

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isSameDate = (value: string, dateKey: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }
  return toDateKey(parsed) === dateKey;
};

const formatScore = (value: number) => {
  const rounded = Math.round(value * 10) / 10;
  const hasDecimal = !Number.isInteger(rounded);
  return rounded.toLocaleString(undefined, {
    minimumFractionDigits: hasDecimal ? 1 : 0,
    maximumFractionDigits: hasDecimal ? 1 : 0,
  });
};

interface ReactionPageProps {
  onNavigate?: (route: string) => void;
}

export function ReactionPage({ onNavigate }: ReactionPageProps) {
  const { user } = useAuth();
  const { currentTime } = useDayNight();
  const { gameState, refresh } = useGameState();
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [totals, setTotals] = useState({
    dopamine: 0,
    buzz: 0,
    awareness: 0,
  });
  const [reelsPower, setReelsPower] = useState(0);
  const [earnedMinsim, setEarnedMinsim] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadReels = async () => {
      if (!user?.id) {
        if (!cancelled) {
          setTotals({ dopamine: 0, buzz: 0, awareness: 0 });
          setReelsPower(0);
          setEarnedMinsim(0);
        }
        return;
      }

      setLoading(true);
      setLoadError('');
      try {
        const reels = await fetchReelsList(user.id);
        const dateKey = toDateKey(new Date());
        let dopamineSum = 0;
        let buzzSum = 0;
        let awarenessSum = 0;

        reels.forEach((item) => {
          if (!isSameDate(item.createdAt, dateKey)) {
            return;
          }
          dopamineSum += item.dopamine;
          buzzSum += item.buzz;
          awarenessSum += item.awareness;
        });

        const nextReelsPower = dopamineSum + buzzSum + awarenessSum;
        const nextMinsim = nextReelsPower * 5;

        if (!cancelled) {
          setTotals({
            dopamine: dopamineSum,
            buzz: buzzSum,
            awareness: awarenessSum,
          });
          setReelsPower(nextReelsPower);
          setEarnedMinsim(nextMinsim);
        }

        const settlementKey = `reels:settlement:${user.id}:${dateKey}`;
        const stored = await AsyncStorage.getItem(settlementKey);
        const settledPower = stored ? Number(stored) : 0;
        const deltaPower = nextReelsPower - (Number.isNaN(settledPower) ? 0 : settledPower);

        if (deltaPower > 0) {
          await applyMinsim(user.id, {
            amount: deltaPower * 5,
            reason: 'REELS_SETTLEMENT',
            refTable: 'reels',
            refId: gameState?.dayCount,
          });
          await AsyncStorage.setItem(settlementKey, String(nextReelsPower));
          refresh();
        }
      } catch {
        if (!cancelled) {
          setLoadError('릴스를 불러오지 못했어요.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadReels();
    return () => {
      cancelled = true;
    };
  }, [user?.id, gameState?.dayCount, refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.frame} />

      <View style={styles.statusBar}>
        <Text style={styles.statusTime}>
          {currentTime.name} {currentTime.emoji}
        </Text>
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
            <Text style={styles.scoreValue}>+{formatScore(reelsPower)}</Text>
            <Text style={styles.scoreLabel}>획득 릴스력</Text>
            <Text style={styles.scoreSubLabel}>획득 민심 +{formatScore(earnedMinsim)}</Text>
          </View>
        </View>

        <View style={styles.statList}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>도파민 기여도</Text>
            <Text style={styles.statValueRed}>+{formatScore(totals.dopamine)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>화제성 보너스</Text>
            <Text style={styles.statValueYellow}>+{formatScore(totals.buzz)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>인지도 상승</Text>
            <Text style={styles.statValueBlue}>+{formatScore(totals.awareness)}</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator color="#60a5fa" style={styles.loading} />
        ) : null}
        {loadError ? <Text style={styles.errorText}>{loadError}</Text> : null}

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
  scoreSubLabel: {
    fontSize: 10,
    color: '#cbd5f5',
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
  statValueBlue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#60a5fa',
  },
  loading: {
    marginBottom: 12,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 12,
    marginBottom: 12,
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
