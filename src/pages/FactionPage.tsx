import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { useDayNight } from '../contexts/DayNightContext';
import { AuthorityGauge } from '../components/AuthorityGauge';
import { useGameState } from '../contexts/GameStateContext';
import { useAuth } from '../contexts/AuthContext';
import { applyMinsim } from '../services/minsimService';
import { resolveFaction } from '../services/factionService';
import { useFaction } from '../contexts/FactionContext';

export function FactionPage() {
  const { isNight } = useDayNight();
  const { gameState, refresh } = useGameState();
  const { user } = useAuth();
  const [isManipulating, setIsManipulating] = useState(false);
  const [actionError, setActionError] = useState('');
  const [manipulationError, setManipulationError] = useState('');
  const [isFighting, setIsFighting] = useState(false);
  const [fightResult, setFightResult] = useState('');
  const {
    usedManipulationToday,
    setUsedManipulationToday,
    usedFightToday,
    setUsedFightToday,
  } = useFaction();
  const winRate = Math.round(gameState?.winRate ?? 55);
  const opponentRate = Math.max(0, 100 - winRate);
  const displayWinRate = Math.min(100, winRate + (usedManipulationToday ? 5 : 0));
  const displayOpponentRate = Math.max(0, 100 - displayWinRate);
  const authorityValue = Math.min(100, Math.max(0, gameState?.authority ?? 50));
  const rightScale = Math.min(1.25, Math.max(0.75, 1 + (authorityValue / 100 - 0.5) * 0.5));
  const leftScale = Math.min(1.25, Math.max(0.75, 1 + (0.5 - authorityValue / 100) * 0.5));
  const manipulationCost = 500;
  const isLockedToday = usedFightToday;
  const storageKey =
    user?.id && gameState?.dayCount
      ? `faction:${user.id}:${gameState.dayCount}`
      : null;

  useEffect(() => {
    if (!storageKey) {
      return;
    }
    let cancelled = false;
    const loadState = async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKey);
        if (cancelled) {
          return;
        }
        if (raw) {
          const parsed = JSON.parse(raw) as {
            usedManipulationToday?: boolean;
            usedFightToday?: boolean;
          };
          setUsedManipulationToday(Boolean(parsed.usedManipulationToday));
          setUsedFightToday(Boolean(parsed.usedFightToday));
        } else {
          setUsedManipulationToday(false);
          setUsedFightToday(false);
        }
      } finally {
        if (!cancelled) {
          setFightResult('');
          setActionError('');
          setManipulationError('');
        }
      }
    };
    loadState();
    return () => {
      cancelled = true;
    };
  }, [storageKey, setUsedManipulationToday, setUsedFightToday]);

  useEffect(() => {
    if (!storageKey) {
      return;
    }
    AsyncStorage.setItem(
      storageKey,
      JSON.stringify({
        usedManipulationToday,
        usedFightToday,
      })
    );
  }, [storageKey, usedManipulationToday, usedFightToday]);

  const handleManipulate = async () => {
    if (!user?.id || isManipulating) {
      return;
    }
    if (usedManipulationToday || usedFightToday) {
      setManipulationError('오늘은 이미 여론 조작을 사용했어요.');
      return;
    }
    if (gameState && gameState.minsim < manipulationCost) {
      setManipulationError('민심이 부족합니다.');
      return;
    }
    setIsManipulating(true);
    setManipulationError('');
    try {
      await applyMinsim(user.id, {
        amount: -manipulationCost,
        reason: 'MANIPULATION',
        refTable: 'faction',
        refId: gameState?.dayCount ?? 0,
      });
      refresh();
      setUsedManipulationToday(true);
    } catch (error) {
      setManipulationError('여론 조작에 실패했어요.');
    } finally {
      setIsManipulating(false);
    }
  };

  const handleFight = async () => {
    if (!user?.id || isFighting) {
      return;
    }
    if (usedFightToday) {
      setActionError('오늘은 이미 승부를 봤어요.');
      return;
    }

    setIsFighting(true);
    setActionError('');
    setFightResult('');
    try {
      const response = await resolveFaction({
        userId: user.id,
        dayCount: gameState?.dayCount ?? 1,
        manipulationUsed: usedManipulationToday ? 1 : 0,
      });
      setFightResult(
        `결과: ${response.data.result} · 권위 변화 ${response.data.authorityDelta}`
      );
      refresh();
      setUsedFightToday(true);
    } catch (error) {
      setActionError('승부 처리에 실패했어요.');
    } finally {
      setIsFighting(false);
    }
  };

  return (
    <View style={[styles.container, isNight ? styles.containerNight : styles.containerDay]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Feather name="zap" size={22} color={isNight ? '#ef4444' : '#dc2626'} />
          <Text style={[styles.headerTitle, isNight ? styles.headerTitleNight : styles.headerTitleDay]}>
            세력 싸움
          </Text>
        </View>

        <View style={[styles.card, isNight ? styles.cardNight : styles.cardDay]}>
          <View style={styles.faceoffRow}>
            <View style={styles.faceoffSide}>
              <Image
                source={require('../assets/character/daewongun.png')}
                style={[styles.faceoffImage, { transform: [{ scale: leftScale }] }]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.faceoffSide}>
              <Image
                source={require('../assets/character/hwanghoo.png')}
                style={[styles.faceoffImage, { transform: [{ scale: rightScale }] }]}
                resizeMode="contain"
              />
            </View>
          </View>
          <AuthorityGauge value={authorityValue} showTitle={false} showValues={false} />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isNight ? styles.sectionTitleNight : styles.sectionTitleDay]}>
            오늘의 승률 예측
          </Text>
          <View style={styles.predictionRow}>
            <View style={styles.predictionCell}>
              <Text style={[styles.predictionLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                보수파
              </Text>
              <Text style={[styles.predictionValue, styles.predictionValueMuted]}>
                {displayOpponentRate}%
              </Text>
            </View>
            <Text style={[styles.vsText, isNight ? styles.textMutedNight : styles.textMutedDay]}>VS</Text>
            <View style={styles.predictionCell}>
              <Text style={[styles.predictionLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                여론파
              </Text>
              <Text style={[styles.predictionValue, styles.predictionValueHot]}>
                {displayWinRate}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
            정치적 액션
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.actionCard,
              isNight ? styles.actionCardNight : styles.actionCardDay,
              usedManipulationToday || usedFightToday ? styles.actionCardDisabled : null,
            ]}
            onPress={handleManipulate}
            disabled={isManipulating || usedManipulationToday || usedFightToday}
          >
            <View style={[styles.actionIconWrap, isNight ? styles.actionIconWrapNight : styles.actionIconWrapDay]}>
              <Feather name="coffee" size={22} color={isNight ? '#60a5fa' : '#b45309'} />
            </View>
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, isNight ? styles.textMainNight : styles.textMainDay]}>
                여론 조작하기
              </Text>
              <Text style={[styles.actionSubtitle, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                {usedManipulationToday ? '오늘 완료됨' : '민심을 소모해 오늘 승률을 올립니다.'}
              </Text>
            </View>
            <View style={styles.actionMeta}>
              <Text style={styles.actionCost}>민심 -{manipulationCost}</Text>
              <Text style={styles.actionBenefit}>+5% 승률</Text>
            </View>
          </TouchableOpacity>
          {manipulationError ? <Text style={styles.inlineErrorText}>{manipulationError}</Text> : null}
        </View>

        <View style={styles.spacer} />

        <View style={styles.mainAction}>
          <Text style={[styles.mainActionNote, isNight ? styles.textMutedNight : styles.textMutedDay]}>
            <Text style={styles.mainActionNoteStrong}>오늘의 대결</Text> 하루 1회 제한
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.mainButton,
              isNight ? styles.mainButtonNight : styles.mainButtonDay,
              isLockedToday ? styles.mainButtonDisabled : null,
            ]}
            onPress={handleFight}
            disabled={isFighting || isLockedToday}
          >
            <Feather name="zap" size={24} color="#fff" />
            <Text style={styles.mainButtonText}>
              {isFighting ? '처리 중...' : usedFightToday ? '오늘 완료됨' : '승부 보기'}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.mainActionHint, isNight ? styles.hintNight : styles.hintDay]}>
            현재 승률 {displayWinRate}%로 결과를 확인합니다.
          </Text>
          {fightResult ? <Text style={styles.resultText}>{fightResult}</Text> : null}
          {actionError ? <Text style={styles.errorText}>{actionError}</Text> : null}
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
    backgroundColor: '#020617',
  },
  content: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerTitleDay: {
    color: '#78350f',
  },
  headerTitleNight: {
    color: '#f8fafc',
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardDay: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  cardNight: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  faceoffRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  faceoffSide: {
    alignItems: 'center',
    flex: 1,
  },
  faceoffImage: {
    width: 92,
    height: 92,
  },
  faceoffLabel: {
    fontSize: 11,
    marginTop: 6,
    fontWeight: '700',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionTitleDay: {
    color: '#78350f',
  },
  sectionTitleNight: {
    color: '#e2e8f0',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  predictionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  predictionCell: {
    flex: 1,
    alignItems: 'center',
  },
  predictionLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  predictionValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  predictionValueMuted: {
    color: '#94a3b8',
  },
  predictionValueHot: {
    color: '#ef4444',
  },
  vsText: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  actionCardDay: {
    backgroundColor: '#ffffff',
    borderColor: '#fde68a',
  },
  actionCardNight: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
  },
  actionCardDisabled: {
    opacity: 0.5,
  },
  actionIconWrap: {
    padding: 12,
    borderRadius: 999,
    marginRight: 12,
  },
  actionIconWrapDay: {
    backgroundColor: '#fde68a',
  },
  actionIconWrapNight: {
    backgroundColor: '#1e293b',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 11,
  },
  actionMeta: {
    alignItems: 'flex-end',
  },
  actionCost: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 12,
  },
  actionBenefit: {
    color: '#22c55e',
    fontSize: 11,
  },
  inlineErrorText: {
    marginTop: 6,
    marginLeft: 6,
    fontSize: 11,
    color: '#b91c1c',
  },
  spacer: {
    flex: 1,
  },
  mainAction: {
    marginTop: 8,
  },
  mainActionNote: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 8,
  },
  mainActionNoteStrong: {
    fontWeight: '700',
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 18,
  },
  mainButtonDay: {
    backgroundColor: '#ef4444',
  },
  mainButtonNight: {
    backgroundColor: '#dc2626',
  },
  mainButtonDisabled: {
    opacity: 0.5,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  mainActionHint: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 8,
  },
  hintDay: {
    color: 'rgba(120, 53, 15, 0.5)',
  },
  hintNight: {
    color: '#475569',
  },
  textMainDay: {
    color: '#78350f',
  },
  textMainNight: {
    color: '#e2e8f0',
  },
  textMutedDay: {
    color: 'rgba(120, 53, 15, 0.6)',
  },
  textMutedNight: {
    color: '#94a3b8',
  },
  errorText: {
    textAlign: 'center',
    color: '#b91c1c',
    fontSize: 12,
    marginTop: 8,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 6,
    color: '#0f766e',
  },
});
