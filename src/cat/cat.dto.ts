import { User } from '../types/user';
import { Photo } from '../types/cat';

export interface CatDTO {
  user: User;
  name: string;
  photos: Photo[];
  comments: Comment[];
  lonely: boolean;
  popularity: number;
  created: Date;
}

// export interface CatDTO {
//   name: string;
// }

export type CreateCatDTO = Partial<CatDTO>;
export type UpdateCatDTO = Partial<CatDTO>;
