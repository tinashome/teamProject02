import mongoose from "mongoose";
import { GroundSchema } from "../schemas/ground-schema.js";

const Ground = mongoose.model("grounds", GroundSchema);

export class GroundModel {
  async findById(groundId) {
    const ground = await Ground.findOne({ _id: groundId })
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted")
      .sort({ _id: -1 });
    return ground;
  }
  async findByName(groundName) {
    const ground = await Ground.findOne({ groundName })
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted")
      .sort({ _id: -1 });
    return ground;
  }
  async findByAddress(groundAddress) {
    const ground = await Ground.findOne({ groundAddress })
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted")
      .sort({ _id: -1 });
    return ground;
  }

  async create(groundInfo) {
    const createdNewGround = await Ground.create(groundInfo).select(
      "-isDeleted"
    );
    return createdNewGround;
  }

  async findAll() {
    const grounds = await Ground.find({})
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted")
      .sort({ _id: -1 });
    return grounds;
  }
  async findByDeltedAll() {
    const grounds = await Ground.find({}).where("isDeleted").equals(true);

    return grounds;
  }
  async findKeyword(keyword) {
    const grounds = await Ground.find({})
      .regex("groundName", keyword)
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted")
      .sort({ _id: -1 });
    return grounds;
  }

  async findByPagination(query, page, limit) {
    const grounds = await Ground.find(query)
      .where("isDeleted")
      .equals(false)
      .select("-isDeleted")
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return grounds;
  }
  async update({ groundId, update }) {
    const filter = { _id: groundId };
    const option = { returnOriginal: false };

    const updatedGround = await Ground.findOneAndUpdate(filter, update, option);
    return updatedGround;
  }

  async deleteById(groundId) {
    const filter = { _id: groundId };
    const option = { returnOriginal: false };
    const ground = await Ground.findOneAndUpdate(
      filter,
      { isDeleted: true },
      option
    );
    return ground;
  }
}

const groundModel = new GroundModel();

export { groundModel };
