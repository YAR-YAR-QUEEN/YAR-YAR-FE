import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { usePetition } from '../contexts/PetitionContext';

interface StreetPageProps {
  onNavigate?: (route: string) => void;
}

export function StreetPage({ onNavigate }: StreetPageProps) {
  const { selectedPetition } = usePetition();
  const missionTitle = selectedPetition
    ? selectedPetition.type === 'POSITIVE'
      ? '기쁜 소식'
      : '어두운 소식'
    : '오늘의 미션';
  const missionDesc =
    selectedPetition?.description ??
    '한양 백성들의 도파민 부족 해결을 위한 상소문입니다.';
  const tags = selectedPetition
    ? [
        { label: `도파민 +${selectedPetition.dopamine}`, color: 'red' as const },
        { label: `버즈 +${selectedPetition.buzz}`, color: 'yellow' as const },
        { label: `인지 +${selectedPetition.awareness}`, color: 'blue' as const },
      ]
    : [
        { label: '도파민 +1.5', color: 'red' as const },
        { label: '버즈 +1.0', color: 'yellow' as const },
      ];

  return (
    <View style={[styles.container, styles.containerDay]}>
      <View style={styles.lanternBackdrop}>
        <Text style={styles.lanternEmoji}>🏮🏮🏮</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onNavigate?.('/petition')}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={18} color="#78350f" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={[styles.title, styles.titleDay]}>저잣거리</Text>
          <Text style={[styles.subtitle, styles.subtitleDay]}>
            백성들이 모이는 번화한 시장
          </Text>
        </View>

        <View style={[styles.missionCard, styles.missionCardDay]}>
          <View style={styles.missionRow}>
            <Text style={styles.missionEmoji}>📜</Text>
            <View style={styles.missionBody}>
              <Text style={[styles.missionTitle, styles.textMainDay]}>{missionTitle}</Text>
              <Text style={[styles.missionDesc, styles.subtitleDay]}>{missionDesc}</Text>
              <View style={styles.missionTags}>
                {tags.map((tag) => (
                  <View
                    key={tag.label}
                    style={[
                      styles.tag,
                      tag.color === 'red'
                        ? styles.tagRed
                        : tag.color === 'yellow'
                          ? styles.tagYellow
                          : styles.tagBlue,
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        tag.color === 'red'
                          ? styles.tagRedText
                          : tag.color === 'yellow'
                            ? styles.tagYellowText
                            : styles.tagBlueText,
                      ]}
                    >
                      {tag.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.actionCard, styles.actionCardDay]}
            onPress={() => onNavigate?.('/inventory')}
          >
            <View style={[styles.actionIconWrap, styles.actionIconWrapPurpleDay]}>
              <Feather name="package" size={24} color="#7e22ce" />
            </View>
            <View style={styles.actionBody}>
              <Text style={[styles.actionTitle, styles.textMainDay]}>아이템 사용하기</Text>
              <Text style={[styles.actionDesc, styles.subtitleDay]}>
                보유한 아이템으로 릴스 강화
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.actionCard, styles.actionCardDay]}
            onPress={() => onNavigate?.('/filming')}
          >
            <View style={[styles.actionIconWrap, styles.actionIconWrapBlueDay]}>
              <Feather name="camera" size={24} color="#2563eb" />
            </View>
            <View style={styles.actionBody}>
              <Text style={[styles.actionTitle, styles.textMainDay]}>릴스 촬영하기</Text>
              <Text style={[styles.actionDesc, styles.subtitleDay]}>오늘의 미션 수행</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.homeButton, styles.homeButtonDay]}
            onPress={() => onNavigate?.('/')}
          >
            <Feather name="home" size={18} color="#78350f" />
            <Text style={[styles.homeButtonText, styles.homeButtonTextDay]}>궁으로 돌아가기</Text>
          </TouchableOpacity>
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
    backgroundColor: '#fff7ed',
  },
  lanternBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    opacity: 0.08,
  },
  lanternEmoji: {
    fontSize: 64,
    marginTop: 40,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(148, 163, 184, 0.25)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  titleDay: {
    color: '#78350f',
  },
  subtitle: {
    fontSize: 12,
  },
  subtitleDay: {
    color: 'rgba(120, 53, 15, 0.7)',
  },
  missionCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 24,
  },
  missionCardDay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: '#fcd34d',
  },
  missionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  missionEmoji: {
    fontSize: 22,
  },
  missionBody: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  missionDesc: {
    fontSize: 12,
  },
  missionTags: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  tagRed: {
    backgroundColor: '#fee2e2',
  },
  tagRedText: {
    color: '#dc2626',
  },
  tagYellow: {
    backgroundColor: '#fef3c7',
  },
  tagYellowText: {
    color: '#d97706',
  },
  tagBlue: {
    backgroundColor: '#dbeafe',
  },
  tagBlueText: {
    color: '#2563eb',
  },
  actions: {
    gap: 12,
    marginBottom: 24,
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
  actionIconWrap: {
    padding: 12,
    borderRadius: 999,
    marginRight: 12,
  },
  actionIconWrapPurpleDay: {
    backgroundColor: '#f3e8ff',
  },
  actionIconWrapBlueDay: {
    backgroundColor: '#dbeafe',
  },
  actionBody: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 12,
  },
  footer: {
    marginTop: 'auto',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  homeButtonDay: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
  },
  homeButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  homeButtonTextDay: {
    color: '#78350f',
  },
  textMainDay: {
    color: '#78350f',
  },
});
