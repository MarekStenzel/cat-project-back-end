import { Document } from 'mongoose';
import { User } from './user';

export interface Comment extends Document {
  user: User;
  text: string;
  created: Date;
}
