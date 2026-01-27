import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDayNight } from '../contexts/DayNightContext';
import { useAuth } from '../contexts/AuthContext';
import { useGameState } from '../contexts/GameStateContext';
import { fetchItems, fetchUserItems } from '../services/itemService';
import { applyMinsim } from '../services/minsimService';
import type { ItemDto, UserItemDto } from '../types/dto';

const getItemIcon = (item: ItemDto) => {
  if (item.type === 'FILTER') return '🎞️';
  if (item.type === 'BUFF') return '✨';
  return '🎁';
};

const getEffectLabel = (item: ItemDto) => {
  const { type, value, duration } = item.effect;
  if (type === 'REELS_MULTIPLIER') {
    return `릴스 x${value} (${duration}s)`;
  }
  if (type === 'AUTHORITY_BUFF') {
    return `권위 +${value} (${duration}s)`;
  }
  return `효과 +${value} (${duration}s)`;
};

const formatExpireAt = (value?: string) => {
  if (!value) return '만료 없음';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const diffMs = date.getTime() - Date.now();
  if (diffMs <= 0) return '만료됨';
  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}일 ${hours}시간 남음`;
  if (hours > 0) return `${hours}시간 ${minutes}분 남음`;
  return `${minutes}분 남음`;
};

export function MarketPage() {
  const { isNight } = useDayNight();
  const { user } = useAuth();
  const { gameState, refresh } = useGameState();
  const [items, setItems] = useState<ItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [ownedItems, setOwnedItems] = useState<UserItemDto[]>([]);
  const [ownedLoading, setOwnedLoading] = useState(false);
  const [ownedFailed, setOwnedFailed] = useState(false);
  const [purchasingId, setPurchasingId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setLoadFailed(false);
    fetchItems()
      .then((response) => {
        setItems(response.data);
        setLoadFailed(false);
      })
      .catch(() => {
        setItems([]);
        setLoadFailed(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loadOwnedItems = () => {
    if (!user?.id) {
      setOwnedItems([]);
      return;
    }

    setOwnedLoading(true);
    setOwnedFailed(false);
    fetchUserItems(user.id)
      .then((response) => {
        setOwnedItems(response.data);
        setOwnedFailed(false);
      })
      .catch(() => {
        setOwnedItems([]);
        setOwnedFailed(true);
      })
      .finally(() => {
        setOwnedLoading(false);
      });
  };

  useEffect(() => {
    loadOwnedItems();
  }, [user?.id]);

  const handlePurchase = async (item: ItemDto) => {
    if (!user?.id || purchasingId !== null) {
      return;
    }
    if (gameState && gameState.minsim < item.priceMinsim) {
      Alert.alert('민심 부족', '민심이 부족합니다.');
      return;
    }

    setPurchasingId(item.id);
    try {
      await applyMinsim(user.id, {
        amount: -item.priceMinsim,
        reason: 'ITEM_PURCHASE',
        refTable: 'items',
        refId: item.id,
      });
      refresh();
      loadOwnedItems();
    } catch (error) {
      Alert.alert('구매 실패', '아이템 구매에 실패했어요.');
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <View style={[styles.container, isNight ? styles.containerNight : styles.containerDay]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Feather name="shopping-bag" size={22} color={isNight ? '#fbbf24' : '#d97706'} />
          <Text style={[styles.headerTitle, isNight ? styles.headerTitleNight : styles.headerTitleDay]}>
            왕실 상점
          </Text>
        </View>

        <View style={styles.grid}>
          {loading ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator color={isNight ? '#60a5fa' : '#f59e0b'} />
              <Text style={[styles.loadingText, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                아이템을 불러오는 중...
              </Text>
            </View>
          ) : null}

          {!loading && items.length === 0 ? (
            <Text style={[styles.emptyText, isNight ? styles.textMutedNight : styles.textMutedDay]}>
              {loadFailed ? '아이템을 불러오지 못했어요.' : '아이템이 없습니다.'}
            </Text>
          ) : null}

          {items.map((item) => (
            <View
              key={item.id}
              style={[styles.itemCard, isNight ? styles.itemCardNight : styles.itemCardDay]}
            >
              <Text style={styles.itemIcon}>{getItemIcon(item)}</Text>
              <Text style={[styles.itemName, isNight ? styles.textMainNight : styles.textMainDay]}>
                {item.name}
              </Text>
              <Text style={[styles.itemDesc, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                {getEffectLabel(item)}
              </Text>
              <Text style={styles.itemPrice}>{item.priceMinsim} 민심</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.buyButton, isNight ? styles.buyButtonNight : styles.buyButtonDay]}
                onPress={() => handlePurchase(item)}
                disabled={purchasingId !== null}
              >
                <Text style={[styles.buyButtonText, isNight ? styles.buyTextNight : styles.buyTextDay]}>
                  {purchasingId === item.id ? '구매 중...' : '구매하기'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.ownedSection}>
          <Text style={[styles.sectionTitle, isNight ? styles.sectionTitleNight : styles.sectionTitleDay]}>
            보유 아이템
          </Text>
          <View style={[styles.ownedCard, isNight ? styles.ownedCardNight : styles.ownedCardDay]}>
            {ownedLoading ? (
              <>
                <Text style={styles.ownedIcon}>🎒</Text>
                <Text style={[styles.ownedText, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                  보유 아이템을 불러오는 중...
                </Text>
              </>
            ) : null}

            {!ownedLoading && ownedItems.length === 0 ? (
              <>
                <Text style={styles.ownedIcon}>🎒</Text>
                <Text style={[styles.ownedText, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                  {ownedFailed ? '보유 아이템을 불러오지 못했어요.' : '아직 구매한 아이템이 없습니다.'}
                </Text>
              </>
            ) : null}

            {ownedItems.map((item) => (
              <View key={`${item.itemId}-${item.expireAt ?? 'none'}`} style={styles.ownedRow}>
                <Text style={[styles.ownedName, isNight ? styles.textMainNight : styles.textMainDay]}>
                  {item.name}
                </Text>
                <Text style={[styles.ownedMeta, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                  {item.remainCount}개 보유 · 만료 {formatExpireAt(item.expireAt)}
                </Text>
              </View>
            ))}
          </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loadingWrap: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
  },
  emptyText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    paddingVertical: 16,
  },
  itemCard: {
    width: '48%',
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 12,
  },
  itemCardDay: {
    backgroundColor: '#ffffff',
    borderColor: '#fde68a',
  },
  itemCardNight: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
  },
  itemIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#d97706',
    marginBottom: 8,
  },
  buyButton: {
    width: '100%',
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyButtonDay: {
    backgroundColor: '#fde68a',
  },
  buyButtonNight: {
    backgroundColor: '#1e3a8a',
  },
  buyButtonText: {
    fontSize: 11,
    fontWeight: '700',
  },
  buyTextDay: {
    color: '#92400e',
  },
  buyTextNight: {
    color: '#bfdbfe',
  },
  ownedSection: {
    marginTop: 24,
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
  ownedCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  ownedCardDay: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  ownedCardNight: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  ownedIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  ownedText: {
    fontSize: 12,
  },
  ownedRow: {
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  ownedName: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  ownedMeta: {
    fontSize: 10,
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
