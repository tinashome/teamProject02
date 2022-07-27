import { boardModel, userModel } from '../db/index.js';

class BoardService {
  constructor(boardModel, userModel) {
    this.boardModel = boardModel;
    this.userModel = userModel;
  }
  async addBoard({ userId, title, contents, isNotified }) {
    const userInfo = await this.userModel.findById({ _id: userId });

    const boardInfo = {
      userId: userId,
      userName: userInfo.name,
      role: userInfo.role,
      title,
      contents,
      isNotified,
    };
    const createdNewBoard = await this.boardModel.create(boardInfo);
    return createdNewBoard;
  }
  async setBoard({ userId, boardId, toUpdate }) {
    const board = await this.boardModel.findById(boardId);
    if (board.userId._id.toString() !== userId) {
      throw new Error('유저 정보가 일치하지 않습니다.');
    }
    const updatedBoard = await this.boardModel.update({
      boardId,
      update: toUpdate,
    });

    return updatedBoard;
  }
  async deleteBoardData(boardId) {
    const { isDeleted } = await this.boardModel.deleteById(boardId);

    if (!isDeleted) {
      throw new Error(`${boardId} 데이터의 삭제에 실패하였습니다.`);
    }
    return { result: 'success' };
  }
  async getBoard(boardId) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    const board = await this.boardModel.findById(boardId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!board) {
      throw new Error(' 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    return board;
  }
  async getBoardByPagination({
    role,
    title,
    contents,
    isNotified,
    offset = 0,
    count = 10,
  }) {
    let search_list = [];

    if (isNotified === 'true') {
      search_list.push({ isNotified: true });
    }
    if (isNotified === 'false') {
      search_list.push({ isNotified: false });
    }
    if (role) {
      search_list.push({ role: { $regex: role } });
    }
    if (title) {
      search_list.push({ title: { $regex: title } });
    }

    if (contents) {
      search_list.push({ contents: { $regex: contents } });
    }
    let query = {};

    if (search_list.length > 0) {
      query = { $and: search_list };
    }

    const boards = await this.boardModel.findByPagination(query, offset, count);
    const length = await this.boardModel.countdocument(query);
    const result = {
      length,
      boards,
    };
    return result;
  }
}

const boardService = new BoardService(boardModel, userModel);

export { boardService };
