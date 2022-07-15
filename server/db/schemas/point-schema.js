import mongoose from "mongoose";

const PointSchema = new mongoose.Schema(
  {
    userObject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
    collection: "points",
    timestamps: true,
  }
);

export { PointSchema };
