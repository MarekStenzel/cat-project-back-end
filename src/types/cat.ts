import { Document } from 'mongoose';
import { User } from './user';
import { Comment } from './comment';

export interface Photo {
  photo: string;
}

export interface Cat extends Document {
  user: User;
  name: string;
  photos: Photo[];
  comments: Comment[];
  lonely: boolean;
  popularity: number;
  created: Date;
}
