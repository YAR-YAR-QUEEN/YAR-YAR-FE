import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { PetitionListItemDto } from '../types/dto';

interface PetitionContextType {
  selectedPetition: PetitionListItemDto | null;
  setSelectedPetition: (petition: PetitionListItemDto | null) => void;
}

const PetitionContext = createContext<PetitionContextType | undefined>(undefined);

export function PetitionProvider({ children }: { children: ReactNode }) {
  const [selectedPetition, setSelectedPetition] = useState<PetitionListItemDto | null>(null);

  return (
    <PetitionContext.Provider value={{ selectedPetition, setSelectedPetition }}>
      {children}
    </PetitionContext.Provider>
  );
}

export function usePetition() {
  const context = useContext(PetitionContext);
  if (context === undefined) {
    throw new Error('usePetition must be used within a PetitionProvider');
  }
  return context;
}
