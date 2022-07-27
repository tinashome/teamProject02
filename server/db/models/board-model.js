import mongoose from 'mongoose';
import { BoardSchema } from '../schemas/board-schema.js';

const Board = mongoose.model('boards', BoardSchema);

class BoardModel {
  async findById(boardId) {
    const board = await Board.findOne({ _id: boardId })
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      });
    return board;
  }
  async findByTitle(title) {
    const board = await Board.findOne({ title })
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      });

    return board;
  }
  async countdocument(query) {
    const count = await Board.countDocuments(query)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted');
    return count;
  }
  async create(boardInfo) {
    const createdNewBoard = await Board.create(boardInfo);
    return createdNewBoard;
  }

  async findAll() {
    const boards = await Board.find({})
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .sort({ _id: -1 });
    return boards;
  }
  async findByDeltedAll() {
    const boards = await Board.find({}).where('isDeleted').equals(true);
    return boards;
  }
  async findKeyword(keyword) {
    const boards = await Board.find({})
      .regex('title', keyword)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .sort({ _id: -1 });
    return boards;
  }

  async findByPagination(query, offset, count) {
    const boards = await Board.find(query)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      })
      .sort({ _id: -1 })
      .skip(offset)
      .limit(count);
    return boards;
  }
  async update({ boardId, update }) {
    const filter = { _id: boardId };
    const option = { returnOriginal: false };

    const updatedGround = await Board.findOneAndUpdate(filter, update, option)
      .where('isDeleted')
      .equals(false)
      .select('-isDeleted')
      .populate({
        path: 'userId',
        select: { password: 0, isDeleted: 0 },
      });
    return updatedGround;
  }

  async deleteById(boardId) {
    const filter = { _id: boardId };
    const option = { returnOriginal: false };
    const board = await Board.findOneAndUpdate(
      filter,
      { isDeleted: true },
      option,
    );
    return board;
  }
}

const boardModel = new BoardModel();

export { boardModel };
