import { http } from './http';
import type { FactionResultDto } from '../types/dto';

export const resolveFaction = (params: {
  userId: number;
  dayCount: number;
  manipulationUsed: 0 | 1;
}) => {
  return http.post<FactionResultDto>(`/users/${params.userId}/faction`, null, {
    params: {
      dayCount: params.dayCount,
      manipulationUsed: params.manipulationUsed,
    },
  });
};
