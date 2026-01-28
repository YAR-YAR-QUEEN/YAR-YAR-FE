import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import { useDayNight } from '../contexts/DayNightContext';
import { useGameState } from '../contexts/GameStateContext';
import { useAuth } from '../contexts/AuthContext';
import { fetchReelsList } from '../services/reelsListService';
import { fetchReelsDetail } from '../services/reelsDetailService';
import type { ReelsListItemDto, ReelsDetailDto } from '../types/dto';

const getReelsTier = (score: number) => {
  if (score >= 10000) {
    return {
      label: '천하제일 릴스황',
      image: require('../assets/tiers/tier_5.png'),
      colors: { bg: '#fee2e2', text: '#b91c1c' },
    };
  }
  if (score >= 6000) {
    return {
      label: '조선 밈 권력자',
      image: require('../assets/tiers/tier_4.png'),
      colors: { bg: '#ede9fe', text: '#6d28d9' },
    };
  }
  if (score >= 3000) {
    return {
      label: '도성 인기 릴서',
      image: require('../assets/tiers/tier_3.png'),
      colors: { bg: '#dbeafe', text: '#1d4ed8' },
    };
  }
  if (score >= 1000) {
    return {
      label: '저잣거리 릴서',
      image: require('../assets/tiers/tier_2.png'),
      colors: { bg: '#fef3c7', text: '#b45309' },
    };
  }
  return {
    label: '동네 인플루언서',
    image: require('../assets/tiers/tier_1.png'),
    colors: { bg: '#dcfce7', text: '#15803d' },
  };
};

