import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

interface LoginPageProps {
  onNavigate?: (route: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
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
          <Text style={styles.title}>
            야르야르{'\n'}못말리는 황후님
          </Text>
          <Text style={styles.subtitle}>조선 최고의 숏폼 크리에이터가 되어보세요</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>아이디(ID)</Text>
          <TextInput
            placeholder="함자를 적으시오"
            placeholderTextColor="#475569"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>암호(PW)</Text>
          <TextInput
            placeholder="비밀 통신 코드를 입력하시오"
            placeholderTextColor="#475569"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.loginButton}
          onPress={() => onNavigate?.('/')}
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
