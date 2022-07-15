import mongoose from "mongoose";
import { BannerSchema } from "../schemas/banner-schema.js";

const Banner = mongoose.model("banners", BannerSchema);

export class BannerModel {
  async findByTitle(title) {
    const banner = await Banner.findOne({ title })
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted");
    return banner;
  }

  async findById(bannerId) {
    const banner = await Banner.findOne({ _id: bannerId })
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted");
    return banner;
  }

  async create(bannerInfo) {
    const createdNewBanner = await Banner.create(bannerInfo);
    return createdNewBanner;
  }

  async findAll() {
    const banners = await Banner.find({})
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted");
    return banners;
  }

  async findByPagination(page, limit) {
    const banners = await Banner.find({})
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted")
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return banners;
  }
  async deleteById(bannerId) {
    const filter = { _id: bannerId };
    const option = { returnOriginal: false };
    const banner = await Banner.findOneAndUpdate(
      filter,
      { isDeleted: true },
      option
    );
    return banner;
  }
}

const bannerModel = new BannerModel();

export { bannerModel };
