import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { login } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigate?: (route: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMessage('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const response = await login({ email: email.trim(), password });
      setUser(response.data);
      Alert.alert('로그인 완료', '환영합니다!');
      onNavigate?.('/');
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        '로그인에 실패했어요. 다시 확인해주세요.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://www.transparenttextures.com/patterns/korean-pattern.png' }}
        resizeMode="repeat"
        style={styles.pattern}
        imageStyle={styles.patternImage}
      />
      <View style={[styles.blob, styles.blobBlue]} />
      <View style={[styles.blob, styles.blobRed]} />

      <View style={styles.card}>
        <View style={styles.titleBlock}>
          <Image source={require('../assets/title.png')} style={styles.titleImage} />
          <Text style={styles.subtitle}>조선 최고의 숏폼 크리에이터가 되어보세요</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            placeholder="함자를 적으시오"
            placeholderTextColor="#475569"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            placeholder="비밀 통신 코드를 입력하시오"
            placeholderTextColor="#475569"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>로그인하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.signupButton}
          onPress={() => onNavigate?.('/signup')}
        >
          <Text style={styles.signupText}>
            아직 입궁하지 않으셨나요? <Text style={styles.signupTextLink}>입궁 수속 밟기</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  pattern: {
    ...StyleSheet.absoluteFillObject,
  },
  patternImage: {
    opacity: 0.08,
  },
  blob: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    opacity: 0.2,
  },
  blobBlue: {
    backgroundColor: '#3b82f6',
    top: '18%',
    left: '10%',
  },
  blobRed: {
    backgroundColor: '#ef4444',
    bottom: '18%',
    right: '10%',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    zIndex: 2,
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleImage: {
    width: '100%',
    maxWidth: 900,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 8,
    alignSelf: 'center',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
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
  loginButton: {
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#2563eb',
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  signupButton: {
    marginTop: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  signupText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  signupTextLink: {
    textDecorationLine: 'underline',
    color: '#e2e8f0',
  },
});
