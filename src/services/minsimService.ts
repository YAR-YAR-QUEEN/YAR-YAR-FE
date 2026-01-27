import { http } from './http';
import type {
  MinsimApplyRequestDto,
  MinsimApplyResponseDto,
  MinsimLogDto,
} from '../types/dto';

export const applyMinsim = (userId: number, payload: MinsimApplyRequestDto) => {
  return http.post<MinsimApplyResponseDto>(`/users/${userId}/minsim`, payload);
};

export const fetchMinsimLogs = (userId: number) => {
  return http.get<MinsimLogDto[]>(`/users/${userId}/minsim`);
};
