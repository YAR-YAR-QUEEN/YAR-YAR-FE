export type JoseonTime = {
  name: string;
  emoji: string;
  period: string;
  description: string;
  isNight: boolean;
};

export const getJoseonTime = (hour: number): JoseonTime => {
  // 십이시
  // 자시 (쥐): 23:00 - 01:00
  // 축시 (소): 01:00 - 03:00
  // 인시 (호랑이): 03:00 - 05:00
  // 묘시 (토끼): 05:00 - 07:00
  // 진시 (용): 07:00 - 09:00
  // 사시 (뱀): 09:00 - 11:00
  // 오시 (말): 11:00 - 13:00
  // 미시 (양): 13:00 - 15:00
  // 신시 (원숭이): 15:00 - 17:00
  // 유시 (닭): 17:00 - 19:00
  // 술시 (개): 19:00 - 21:00
  // 해시 (돼지): 21:00 - 23:00

  if (hour >= 23 || hour < 1)
    return {
        name: '자시',
        emoji: '🐭',
        period: '23:00 ~ 01:00',
        description: '쥐의 시간',
        isNight: true
    };
  if (hour >= 1 && hour < 3)
    return {
        name: '축시',
        emoji: '🐮',
        period: '01:00 ~ 03:00',
        description: '소의 시간',
        isNight: true
    };
  if (hour >= 3 && hour < 5)
    return {
        name: '인시',
        emoji: '🐯',
        period: '03:00 ~ 05:00',
        description: '호랑이의 시간',
        isNight: true
    };
  if (hour >= 5 && hour < 7)
    return {
        name: '묘시',
        emoji: '🐰',
        period: '05:00 ~ 07:00',
        description: '토끼의 시간',
        isNight: false
    };
  if (hour >= 7 && hour < 9)
    return {
        name: '진시',
        emoji: '🐉',
        period: '07:00 ~ 09:00',
        description: '용의 시간',
        isNight: false
    };
  if (hour >= 9 && hour < 11)
    return {
        name: '사시',
        emoji: '🐍',
        period: '09:00 ~ 11:00',
        description: '뱀의 시간',
        isNight: false
    };
  if (hour >= 11 && hour < 13)
    return {
        name: '오시',
        emoji: '🐴',
        period: '11:00 ~ 13:00',
        description: '말의 시간',
        isNight: false
    };
  if (hour >= 13 && hour < 15)
    return {
        name: '미시',
        emoji: '🐑',
        period: '13:00 ~ 15:00',
        description: '양의 시간',
        isNight: false
    };
  if (hour >= 15 && hour < 17)
    return {
        name: '신시',
        emoji: '🐵',
        period: '15:00 ~ 17:00',
        description: '원숭이의 시간',
        isNight: false
    };
  if (hour >= 17 && hour < 19)
    return {
        name: '유시',
        emoji: '🐔',
        period: '17:00 ~ 19:00',
        description: '닭의 시간',
        isNight: false
    };
  if (hour >= 19 && hour < 21)
    return {
        name: '술시',
        emoji: '🐶',
        period: '19:00 ~ 21:00',
        description: '개의 시간',
        isNight: true
    };
  if (hour >= 21 && hour < 23)
    return {
        name: '해시',
        emoji: '🐷',
        period: '21:00 ~ 23:00',
        description: '돼지의 시간',
        isNight: true
    };

  return {
    name: '자시',
    emoji: '🐭',
    period: '23:00 ~ 01:00',
    description: '쥐의 시간',
    isNight: true
  };
};

export const isDayTime = (hour: number): boolean => {
  return hour >= 6 && hour < 18;
};