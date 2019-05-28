import { User } from '../types/user';

export interface MemeDTO {
  user: User;
  name: string;
  popularity: number;
  created: Date;
}

export type CreateMemeDTO = Partial<MemeDTO>;
export type UpdateMemeDTO = Partial<MemeDTO>;
