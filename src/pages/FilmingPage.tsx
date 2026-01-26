import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Feather from 'react-native-vector-icons/Feather';

interface FilmingPageProps {
  onNavigate?: (route: string) => void;
}

export function FilmingPage({ onNavigate }: FilmingPageProps) {
  const cameraRef = useRef<Camera>(null);
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>('back');
  const device = useCameraDevice(cameraPosition);
  const insets = useSafeAreaInsets();

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const init = async () => {
      const camStatus = await Camera.getCameraPermissionStatus();
      const micStatus = await Camera.getMicrophonePermissionStatus();

      if (camStatus !== 'granted' || micStatus !== 'granted') {
        const cam = await Camera.requestCameraPermission();
        const mic = await Camera.requestMicrophonePermission();
        setHasCameraPermission(cam === 'granted');
        setHasMicPermission(mic === 'granted');
        return;
      }

      setHasCameraPermission(true);
      setHasMicPermission(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 15) {
            stopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRecording]);

  const requestPermissions = async () => {
    const cam = await Camera.requestCameraPermission();
    const mic = await Camera.requestMicrophonePermission();
    setHasCameraPermission(cam === 'granted');
    setHasMicPermission(mic === 'granted');
  };

  const startRecording = async () => {
    if (!cameraRef.current) return;
    setRecordingTime(0);
    setIsComplete(false);
    setIsRecording(true);
    cameraRef.current.startRecording({
      onRecordingFinished: () => {
        setIsRecording(false);
        setIsComplete(true);
      },
      onRecordingError: () => {
        setIsRecording(false);
      },
    });
  };

  const stopRecording = async () => {
    if (!cameraRef.current) return;
    await cameraRef.current.stopRecording();
  };

  const resetRecording = () => {
    setRecordingTime(0);
    setIsComplete(false);
    setIsRecording(false);
  };

  if (!device) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>카메라를 불러오는 중...</Text>
      </View>
    );
  }

  if (!hasCameraPermission || !hasMicPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>카메라/마이크 권한이 필요합니다.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermissions}>
          <Text style={styles.buttonText}>권한 요청</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => Linking.openSettings()}>
          <Text style={styles.linkText}>설정 열기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        {!isComplete && (
            <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive
            video
            audio
            />
        )}

      <View style={[styles.topBar, { top: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.topBackButton}
          onPress={() => onNavigate?.('/street')}
          activeOpacity={0.8}
        >
          <Feather name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>
        {isRecording && (
          <View style={styles.recBadge}>
            <View style={styles.recDot} />
            <Text style={styles.recText}>REC {recordingTime}s</Text>
          </View>
        )}
        <View style={styles.missionBox}>
          <Text style={styles.missionTitle}>오늘의 미션</Text>
          <Text style={styles.missionDesc}>도파민 부족 해결</Text>
        </View>
      </View>

      <View style={styles.centerInfo}>
        {!isComplete ? (
          <>
            <Text style={styles.bigEmoji}>📹</Text>
            <Text style={styles.headline}>{isRecording ? '촬영 중...' : '준비되셨나요?'}</Text>
            <Text style={styles.subline}>
              {isRecording ? '멈춤 버튼을 눌러 촬영 종료' : '최대 15초까지 촬영 가능'}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.bigEmoji}>✨</Text>
            <Text style={styles.headline}>촬영 완료!</Text>
            <Text style={styles.subline}>촬영 시간: {recordingTime}초</Text>
          </>
        )}
      </View>

      <View style={[styles.controls, { bottom: insets.bottom + 12 }]}>
        {!isComplete ? (
          <View style={styles.controlsRow}>
            <View style={styles.controlsSpacer} />
            <TouchableOpacity
              style={[styles.recordButton, isRecording && styles.recordStop]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <Feather name="square" size={26} color="#fff" />
              ) : (
                <Feather name="camera" size={26} color="#fff" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.smallButton, isRecording && styles.disabled]}
              disabled={isRecording}
              onPress={() =>
                setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'))
              }
            >
              <Feather name="refresh-ccw" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.completeRow}>
            <TouchableOpacity style={styles.secondary} onPress={resetRecording}>
              <Text style={styles.secondaryText}>다시 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primary} onPress={() => onNavigate?.('/analysis')}>
              <Text style={styles.primaryText}>분석 보기</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  text: {
    color: '#e2e8f0',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#2563eb',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#94a3b8',
  },
  topBar: {
    position: 'absolute',
    top: 24,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBackButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  recDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 6,
  },
  recText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  missionBox: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  missionTitle: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  missionDesc: {
    color: '#cbd5f5',
    fontSize: 10,
  },
  centerInfo: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bigEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  headline: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  subline: {
    color: '#cbd5f5',
    fontSize: 12,
  },
  controls: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  controlsSpacer: {
    width: 44,
    height: 44,
  },
  smallButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordStop: {
    backgroundColor: '#dc2626',
  },
  completeRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  secondary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  secondaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  primary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
});
