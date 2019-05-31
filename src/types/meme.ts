import { Document } from 'mongoose';
import { User } from './user';
import { Photo } from './photo';

export interface Meme extends Document {
  user: User;
  name: string;
  photos: Photo[];
  popularity: number;
  created: Date;
}