export function ProfilePage() {
  const { isNight } = useDayNight();
  const { gameState } = useGameState();
  const { user } = useAuth();
  const [reels, setReels] = useState<ReelsListItemDto[]>([]);
  const [reelsLoading, setReelsLoading] = useState(false);
  const [reelsFailed, setReelsFailed] = useState(false);
  const [selectedReel, setSelectedReel] = useState<ReelsDetailDto | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const reelsScore = gameState?.reelsScore ?? 0;
  const reelsTier = getReelsTier(reelsScore);

  const stats = [
    { label: '도파민', value: gameState?.dopamine ?? 0, color: '#ef4444' },
    { label: '화제성', value: gameState?.buzz ?? 0, color: '#eab308' },
    { label: '인지도', value: gameState?.awareness ?? 0, color: '#3b82f6' },
  ];

  useEffect(() => {
    if (!user?.id) {
      setReels([]);
      return;
    }

    setReelsLoading(true);
    setReelsFailed(false);
    fetchReelsList(user.id)
      .then((data) => {
        setReels(data);
        setReelsFailed(false);
      })
      .catch(() => {
        setReels([]);
        setReelsFailed(true);
      })
      .finally(() => {
        setReelsLoading(false);
      });
  }, [user?.id]);

  const handleOpenReel = async (reelId: number) => {
    setDetailLoading(true);
    setDetailError('');
    try {
      const detail = await fetchReelsDetail(reelId);
      setSelectedReel(detail);
    } catch (error) {
      setDetailError('릴스를 불러오지 못했어요.');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedReel(null);
    setDetailError('');
  };

  return (
    <View style={[styles.container, isNight ? styles.containerNight : styles.containerDay]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarGradient}>
              <Image
                source={reelsTier.image}
                style={styles.avatar}
              />
            </View>
          </View>
          <Text style={[styles.name, isNight ? styles.nameNight : styles.nameDay]}>
            {user?.nickname ?? '??'}
          </Text>
          <View style={[styles.tierBadge, { backgroundColor: reelsTier.colors.bg }]}>
            <Text style={[styles.tierTitle, { color: reelsTier.colors.text }]}>
              {reelsTier.label}
            </Text>
          </View>

          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View
                key={stat.label}
                style={[styles.statCard, isNight ? styles.statCardNight : styles.statCardDay]}
              >
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.tabBar, isNight ? styles.tabBarNight : styles.tabBarDay]}>
          <View style={styles.tabItem}>
            <Feather name="grid" size={20} color={isNight ? '#60a5fa' : '#b45309'} />
          </View>
        </View>

        {reelsLoading ? (
          <Text style={[styles.reelsInfo, isNight ? styles.textMutedNight : styles.textMutedDay]}>
            릴스를 불러오는 중...
          </Text>
        ) : null}

        {!reelsLoading && reels.length === 0 ? (
          <Text style={[styles.reelsInfo, isNight ? styles.textMutedNight : styles.textMutedDay]}>
            {reelsFailed ? '릴스를 불러오지 못했어요.' : '아직 릴스가 없습니다.'}
          </Text>
        ) : null}

        <View style={styles.reelsGrid}>
          {reels.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => handleOpenReel(item.id)}
              style={[styles.reelTile, isNight ? styles.reelTileNight : styles.reelTileDay]}
            >
              <Text style={styles.reelEmoji}>🎬</Text>
              <Text style={[styles.reelTitle, isNight ? styles.textMainNight : styles.textMainDay]}>
                #{item.id}
              </Text>
              <Text style={[styles.reelMeta, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                {item.reelsScore}점
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal visible={!!selectedReel || detailLoading || !!detailError} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, isNight ? styles.modalCardNight : styles.modalCardDay]}>
            <TouchableOpacity style={styles.modalClose} onPress={closeModal}>
              <Feather name="x" size={18} color={isNight ? '#e2e8f0' : '#78350f'} />
            </TouchableOpacity>

            {detailLoading ? (
              <View style={styles.modalLoading}>
                <ActivityIndicator color={isNight ? '#60a5fa' : '#f59e0b'} />
                <Text style={[styles.modalText, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                  릴스를 불러오는 중...
                </Text>
              </View>
            ) : null}

            {!detailLoading && detailError ? (
              <Text style={[styles.modalText, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                {detailError}
              </Text>
            ) : null}

            {!detailLoading && selectedReel ? (
              <>
                <Text style={[styles.modalTitle, isNight ? styles.textMainNight : styles.textMainDay]}>
                  릴스 #{selectedReel.id}
                </Text>
                <View style={styles.videoWrap}>
                  <Video
                    source={{ uri: selectedReel.videoUrl }}
                    style={styles.video}
                    controls
                    resizeMode="cover"
                  />
                </View>
                <Text style={[styles.modalText, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                  점수 {selectedReel.reelsScore} · 도파민 {selectedReel.dopamine} · 버즈 {selectedReel.buzz}
                </Text>
                <Text style={[styles.modalText, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                  인지도 {selectedReel.awareness} · 상소문 {selectedReel.petitionId ?? '-'}
                </Text>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#0f172a',
  },
  content: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f97316',
    padding: 3,
    marginBottom: 12,
  },
  avatarGradient: {
    flex: 1,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#e2e8f0',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  nameDay: {
    color: '#78350f',
  },
  nameNight: {
    color: '#f8fafc',
  },
  tierBadge: {
    marginTop: 6,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tierTitle: {
    fontSize: 11,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  statCard: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statCardDay: {
    backgroundColor: '#ffffff',
  },
  statCardNight: {
    backgroundColor: '#1e293b',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  tabBar: {
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  tabBarDay: {
    borderBottomColor: '#fde68a',
  },
  tabBarNight: {
    borderBottomColor: '#1e293b',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  reelsInfo: {
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'center',
    alignSelf: 'center',
  },
  reelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reelTile: {
    width: '31%',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  reelTileDay: {
    backgroundColor: '#ffffff',
    borderColor: '#fde68a',
  },
  reelTileNight: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
  },
  reelEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  reelTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  reelMeta: {
    fontSize: 10,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  modalCardDay: {
    backgroundColor: '#ffffff',
    borderColor: '#fde68a',
  },
  modalCardNight: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
  },
  modalClose: {
    alignSelf: 'flex-end',
    padding: 6,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 11,
    marginTop: 8,
  },
  modalLoading: {
    alignItems: 'center',
    gap: 8,
  },
  videoWrap: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
  },
  video: {
    width: '100%',
    height: '100%',
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