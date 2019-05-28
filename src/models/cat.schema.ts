import * as mongoose from 'mongoose';
import { PhotoSchema } from './photo.schema';

export const CatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  photos: [PhotoSchema],
  lonely: {
    type: Boolean,
    default: false,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
