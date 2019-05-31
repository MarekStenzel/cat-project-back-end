import { User } from '../types/user';
import { Photo } from '../types/photo';

export interface MemeDTO {
  user: User;
  name: string;
  photos: Photo[];
  popularity: number;
  created: Date;
}

export type CreateMemeDTO = Partial<MemeDTO>;
export type UpdateMemeDTO = Partial<MemeDTO>;
