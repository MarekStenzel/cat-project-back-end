import { Document } from 'mongoose';
import { User } from './user';

export interface Photo extends Document {
  user: User;
  catId: string;
  memeId: string;
  field: string;
  name: string;
  encoding: string;
  mime: string;
  destination: string;
  filename: string;
  path: string;
  size: string;
  created: Date;
}
