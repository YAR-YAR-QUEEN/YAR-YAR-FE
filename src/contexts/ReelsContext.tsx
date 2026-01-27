import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { UploadAnalyzeResponseDto } from '../types/dto';

interface ReelsContextType {
  analysisResult: UploadAnalyzeResponseDto | null;
  setAnalysisResult: (result: UploadAnalyzeResponseDto | null) => void;
}

const ReelsContext = createContext<ReelsContextType | undefined>(undefined);

export function ReelsProvider({ children }: { children: ReactNode }) {
  const [analysisResult, setAnalysisResult] = useState<UploadAnalyzeResponseDto | null>(null);

  return (
    <ReelsContext.Provider value={{ analysisResult, setAnalysisResult }}>
      {children}
    </ReelsContext.Provider>
  );
}

export function useReels() {
  const context = useContext(ReelsContext);
  if (context === undefined) {
    throw new Error('useReels must be used within a ReelsProvider');
  }
  return context;
}
