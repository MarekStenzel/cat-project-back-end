import * as mongoose from 'mongoose';
import { PhotoSchema } from './photo.schema';

export const FoundationSchema = new mongoose.Schema({
  name: String,
  photos: [PhotoSchema],
  email: String,
  address: {
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  crypto: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
