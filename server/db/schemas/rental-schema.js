import mongoose from 'mongoose';

const RentalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    groundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'grounds',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    groundName: {
      type: String,
      required: true,
    },
    reservationDate: {
      type: String,
      required: true,
    },
    reservationTime: {
      type: [String],
      required: true,
    },

    isBooked: {
      type: Boolean,
      required: false,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: 'rentals',
    timestamps: true,
  },
);

export { RentalSchema };
