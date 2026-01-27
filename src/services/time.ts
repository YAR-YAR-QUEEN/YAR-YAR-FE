import { http } from './http';
import type { TimeResponseDto } from '../types/dto';

export const fetchServerTime = () => {
  return http.get<TimeResponseDto>('/time');
};

export const setDayPhase = () => {
  return http.post('/day');
};

export const setNightPhase = () => {
  return http.post('/night');
};
