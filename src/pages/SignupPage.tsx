import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface SignupPageProps {
  onNavigate?: (route: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onNavigate?.('/login')}
        style={styles.backButton}
      >
        <Feather name="arrow-left" size={20} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>입궁 수속</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>성함</Text>
          <TextInput style={styles.input} placeholderTextColor="#475569" />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>아이디</Text>
          <TextInput style={styles.input} placeholderTextColor="#475569" />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput style={styles.input} placeholderTextColor="#475569" secureTextEntry />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.submitButton}
          onPress={() => onNavigate?.('/')}
        >
          <Text style={styles.submitButtonText}>입궁하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
  },
  backButton: {
    marginTop: 24,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  card: {
    marginTop: 32,
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    color: '#94a3b8',
    fontSize: 11,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  submitButton: {
    marginTop: 24,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#dc2626',
    shadowColor: '#7f1d1d',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
