import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TimeHeader } from './src/components/TimeHeader';
import { BottomNav } from './src/components/BottomNav';
import { HomePage } from './src/pages/HomePage';
import { FactionPage } from './src/pages/FactionPage';
import { MarketPage } from './src/pages/MarketPage';
import { ProfilePage } from './src/pages/ProfilePage';
import { LoginPage } from './src/pages/LoginPage';
import { SignupPage } from './src/pages/SignupPage';
import { StreetPage } from './src/pages/StreetPage';
import { PetitionPage } from './src/pages/PetitionPage';

// Route 타입 정의
type RouteType =
  | '/'
  | '/faction'
  | '/market'
  | '/profile'
  | '/login'
  | '/signup'
  | '/reaction'
  | '/filming'
  | '/petition'
  | '/street';

export default function App() {
  // 낮/밤 상태
  const [isNight, setIsNight] = useState(false);
  
  // 현재 라우트
  const [currentRoute, setCurrentRoute] = useState<RouteType>('/login');

  // 낮/밤 토글 함수
  const toggleTime = () => {
    setIsNight((prev) => !prev);
  };

  // 네비게이션 핸들러
  const handleNavigate = (route: string) => {
    setCurrentRoute(route as RouteType);
  };

  // 헤더를 숨길 라우트들
  const hideHeaderRoutes: RouteType[] = ['/login', '/signup', '/reaction', '/filming'];
  const showHeader = !hideHeaderRoutes.includes(currentRoute);

  // 하단 네비게이션을 숨길 라우트들
  const hideNavRoutes: RouteType[] = ['/login', '/signup'];
  const showNav = !hideNavRoutes.includes(currentRoute);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.safeArea,
          isNight ? styles.safeAreaNight : styles.safeAreaDay,
        ]}
        edges={['top']}
      >
        <StatusBar
          barStyle={isNight ? 'light-content' : 'dark-content'}
          backgroundColor={isNight ? '#020617' : '#fffbeb'}
        />
        
        <View style={styles.appContainer}>
          {/* 상단 헤더 */}
          {showHeader && <TimeHeader isNight={isNight} />}

          {/* 메인 컨텐츠 영역 */}
          <View style={styles.mainContent}>
            {currentRoute === '/' && (
              <HomePage 
                isNight={isNight} 
                onToggleTime={toggleTime}
                onNavigate={handleNavigate} 
              />
            )}
            {currentRoute === '/faction' && (
              <FactionPage isNight={isNight} />
            )}
            {currentRoute === '/market' && (
              <MarketPage isNight={isNight} />
            )}
            {currentRoute === '/profile' && (
              <ProfilePage isNight={isNight} />
            )}
            {currentRoute === '/petition' && (
              <PetitionPage isNight={isNight} onNavigate={handleNavigate} />
            )}
            {currentRoute === '/reaction' && (
              <PlaceholderPage title="백성 반응 페이지" isNight={isNight} />
            )}
            {currentRoute === '/login' && (
              <LoginPage onNavigate={handleNavigate} />
            )}
            {currentRoute === '/signup' && (
              <SignupPage onNavigate={handleNavigate} />
            )}
            {currentRoute === '/street' && (
              <StreetPage onNavigate={handleNavigate}/>
            )}
          </View>

          {/* 하단 네비게이션 바 */}
          {showNav && (
            <BottomNav
              isNight={isNight}
              currentRoute={currentRoute as '/' | '/faction' | '/market' | '/profile'}
              onNavigate={handleNavigate}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// 임시 플레이스홀더 페이지 컴포넌트
function PlaceholderPage({ title, isNight }: { title: string; isNight: boolean }) {
  return (
    <View
      style={[
        styles.placeholderPage,
        isNight ? styles.placeholderNight : styles.placeholderDay,
      ]}
    >
      <Text
        style={[
          styles.placeholderText,
          isNight ? styles.textNight : styles.textDay,
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  safeAreaDay: {
    backgroundColor: '#fffbeb',
  },
  safeAreaNight: {
    backgroundColor: '#020617',
  },
  appContainer: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  placeholderPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderDay: {
    backgroundColor: '#fffbeb',
  },
  placeholderNight: {
    backgroundColor: '#020617',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '600',
  },
  textDay: {
    color: '#78350f',
  },
  textNight: {
    color: '#93c5fd',
  },
});
