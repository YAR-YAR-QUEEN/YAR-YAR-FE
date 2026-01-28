import { http } from './http';
import type { ReelsDetailDto, ReelsDetailResponseDto } from '../types/dto';

export const fetchReelsDetail = async (reelsId: number): Promise<ReelsDetailDto> => {
  const response = await http.get<ReelsDetailResponseDto>(`/reels/${reelsId}`);
  const data = response.data;

  return {
    id: data.id,
    videoUrl: data.videoUrl,
    thumbnailUrl: data.thumbnailUrl ?? null,
    dopamine: data.dopamin,
    buzz: data.buzz,
    awareness: data.awareness,
    reelsScore: data.reelsScore,
    petitionId: data.petitionId,
    createdAt: data.createAt,
  };
};
