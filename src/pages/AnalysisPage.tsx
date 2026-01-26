import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface AnalysisPageProps {
  onNavigate?: (route: string) => void;
}

const ANALYSIS = {
  dopamine: 8.5,
  buzz: 7.2,
  awareness: 6.8,
  totalScore: 7.5,
  comment:
    '훌륭합니다! 커피를 마시는 자연스러운 연기가 백성들의 공감을 이끌어냈습니다. 특히 마지막 윙크가 화제성을 크게 높였어요.',
  highlights: [
    '자연스러운 연기 (+1.2 도파민)',
    '트렌디한 소품 사용 (+0.8 화제성)',
    '친근한 표정 (+0.5 인지도)',
  ],
};

export function AnalysisPage({ onNavigate }: AnalysisPageProps) {
  const rating = Math.floor(ANALYSIS.totalScore / 2);
  return (
    <View style={[styles.container, styles.containerDay]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🎬</Text>
          <Text style={[styles.title, styles.titleDay]}>
            릴스 분석 완료
          </Text>
          <Text style={[styles.subtitle, styles.subtitleDay]}>
            AI가 방금 촬영한 릴스를 분석했습니다
          </Text>
        </View>

        <View style={[styles.scoreCard, styles.scoreCardDay]}>
          <Text style={styles.scoreLabel}>종합 평가</Text>
          <Text style={styles.scoreValue}>{ANALYSIS.totalScore}</Text>
          <View style={styles.starRow}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Text key={idx} style={[styles.star, idx < rating ? null : styles.starMuted]}>
                ⭐
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.metricsRow}>
          {[
            { label: '도파민', value: ANALYSIS.dopamine, icon: '🔥' },
            { label: '화제성', value: ANALYSIS.buzz, icon: '⚡' },
            { label: '인지도', value: ANALYSIS.awareness, icon: '👥' },
          ].map((metric) => (
            <View key={metric.label} style={[styles.metricCard, styles.metricCardDay]}>
              <Text style={styles.metricIcon}>{metric.icon}</Text>
              <Text style={[styles.metricLabel, styles.subtitleDay]}>
                {metric.label}
              </Text>
              <Text style={[styles.metricValue, styles.titleDay]}>
                {metric.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.commentCard, styles.commentCardDay]}>
          <View style={styles.commentHeader}>
            <Feather name="sparkles" size={14} color="#3b82f6" />
            <Text style={[styles.commentTitle, styles.titleDay]}>
              AI 분석 코멘트
            </Text>
          </View>
          <Text style={[styles.commentText, styles.bodyDay]}>
            {ANALYSIS.comment}
          </Text>
        </View>

        <View style={styles.highlightSection}>
          <View style={styles.highlightHeader}>
            <Feather name="trending-up" size={16} color="#78350f" />
            <Text style={[styles.highlightTitle, styles.titleDay]}>
              주요 하이라이트
            </Text>
          </View>
          {ANALYSIS.highlights.map((item) => (
            <View key={item} style={[styles.highlightItem, styles.highlightDay]}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={[styles.highlightText, styles.bodyDay]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.ctaButton, styles.ctaButtonDay]}
          onPress={() => onNavigate?.('/')}
        >
          <Feather name="home" size={18} color="#fff" />
          <Text style={styles.ctaText}>피드로 돌아가기</Text>
        </TouchableOpacity>
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
  content: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
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
    textAlign: 'center',
  },
  subtitleDay: {
    color: 'rgba(120, 53, 15, 0.7)',
  },
  scoreCard: {
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  scoreCardDay: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 6,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#f59e0b',
    marginBottom: 8,
  },
  starRow: {
    flexDirection: 'row',
    gap: 6,
  },
  star: {
    fontSize: 16,
  },
  starMuted: {
    opacity: 0.3,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  metricCardDay: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  commentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  commentCardDay: {
    backgroundColor: '#ffffff',
    borderColor: '#fde68a',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  commentTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  commentText: {
    fontSize: 12,
    lineHeight: 18,
  },
  highlightSection: {
    marginBottom: 20,
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  highlightTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  highlightDay: {
    backgroundColor: 'rgba(252, 211, 77, 0.2)',
  },
  checkMark: {
    color: '#22c55e',
    fontWeight: '700',
  },
  highlightText: {
    flex: 1,
    fontSize: 12,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  ctaButtonDay: {
    backgroundColor: '#f59e0b',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  bodyDay: {
    color: 'rgba(120, 53, 15, 0.8)',
  },
});
