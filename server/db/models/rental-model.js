import mongoose from 'mongoose';
import { RentalSchema } from '../schemas/rental-schema.js';

const Rental = mongoose.model('rentals', RentalSchema);

export class RentalModel {
  async findById(rentalId) {
    const rental = await Rental.findOne({ _id: rentalId })
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .populate({
        path: 'groundId',
        select: {
          _id: 1,
          groundName: 1,

          isBooked: 1,
          isBookedDate: 1,
          paymentPoint: 1,
        },
      });
    return rental;
  }

  async findAllByUserId(userId, page, limit) {
    const rentals = await Rental.find({ userId: userId })
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .populate({
        path: 'groundId',
        select: {
          _id: 1,
          groundName: 1,

          isBooked: 1,
          isBookedDate: 1,
          paymentPoint: 1,
        },
      })
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return rentals;
  }

  async findAllByGroundId(groundId) {
    const rentals = await Rental.find({ groundId: groundId })
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .populate({
        path: 'groundId',
        select: {
          _id: 1,
          groundName: 1,
          isBooked: 1,
          isBookedDate: 1,
          paymentPoint: 1,
        },
      });

    return rentals;
  }
  async findAllByUserId(userId) {
    const rentals = await Rental.find({ userId: userId })
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .populate({
        path: 'groundId',
        select: {
          _id: 1,
          groundName: 1,
          isBooked: 1,
          isBookedDate: 1,
          paymentPoint: 1,
        },
      });

    return rentals;
  }
  async create(rentalInfo) {
    const createdNewrental = await Rental.create(rentalInfo);
    return createdNewrental;
  }

  async findAll() {
    const rentals = await Rental.find({})
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .populate({
        path: 'groundId',
        select: {
          _id: 1,
          groundName: 1,

          isBooked: 1,
          isBookedDate: 1,
          paymentPoint: 1,
        },
      })
      .sort({ _id: -1 });
    return rentals;
  }

  async findByPagination(query, offset, count) {
    const rentals = await Rental.find(query)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .populate({
        path: 'groundId',
        select: {
          _id: 1,
          groundName: 1,

          isBooked: 1,
          isBookedDate: 1,
          paymentPoint: 1,
        },
      })
      .sort({ _id: -1 })
      .skip(offset)
      .limit(count);
    return rentals;
  }

  async countdocument(query) {
    const count = await Rental.find(query)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .countDocuments();
    return count;
  }

  async update({ rentalId, update }) {
    const filter = { _id: rentalId };
    const option = { returnOriginal: false };

    const updatedrental = await Rental.findOneAndUpdate(filter, update, option)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .populate({
        path: 'groundId',
        select: {
          _id: 1,
          groundName: 1,

          isBooked: 1,
          isBookedDate: 1,
          paymentPoint: 1,
        },
      });

    return updatedrental;
  }

  async deleteById(rentalId) {
    const filter = { _id: rentalId };
    const option = { returnOriginal: false };
    const rental = await Rental.findOneAndUpdate(
      filter,
      { isDeleted: true },
      option,
    );
    return rental;
  }
}

const rentalModel = new RentalModel();

export { rentalModel };
