import * as mongoose from 'mongoose';
import { User } from '../types/user';

export const PhotoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cat',
  },
  memeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meme',
  },
  field: String,
  name: String,
  encoding: String,
  mime: String,
  destination: String,
  filename: String,
  path: String,
  size: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

// export interface Photo extends Document {
//   user: User;
//   catId: string;
//   memeId: string;
//   meme: boolean;
//   field: string;
//   name: string;
//   encoding: string;
//   mime: string;
//   destination: string;
//   filename: string;
//   path: string;
//   size: string;
//   created: Date;
// }
