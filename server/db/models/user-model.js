import mongoose from 'mongoose';
import { UserSchema } from '../schemas/user-schema.js';

const User = mongoose.model('users', UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email })
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted');
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId })
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted');
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);

    return createdNewUser;
  }

  async findKeyword(query) {
    const users = await User.find(query)
      .where('isDeleted')
      .equals(false)
      .select('_id ')
      .sort({ _id: -1 });
    return users;
  }
  async findByPagination(query, offset, count) {
    const users = await User.find(query)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .sort({ _id: -1 })
      .skip(offset)
      .limit(count);
    return users;
  }
  async countdocument(query) {
    const count = await User.find(query)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .countDocuments();
    return count;
  }
  async findByPaginationDeleted(page, limit) {
    const users = await User.find({})
      .where('isDeleted')
      .equals(true)
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return users;
  }
  async findAll() {
    const users = await User.find({})
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted ');
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted ');
    return updatedUser;
  }

  async delete(userId) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };
    const user = await User.findOneAndUpdate(
      filter,
      { isDeleted: true },
      option,
    );
    return user;
  }
}
const userModel = new UserModel();

export { userModel };
