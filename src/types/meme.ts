import { Document } from 'mongoose';
import { User } from './user';

export interface Meme extends Document {
  user: User;
  name: string;
  popularity: number;
  created: Date;
}
