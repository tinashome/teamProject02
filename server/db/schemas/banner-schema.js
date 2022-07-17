import mogoose from "mongoose";

const BannerSchema = new mogoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: "banners",
    timestamps: true,
  }
);

export { BannerSchema };
