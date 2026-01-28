import { http } from './http';
import type { UploadAnalyzeResponseDto } from '../types/dto';

export const uploadAndAnalyze = async (params: {
  fileUri: string;
  userId: number;
  petitionId?: number;
}): Promise<UploadAnalyzeResponseDto> => {
  const formData = new FormData();
  const uri = params.fileUri.startsWith('file://')
    ? params.fileUri
    : `file://${params.fileUri}`;

  formData.append('file', {
    uri,
    name: 'reels.mp4',
    type: 'video/mp4',
  } as any);
  formData.append('userId', String(params.userId));
  if (params.petitionId !== undefined) {
    formData.append('petitionId', String(params.petitionId));
  }

  const response = await http.post<UploadAnalyzeResponseDto>(
    '/upload-and-analyze',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    }
  );

  return response.data;
};

export const requestThumbnail = async (reelsId: number): Promise<void> => {
  await http.post(`/reels/${reelsId}/thumbnail`);
};
