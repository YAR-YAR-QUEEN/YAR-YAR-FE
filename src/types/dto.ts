import type {
  Phase,
  PetitionType,
  FactionSide,
  ItemType,
  EffectType,
  MinsimReason,
  EventType,
} from '../constants';

export interface UserDto {
	id: number;
	nickname: string;
	email: string;
	createdAt: string;
}

export interface SignupRequestDto {
	email: string;
	password: string;
	nickname: string;
}

export interface LoginRequestDto {
	email: string;
	password: string;
}

export interface LoginResponseDto extends UserDto {
	accessToken: string;
}

export interface TimeResponseDto {
	epochSeconds: number;
	timeScale: number;
}

export interface GameStateDto {
	dayCount: number;
	phase: Phase;
	
	minsim: number;
	authority: number;
	daewongunPower: number;
	winRate: number;
	awareness: number;
	buzz: number;
	dopamine: number;
	reelsScore: number;
}

export interface GameStateResponseDto {
	dayCount: number;
	phase: Phase;
	
	minsim: number;
	authority: number;
	daewongunPower: number;
	winRate: number;
	awareness?: number;
	buzz: number;
	dopamine: number;
	reelsScore: number;
}

export interface PetitionDto {
	dayCount: number;
	type: PetitionType;
	description: string;
	
	weights: {
		dopamine: number;
		buzz: number;
		awareness: number;
  };
	
	minsimEffect: {
		positive: number;
		negative: number;
  };
}

export interface PetitionDetailDto {
	id: number;
	description: string;
	type: PetitionType;
	dopamine: number;
	buzz: number;
	awareness: number;
	createdAt: string;
}

export interface PetitionDetailResponseDto {
	id: number;
	description: string;
	type: PetitionType;
	dopamin: number;
	buzz: number;
	awareness: number;
	createdAt: string;
}

export interface PetitionListItemDto {
	id: number;
	description: string;
	type: PetitionType;
	dopamine: number;
	buzz: number;
	awareness: number;
	createdAt: string;
}

export interface PetitionListItemResponseDto {
	id: number;
	description: string;
	type: PetitionType;
	dopamin: number;
	buzz: number;
	awareness: number;
	createdAt: string;
}

export interface ReelsAnalysisScoresDto {
	dopamine_score: number;
	virality_score: number;
	challenge_difficulty: number;
}

export interface ReelsAnalysisDto {
	scores: ReelsAnalysisScoresDto;
	comment: string;
	breakdown: {
		dopamine: Record<string, string>;
		virality: Record<string, string>;
		difficulty: Record<string, string>;
	};
}

export interface UploadAnalyzeResponseDto {
	videoUrl: string;
	reelsId: number;
	analysis: ReelsAnalysisDto;
}

export interface ReelsUploadRequestDto {
	videoUrl: string;
	durationSec: number;
	
	dopamine: number;
	buzz: number;
	awareness: number;
}

export interface ReelsResultDto {
	reelsScore: number;
	earnedMinsim: number;
	rngBonus: number;
}

export interface ReelsDto {
	id: number;
	createdAt: string;
	
	dopamine: number;
	buzz: number;
	awareness: number;
	
	reelsScore: number;
}

export interface ReelsListItemDto {
	id: number;
	videoUrl: string;
	thumbnailUrl?: string | null;
	dopamine: number;
	buzz: number;
	awareness: number;
	reelsScore: number;
	petitionId?: number;
	createdAt: string;
}

export interface ReelsListItemResponseDto {
	id: number;
	videoUrl: string;
	thumbnailUrl?: string | null;
	dopamin: number;
	buzz: number;
	awareness: number;
	reelsScore: number;
	petitionId?: number;
	createAt: string;
}

export interface ReelsDetailDto {
	id: number;
	videoUrl: string;
	thumbnailUrl?: string | null;
	dopamine: number;
	buzz: number;
	awareness: number;
	reelsScore: number;
	petitionId?: number;
	createdAt: string;
}

export interface ReelsDetailResponseDto {
	id: number;
	videoUrl: string;
	thumbnailUrl?: string | null;
	dopamin: number;
	buzz: number;
	awareness: number;
	reelsScore: number;
	petitionId?: number;
	createAt: string;
}

export interface MinsimLogDto {
	id: number;
	amount: number;
	reason: MinsimReason;
	
	refTable?: string;
	refId?: number;
	
	createdAt: string;
}

export interface MinsimApplyRequestDto {
	amount: number;
	reason: MinsimReason;
	refTable?: string;
	refId?: number;
}

export interface MinsimApplyResponseDto {
	appliedAmount: number;
	createdAt: string;
}

export interface FactionResultDto {
	dayCount: number;
	
	openingRate: {
		open: number;
		close: number;
    };
	
	finalRate: {
		open: number;
		close: number;
    };
	
	manipulationUsed: number;
	result: FactionSide;
	authorityDelta: number;
}

export interface ItemDto {
	id: number;
	name: string;
	type: ItemType;
	priceMinsim: number;
	
	effect: {
		type: EffectType;
		value: number;
		duration: number;
  };
}

export interface UserItemDto {
	itemId: number;
	name: string;
	type: ItemType;
	
	remainCount: number;
	expireAt?: string;
}

export interface EventDto {
	type: EventType;
	description: string;
	createdAt: string;
}

export interface MainScreenDTO {
	user: UserDto;
	gameState: GameStateDto;
	petition: PetitionDto;
	
	inventory: UserItemDto[];
	activeEvents: EventDto[];
}
