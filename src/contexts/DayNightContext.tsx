import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { AppState } from 'react-native';
import { JoseonTime, getJoseonTime } from '../utils/timeUtils';
import { fetchServerTime, setDayPhase, setNightPhase } from '../services/time';

interface DayNightContextType {
  isNight: boolean;
  currentTime: JoseonTime;
  toggleTime: () => void;
  toggleDebugTime: () => void;
}

const DayNightContext = createContext<DayNightContextType | undefined>(undefined);

export function DayNightProvider({ children }: { children: ReactNode }) {
  const [currentTime, setCurrentTime] = useState<JoseonTime>(() => {
    return getJoseonTime(new Date().getHours());
  });
  const [baseEpochMs, setBaseEpochMs] = useState<number | null>(null);
  const [baseClientMs, setBaseClientMs] = useState<number | null>(null);
  const [timeScale, setTimeScale] = useState(1);
  const [debugOffsetHours, setDebugOffsetHours] = useState(0);

  const syncTime = useCallback(async () => {
    try {
      const response = await fetchServerTime();
      const { epochSeconds, timeScale: scale } = response.data;
      setBaseEpochMs(epochSeconds * 1000);
      setBaseClientMs(Date.now());
      setTimeScale(scale ?? 1);
    } catch (error) {
      const fallback = Date.now();
      setBaseEpochMs(fallback);
      setBaseClientMs(fallback);
      setTimeScale(1);
    }
  }, []);

  useEffect(() => {
    syncTime();
  }, [syncTime]);

  useEffect(() => {
    if (baseEpochMs === null || baseClientMs === null) {
      return;
    }

    const updateTime = () => {
      const elapsedMs = Date.now() - baseClientMs;
      const scaledEpochMs = baseEpochMs + elapsedMs * timeScale;
      const hour = (new Date(scaledEpochMs).getHours() + debugOffsetHours) % 24;
      setCurrentTime(getJoseonTime(hour));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [baseEpochMs, baseClientMs, timeScale, debugOffsetHours]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        syncTime();
      }
    });

    return () => subscription.remove();
  }, [syncTime]);

  const toggleDebugTime = useCallback(() => {
    setDebugOffsetHours((prev) => {
      const nextOffset = prev === 0 ? 12 : 0;
      const isNightNow = currentTime.isNight;
      const willBeNight = isNightNow ? nextOffset === 0 : nextOffset !== 0;

      if (willBeNight) {
        void setNightPhase();
      } else {
        void setDayPhase();
      }

      return nextOffset;
    });
  }, [currentTime.isNight]);

  return (
    <DayNightContext.Provider
      value={{
        isNight: currentTime.isNight,
        currentTime,
        toggleTime: syncTime,
        toggleDebugTime,
      }}
    >
      {children}
    </DayNightContext.Provider>
  );
}

export function useDayNight() {
  const context = useContext(DayNightContext);
  if (context === undefined) {
    throw new Error('useDayNight must be used within a DayNightProvider');
  }
  return context;
}
