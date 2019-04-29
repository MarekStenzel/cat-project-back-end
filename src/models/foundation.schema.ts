import * as mongoose from 'mongoose';

export const FoundationSchema = new mongoose.Schema({
  name: String,
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
