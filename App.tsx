import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DayNightProvider, useDayNight } from './src/contexts/DayNightContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { GameStateProvider } from './src/contexts/GameStateContext';
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
import { InventoryPage } from './src/pages/InventoryPage';
import { FilmingPage } from './src/pages/FilmingPage';
import { AnalysisPage } from './src/pages/AnalysisPage';
import { ReactionPage } from './src/pages/ReactionPage';
import { http } from "./src/services/http";

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
  | '/street'
  | '/inventory'
  | '/analysis';

function AppContent() {
  // 낮/밤 상태
  const { isNight } = useDayNight();
  
  // 현재 라우트
  const [currentRoute, setCurrentRoute] = useState<RouteType>('/login');

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
        {showHeader && <TimeHeader />}

        {/* 메인 컨텐츠 영역 */}
        <View style={styles.mainContent}>
          {currentRoute === '/' && (
            <HomePage onNavigate={handleNavigate} 
            />
          )}
          {currentRoute === '/faction' && <FactionPage />}
          {currentRoute === '/market' && <MarketPage />}
          {currentRoute === '/profile' && <ProfilePage />}
          {currentRoute === '/petition' && (
            <PetitionPage onNavigate={handleNavigate} />
          )}
          {currentRoute === '/reaction' && (
            <ReactionPage onNavigate={handleNavigate} />
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
          {currentRoute === '/inventory' && (
            <InventoryPage onNavigate={handleNavigate}/>
          )}
          {currentRoute === '/filming' && (
            <FilmingPage onNavigate={handleNavigate} />
          )}
          {currentRoute === '/analysis' && (
            <AnalysisPage onNavigate={handleNavigate} />
          )}
        </View>

        {/* 하단 네비게이션 바 */}
        {showNav && (
          <BottomNav
            currentRoute={currentRoute as '/' | '/faction' | '/market' | '/profile'}
            onNavigate={handleNavigate}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <GameStateProvider>
          <DayNightProvider>
            <AppContent />
          </DayNightProvider>
        </GameStateProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
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
