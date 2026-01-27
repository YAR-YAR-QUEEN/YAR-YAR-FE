import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FactionContextType {
  usedManipulationToday: boolean;
  setUsedManipulationToday: (value: boolean) => void;
  usedFightToday: boolean;
  setUsedFightToday: (value: boolean) => void;
  resetFactionDebug: () => void;
}

const FactionContext = createContext<FactionContextType | undefined>(undefined);

export function FactionProvider({ children }: { children: ReactNode }) {
  const [usedManipulationToday, setUsedManipulationToday] = useState(false);
  const [usedFightToday, setUsedFightToday] = useState(false);

  const resetFactionDebug = () => {
    setUsedManipulationToday(false);
    setUsedFightToday(false);
  };

  return (
    <FactionContext.Provider
      value={{
        usedManipulationToday,
        setUsedManipulationToday,
        usedFightToday,
        setUsedFightToday,
        resetFactionDebug,
      }}
    >
      {children}
    </FactionContext.Provider>
  );
}

export function useFaction() {
  const context = useContext(FactionContext);
  if (context === undefined) {
    throw new Error('useFaction must be used within a FactionProvider');
  }
  return context;
}
