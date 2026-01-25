import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface FactionPageProps {
  isNight: boolean;
}

export function FactionPage({ isNight }: FactionPageProps) {
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
          <AuthorityGauge value={55} isNight={isNight} />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isNight ? styles.sectionTitleNight : styles.sectionTitleDay]}>
            오늘의 승률 예측
          </Text>
          <View style={styles.predictionRow}>
            <View style={styles.predictionCell}>
              <Text style={[styles.predictionLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                대원군
              </Text>
              <Text style={[styles.predictionValue, styles.predictionValueMuted]}>45%</Text>
            </View>
            <Text style={[styles.vsText, isNight ? styles.textMutedNight : styles.textMutedDay]}>VS</Text>
            <View style={styles.predictionCell}>
              <Text style={[styles.predictionLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                황후
              </Text>
              <Text style={[styles.predictionValue, styles.predictionValueHot]}>55%</Text>
            </View>
          </View>

          <View style={[styles.infoBox, isNight ? styles.infoBoxNight : styles.infoBoxDay]}>
            <Feather name="trending-up" size={14} color={isNight ? '#bfdbfe' : '#1d4ed8'} />
            <Text style={[styles.infoText, isNight ? styles.infoTextNight : styles.infoTextDay]}>
              AI 분석: 어제 올린 '고양이 챌린지'가 화제성 지표를 견인했습니다.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
            정치적 액션
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.actionCard, isNight ? styles.actionCardNight : styles.actionCardDay]}
          >
            <View style={[styles.actionIconWrap, isNight ? styles.actionIconWrapNight : styles.actionIconWrapDay]}>
              <Feather name="coffee" size={22} color={isNight ? '#60a5fa' : '#b45309'} />
            </View>
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, isNight ? styles.textMainNight : styles.textMainDay]}>
                여론 조작하기
              </Text>
              <Text style={[styles.actionSubtitle, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                성균관 유생들에게 뜨거운 가배를 돌려 개화 여론을 형성합니다.
              </Text>
            </View>
            <View style={styles.actionMeta}>
              <Text style={styles.actionCost}>❤️ -500</Text>
              <Text style={styles.actionBenefit}>+5% 승률</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

        <View style={styles.mainAction}>
          <Text style={[styles.mainActionNote, isNight ? styles.textMutedNight : styles.textMutedDay]}>
            <Text style={styles.mainActionNoteStrong}>오늘의 대결</Text> • 하루 1회 가능
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.mainButton, isNight ? styles.mainButtonNight : styles.mainButtonDay]}
          >
            <Feather name="zap" size={24} color="#fff" />
            <Text style={styles.mainButtonText}>싸움 붙이기</Text>
          </TouchableOpacity>
          <Text style={[styles.mainActionHint, isNight ? styles.hintNight : styles.hintDay]}>
            현재 승률 55%로 즉시 결과를 확인합니다
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function AuthorityGauge({ value, isNight }: { value: number; isNight: boolean }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <View>
      <View style={styles.gaugeHeader}>
        <Feather name="activity" size={16} color={isNight ? '#93c5fd' : '#78350f'} />
        <Text style={[styles.gaugeTitle, isNight ? styles.textMainNight : styles.textMainDay]}>
          현재 권위 상태
        </Text>
      </View>
      <View style={styles.gaugeRow}>
        <Text style={[styles.gaugeLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>대원군</Text>
        <Text style={[styles.gaugeValue, isNight ? styles.textMainNight : styles.textMainDay]}>{clamped}%</Text>
        <Text style={[styles.gaugeLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>황후</Text>
      </View>
      <View style={[styles.gaugeTrack, isNight ? styles.gaugeTrackNight : styles.gaugeTrackDay]}>
        <View style={[styles.gaugeFill, { width: `${clamped}%` }]} />
      </View>
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  infoBoxDay: {
    backgroundColor: '#dbeafe',
  },
  infoBoxNight: {
    backgroundColor: 'rgba(30, 58, 138, 0.25)',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  infoTextDay: {
    color: '#1e3a8a',
  },
  infoTextNight: {
    color: '#bfdbfe',
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
  gaugeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  gaugeTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  gaugeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gaugeLabel: {
    fontSize: 12,
  },
  gaugeValue: {
    fontSize: 14,
    fontWeight: '700',
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
    backgroundColor: '#1e293b',
  },
  gaugeFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 6,
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
});
