import { User } from '../types/user';

export interface PhotoDTO {
  user: User;
  catId: string;
  memeId: string;
  meme: boolean;
  field: string;
  name: string;
  encoding: string;
  mime: string;
  destination: string;
  filename: string;
  path: string;
  size: string;
  created: Date;
}

export type CreatePhotoDTO = Partial<PhotoDTO>;
export type UpdatePhotoDTO = Partial<PhotoDTO>;
