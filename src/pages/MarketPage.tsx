import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDayNight } from '../contexts/DayNightContext';

const ITEMS = [
  { name: '5G 봉수대', price: '500냥', icon: '📡', desc: '인지도 +5' },
  { name: '가비(Coffee)', price: '100냥', icon: '☕', desc: '도파민 +2' },
  { name: '서양식 선글라스', price: '300냥', icon: '🕶️', desc: '화제성 +3' },
];

export function MarketPage() {
  const { isNight } = useDayNight();

  return (
    <View style={[styles.container, isNight ? styles.containerNight : styles.containerDay]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Feather name="shopping-bag" size={22} color={isNight ? '#fbbf24' : '#d97706'} />
          <Text style={[styles.headerTitle, isNight ? styles.headerTitleNight : styles.headerTitleDay]}>
            개화파 상점
          </Text>
        </View>

        <View style={styles.grid}>
          {ITEMS.map((item) => (
            <View
              key={item.name}
              style={[styles.itemCard, isNight ? styles.itemCardNight : styles.itemCardDay]}
            >
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <Text style={[styles.itemName, isNight ? styles.textMainNight : styles.textMainDay]}>
                {item.name}
              </Text>
              <Text style={[styles.itemDesc, isNight ? styles.textMutedNight : styles.textMutedDay]}>
                {item.desc}
              </Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.buyButton, isNight ? styles.buyButtonNight : styles.buyButtonDay]}
              >
                <Text style={[styles.buyButtonText, isNight ? styles.buyTextNight : styles.buyTextDay]}>
                  구매하기
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
            <Text style={styles.ownedIcon}>📦</Text>
            <Text style={[styles.ownedText, isNight ? styles.textMutedNight : styles.textMutedDay]}>
              아직 구매한 아이템이 없습니다
            </Text>
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
