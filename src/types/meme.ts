import { Document } from 'mongoose';
import { User } from './user';
import { Comment } from './comment';

interface Photo {
  photo: string;
}

export interface Meme extends Document {
  user: User;
  name: string;
  photos: Photo[];
  comments: Comment[];
  popularity: number;
  created: Date;
}
