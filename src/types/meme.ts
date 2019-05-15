import { Document } from 'mongoose';
import { User } from './user';

export interface Photo {
  photo: string;
}

export interface Meme extends Document {
  user: User;
  name: string;
  photos: Photo[];
  popularity: number;
  created: Date;
}
