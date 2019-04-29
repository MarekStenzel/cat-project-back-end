import * as mongoose from 'mongoose';

export const MemeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  photos: [
    {
      photo: String,
    },
  ],
  comments: [
    {
      comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    },
  ],
  popularity: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
