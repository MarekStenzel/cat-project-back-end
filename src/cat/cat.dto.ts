import { User } from '../types/user';
import { Photo } from 'src/types/cat';
import { Comment } from 'src/types/comment';

export interface CatDTO {
  user: User;
  name: string;
  photos: Photo[];
  comments: Comment[];
  lonely: boolean;
  popularity: number;
  created: Date;
}
