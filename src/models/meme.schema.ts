import * as mongoose from 'mongoose';
import { PhotoSchema } from './photo.schema';

export const MemeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  photos: [PhotoSchema],
  popularity: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
