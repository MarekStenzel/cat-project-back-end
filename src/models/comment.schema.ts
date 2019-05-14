import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  meme: Boolean,
  text: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
