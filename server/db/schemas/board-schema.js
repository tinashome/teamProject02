import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },
    isNotified: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: 'boards',
    timestamps: true,
  },
);

export { BoardSchema };
