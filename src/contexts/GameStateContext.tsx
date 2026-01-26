import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import type { GameStateDto } from '../types/dto';
import { fetchGameState } from '../services/gameService';
import { useAuth } from './AuthContext';

interface GameStateContextType {
  gameState: GameStateDto | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [gameState, setGameState] = useState<GameStateDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    if (!user?.id) {
      setGameState(null);
      return;
    }

    setLoading(true);
    setError(null);
    fetchGameState(user.id)
      .then((data) => {
        setGameState(data);
      })
      .catch(() => {
        setError('Failed to load game state.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <GameStateContext.Provider value={{ gameState, loading, error, refresh }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}
