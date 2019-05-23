import { Document } from 'mongoose';
import { User } from './user';

export interface Cat extends Document {
  user: User;
  name: string;
  lonely: boolean;
  popularity: number;
  created: Date;
}
