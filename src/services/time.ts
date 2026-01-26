import { http } from './http';
import type { TimeResponseDto } from '../types/dto';

export const fetchServerTime = () => {
  return http.get<TimeResponseDto>('/time');
};
