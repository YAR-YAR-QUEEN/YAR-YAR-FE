import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDayNight } from '../contexts/DayNightContext';
import { useGameState } from '../contexts/GameStateContext';

interface PetitionPageProps {
  onNavigate?: (route: string) => void;
}

type Difficulty = '상' | '중' | '하';

const MISSIONS: Array<{
  id: number;
  title: string;
  content: string;
  stats: { dopamine: number; buzz: number; awareness: number };
  difficulty: Difficulty;
}> = [
  {
    id: 1,
    title: '한양 백성들의 도파민 부족에 관한 건',
    content:
      '최근 도성에 활기가 부족하오니, 마마의 힙한 춤사위로 도파민을 채워주소서.',
    stats: { dopamine: 1.5, buzz: 1.0, awareness: 0.5 },
    difficulty: '상',
  },
  {
    id: 2,
    title: '경복궁 고양이 챌린지 유행',
    content:
      '궁궐 담벼락의 고양이들이 귀엽다는 소문입니다. 이를 활용한 숏폼을 제작하소서.',
    stats: { dopamine: 0.8, buzz: 1.2, awareness: 0.3 },
    difficulty: '중',
  },
  {
    id: 3,
    title: "신문물 '커피' 시음기 요청",
    content:
      '가비(커피)라는 검은 물이 유행이라 하옵니다. 마마께서 직접 시음하시는 모습을...',
    stats: { dopamine: 0.5, buzz: 0.8, awareness: 1.2 },
    difficulty: '하',
  },
];

const DIFFICULTY_COLORS: Record<Difficulty, { bg: string; text: string }> = {
  상: { bg: '#fee2e2', text: '#dc2626' },
  중: { bg: '#ffedd5', text: '#ea580c' },
  하: { bg: '#dcfce7', text: '#16a34a' },
};

export function PetitionPage({ onNavigate }: PetitionPageProps) {
  const { isNight } = useDayNight();
  const { gameState } = useGameState();

  return (
    <View style={[styles.container, isNight ? styles.containerNight : styles.containerDay]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onNavigate?.('/')}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={20} color={isNight ? '#e2e8f0' : '#78350f'} />
          </TouchableOpacity>
          <Text style={[styles.title, isNight ? styles.titleNight : styles.titleDay]}>
            📜 오늘의 상소문
          </Text>
          {gameState ? (
            <View style={[styles.dayBadge, isNight ? styles.dayBadgeNight : styles.dayBadgeDay]}>
              <Text style={[styles.dayBadgeText, isNight ? styles.dayBadgeTextNight : styles.dayBadgeTextDay]}>
                D{gameState.dayCount} · {gameState.phase}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.list}>
          {MISSIONS.map((mission) => {
            const tone = DIFFICULTY_COLORS[mission.difficulty];
            return (
              <View
                key={mission.id}
                style={[styles.card, isNight ? styles.cardNight : styles.cardDay]}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardTitle, isNight ? styles.textMainNight : styles.textMainDay]}>
                    {mission.title}
                  </Text>
                  <View style={[styles.badge, { backgroundColor: tone.bg }]}>
                    <Text style={[styles.badgeText, { color: tone.text }]}>
                      난이도 {mission.difficulty}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.cardBody, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                  {mission.content}
                </Text>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Feather name="activity" size={12} color="#ef4444" />
                    <Text style={[styles.statText, { color: '#ef4444' }]}>
                      +{mission.stats.dopamine}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Feather name="zap" size={12} color="#eab308" />
                    <Text style={[styles.statText, { color: '#eab308' }]}>
                      +{mission.stats.buzz}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Feather name="users" size={12} color="#3b82f6" />
                    <Text style={[styles.statText, { color: '#3b82f6' }]}>
                      +{mission.stats.awareness}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[styles.actionButton, isNight ? styles.actionButtonNight : styles.actionButtonDay]}
                  onPress={() => onNavigate?.('/street')}
                >
                  <Text style={styles.actionButtonText}>저잣거리 나가기</Text>
                </TouchableOpacity>
              </View>
            );
          })}
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
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(148, 163, 184, 0.15)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  titleDay: {
    color: '#78350f',
  },
  titleNight: {
    color: '#f8fafc',
  },
  dayBadge: {
    marginLeft: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  dayBadgeDay: {
    backgroundColor: '#fef3c7',
  },
  dayBadgeNight: {
    backgroundColor: '#1e293b',
  },
  dayBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  dayBadgeTextDay: {
    color: '#92400e',
  },
  dayBadgeTextNight: {
    color: '#e2e8f0',
  },
  list: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
  },
  cardDay: {
    backgroundColor: '#ffffff',
    borderColor: '#fde68a',
  },
  cardNight: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardBody: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonDay: {
    backgroundColor: '#f59e0b',
  },
  actionButtonNight: {
    backgroundColor: '#2563eb',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  textMainDay: {
    color: '#78350f',
  },
  textMainNight: {
    color: '#f8fafc',
  },
  textMutedDay: {
    color: 'rgba(120, 53, 15, 0.7)',
  },
  textMutedNight: {
    color: '#cbd5f5',
  },
});
