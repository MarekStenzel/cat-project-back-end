import { User } from '../types/user';
import { Photo } from '../types/photo';

export interface CatDTO {
  user: User;
  name: string;
  photos: Photo[];
  lonely: boolean;
  popularity: number;
  created: Date;
}

export type CreateCatDTO = Partial<CatDTO>;
export type UpdateCatDTO = Partial<CatDTO>;
