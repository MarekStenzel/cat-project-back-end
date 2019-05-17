import { Document } from 'mongoose';
import { User } from './user';

export interface Comment extends Document {
  user: User;
  catId: string;
  memeId: string;
  meme: boolean;
  text: string;
  created: Date;
}
