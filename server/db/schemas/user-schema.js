import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
    phoneNumber: {
      type: String,
      required: false,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },

    isOAuth: {
      type: Boolean,
      required: false,
      default: false,
    },
    totalPoint: {
      type: Boolean,
      required: false,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
