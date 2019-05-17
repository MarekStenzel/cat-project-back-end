import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
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
  meme: Boolean,
  text: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
