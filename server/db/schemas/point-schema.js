import mongoose from 'mongoose';

const PointSchema = new mongoose.Schema(
  {
    user: {
      type: new mongoose.Schema(
        {
          id: String,
          email: String,
          name: String,
        },
        {
          _id: false,
        },
      ),
      required: true,
    },

    paymentOption: {
      type: Boolean,
      required: false,
      default: false,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    isCharged: {
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
    collection: 'points',
    timestamps: true,
  },
);

export { PointSchema };
