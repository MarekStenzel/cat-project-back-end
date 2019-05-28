import { Document } from 'mongoose';
import { User } from './user';
import { Photo } from './photo';

export interface Cat extends Document {
  user: User;
  name: string;
  photos: Photo[];
  lonely: boolean;
  popularity: number;
  created: Date;
}
