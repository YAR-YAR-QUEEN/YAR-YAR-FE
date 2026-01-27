import { http } from './http';
import type {
  PetitionDetailDto,
  PetitionDetailResponseDto,
  PetitionListItemDto,
  PetitionListItemResponseDto,
  PetitionDto,
} from '../types/dto';

export const fetchPetitionDetail = async (
  petitionId: number
): Promise<PetitionDetailDto> => {
  const response = await http.get<PetitionDetailResponseDto>(
    `/petitions/${petitionId}`
  );
  const data = response.data;

  return {
    id: data.id,
    description: data.description,
    type: data.type,
    dopamine: data.dopamin,
    buzz: data.buzz,
    awareness: data.awareness,
    createdAt: data.createdAt,
  };
};

export const fetchPetitions = async (
  dayCount: number
): Promise<PetitionListItemDto[]> => {
  const response = await http.get<PetitionListItemResponseDto[]>('/petitions', {
    params: { dayCount },
  });

  return response.data.map((item) => ({
    id: item.id,
    description: item.description,
    type: item.type,
    dopamine: item.dopamin,
    buzz: item.buzz,
    awareness: item.awareness,
    createdAt: item.createdAt,
  }));
};

export const createPetitionFromReels = async (params: {
  reelsId: number;
  dayCount: number;
}): Promise<PetitionDto> => {
  const response = await http.post<PetitionDto>(
    `/reels/${params.reelsId}/petitions`,
    null,
    {
      params: { dayCount: params.dayCount },
    }
  );
  return response.data;
};
