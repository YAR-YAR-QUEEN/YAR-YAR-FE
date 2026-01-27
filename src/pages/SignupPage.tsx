import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { signup } from '../services/auth';

interface SignupPageProps {
  onNavigate?: (route: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    if (!nickname.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      await signup({
        nickname: nickname.trim(),
        email: email.trim(),
        password,
      });
      Alert.alert('회원가입이 완료되었습니다.');
      onNavigate?.('/login');
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        '회원가입에 실패하였습니다. 입력한 정보를 다시 확인해주세요. ';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

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
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>패스워드</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>입궁하기</Text>
          )}
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
  errorText: {
    color: '#fca5a5',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
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
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
