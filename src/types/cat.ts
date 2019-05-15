import { Document } from 'mongoose';
import { User } from './user';

export interface Photo {
  photo: string;
}

export interface Cat extends Document {
  user: User;
  name: string;
  photos: Photo[];
  lonely: boolean;
  popularity: number;
  created: Date;
}
