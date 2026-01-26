import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface InventoryPageProps {
  onNavigate?: (route: string) => void;
}

interface OwnedItem {
  id: number;
  name: string;
  icon: string;
  effect: string;
  quantity: number;
}

const OWNED_ITEMS: OwnedItem[] = [
  { id: 1, name: '가비(Coffee)', icon: '☕', effect: '도파민 +10', quantity: 3 },
  { id: 2, name: '서양식 선글라스', icon: '🕶️', effect: '화제성 +15', quantity: 1 },
  { id: 3, name: '축음기', icon: '📻', effect: '음악 효과', quantity: 2 },
];

export function InventoryPage({ onNavigate }: InventoryPageProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const items = OWNED_ITEMS;

  return (
    <View style={[styles.container, styles.containerDay]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onNavigate?.('/street')}
            style={[styles.backButton, styles.backButtonDay]}
          >
            <Feather name="arrow-left" size={20} color="#78350f" />
          </TouchableOpacity>
          <Text style={[styles.title, styles.titleDay]}>
            📦 보유 아이템
          </Text>
        </View>

        <Text style={[styles.subtitle, styles.subtitleDay]}>
          숏폼 촬영에 사용할 아이템을 선택하세요
        </Text>

        <View style={styles.grid}>
          {items.map((item) => {
            const isSelected = selectedItem === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                onPress={() => setSelectedItem(item.id)}
                style={[
                  styles.itemCard,
                  isSelected ? styles.itemCardSelectedDay : styles.itemCardDay,
                ]}
              >
                <Text style={styles.itemIcon}>{item.icon}</Text>
                <Text style={[styles.itemName, styles.textMainDay]}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.itemEffect,
                    isSelected
                      ? styles.itemEffectSelected
                      : styles.textMutedDay,
                  ]}
                >
                  {item.effect}
                </Text>
                <View style={[styles.quantityBadge, styles.quantityBadgeDay]}>
                  <Text style={[styles.quantityText, styles.textMutedDay]}>
                    보유 {item.quantity}개
                  </Text>
                </View>
                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <Feather name="sparkles" size={14} color="#3b82f6" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {items.length === 0 && (
          <View style={[styles.emptyCard, styles.emptyCardDay]}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={[styles.emptyText, styles.subtitleDay]}>
              아직 보유한 아이템이 없습니다
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onNavigate?.('/market')}
              style={[styles.emptyButton, styles.emptyButtonDay]}
            >
              <Text style={styles.emptyButtonText}>상점 가기</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onNavigate?.('/market')}
          style={[styles.secondaryButton, styles.secondaryButtonDay]}
        >
          <Text style={[styles.secondaryButtonText, styles.secondaryTextDay]}>
            더 구매하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onNavigate?.('/filming')}
          disabled={selectedItem === null}
          style={[
            styles.primaryButton,
            selectedItem ? styles.primaryButtonDay : styles.primaryButtonDisabled,
          ]}
        >
          <Text style={styles.primaryButtonText}>
            {selectedItem ? '촬영하러 가기' : '아이템 선택'}
          </Text>
        </TouchableOpacity>
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
  content: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonDay: {
    backgroundColor: 'rgba(120, 53, 15, 0.08)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  titleDay: {
    color: '#78350f',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 16,
  },
  subtitleDay: {
    color: 'rgba(120, 53, 15, 0.7)',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 12,
  },
  itemCardDay: {
    backgroundColor: '#ffffff',
    borderColor: '#fde68a',
  },
  itemCardSelectedDay: {
    backgroundColor: '#dbeafe',
    borderColor: '#60a5fa',
  },
  itemIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  itemEffect: {
    fontSize: 10,
    marginBottom: 8,
  },
  itemEffectSelected: {
    color: '#2563eb',
  },
  quantityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  quantityBadgeDay: {
    backgroundColor: '#fef3c7',
  },
  quantityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  selectedBadge: {
    marginTop: 8,
  },
  emptyCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyCardDay: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  emptyButtonDay: {
    backgroundColor: '#f59e0b',
  },
  emptyButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 90,
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  secondaryButtonDay: {
    backgroundColor: '#ffffff',
    borderColor: '#fde68a',
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  secondaryTextDay: {
    color: '#78350f',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  primaryButtonDay: {
    backgroundColor: '#f59e0b',
  },
  primaryButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  textMainDay: {
    color: '#78350f',
  },
  textMutedDay: {
    color: 'rgba(120, 53, 15, 0.6)',
  },
});
