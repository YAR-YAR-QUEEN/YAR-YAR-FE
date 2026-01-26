import React, { useState, createContext, useContext, ReactNode } from 'react';
import { JoseonTime } from '../utils/timeUtils';

interface DayNightContextType {
    isNight: boolean;
    currentTime: JoseonTime;
    toggleTime: () => void;
}

const DayNightContext = createContext<DayNightContextType | undefined> (
    undefined
);

export function DayNightProvider({ children }: { children: ReactNode }) {
    const [isNight, setIsNight] = useState(false);

    const currentTime: JoseonTime = isNight
    ? {
        name: '해시',
        emoji: '🐷',
        period: '21:00 ~ 23:00',
        description: '돼지의 시간',
        isNight: true,
    }
    : {
        name: '오시',
        emoji: '🐴',
        period: '11:00 ~ 13:00',
        description: '말의 시간',
        isNight: false,
    };

    const toggleTime = () => {
        setIsNight((prev) => !prev);
    };

    return (
        <DayNightContext.Provider
            value={{
                isNight,
                currentTime,
                toggleTime,
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