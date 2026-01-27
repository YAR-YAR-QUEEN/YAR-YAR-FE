import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDayNight } from '../contexts/DayNightContext';
import { AuthorityGauge } from '../components/AuthorityGauge';
import { useGameState } from '../contexts/GameStateContext';
import { useAuth } from '../contexts/AuthContext';
import { applyMinsim } from '../services/minsimService';

export function FactionPage() {
  const { isNight } = useDayNight();
  const { gameState, refresh } = useGameState();
  const { user } = useAuth();
  const [isManipulating, setIsManipulating] = useState(false);
  const [actionError, setActionError] = useState('');
  const winRate = Math.round(gameState?.winRate ?? 55);
  const opponentRate = Math.max(0, 100 - winRate);
  const manipulationCost = 500;

  const handleManipulate = async () => {
    if (!user?.id || isManipulating) {
      return;
    }
    if (gameState && gameState.minsim < manipulationCost) {
      setActionError('민심이 부족합니다.');
      return;
    }
    setIsManipulating(true);
    setActionError('');
    try {
      await applyMinsim(user.id, {
        amount: -manipulationCost,
        reason: 'MANIPULATION',
        refTable: 'faction',
        refId: gameState?.dayCount ?? 0,
      });
      refresh();
    } catch (error) {
      setActionError('여론 조작에 실패했어요.');
    } finally {
      setIsManipulating(false);
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
          <AuthorityGauge value={gameState?.authority ?? 30} />
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
              <Text style={[styles.predictionValue, styles.predictionValueMuted]}>{opponentRate}%</Text>
            </View>
            <Text style={[styles.vsText, isNight ? styles.textMutedNight : styles.textMutedDay]}>VS</Text>
            <View style={styles.predictionCell}>
              <Text style={[styles.predictionLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                여론파
              </Text>
              <Text style={[styles.predictionValue, styles.predictionValueHot]}>{winRate}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
            정치적 액션
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.actionCard, isNight ? styles.actionCardNight : styles.actionCardDay]}
            onPress={handleManipulate}
            disabled={isManipulating}
          >
            <View style={[styles.actionIconWrap, isNight ? styles.actionIconWrapNight : styles.actionIconWrapDay]}>
              <Feather name="coffee" size={22} color={isNight ? '#60a5fa' : '#b45309'} />
            </View>
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, isNight ? styles.textMainNight : styles.textMainDay]}>
                여론 조작하기
              </Text>
              <Text style={[styles.actionSubtitle, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                민심을 소모해 오늘 승률을 올립니다.
              </Text>
            </View>
            <View style={styles.actionMeta}>
              <Text style={styles.actionCost}>민심 -{manipulationCost}</Text>
              <Text style={styles.actionBenefit}>+5% 승률</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

        <View style={styles.mainAction}>
          <Text style={[styles.mainActionNote, isNight ? styles.textMutedNight : styles.textMutedDay]}>
            <Text style={styles.mainActionNoteStrong}>오늘의 대결</Text> 하루 1회 제한
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.mainButton, isNight ? styles.mainButtonNight : styles.mainButtonDay]}
          >
            <Feather name="zap" size={24} color="#fff" />
            <Text style={styles.mainButtonText}>승부 보기</Text>
          </TouchableOpacity>
          <Text style={[styles.mainActionHint, isNight ? styles.hintNight : styles.hintDay]}>
            현재 승률 {winRate}%로 결과를 확인합니다.
          </Text>
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
});
