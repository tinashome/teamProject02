import { groundModel } from '../db/index.js';

class GroundService {
  constructor(groundModel) {
    this.groundModel = groundModel;
  }
  async addGround(groundInfo) {
    const createdNewGround = await this.groundModel.create(groundInfo);
    return createdNewGround;
  }
  async setGround(groundId, toUpdate) {
    const updatedGround = await this.groundModel.update({
      groundId,
      update: toUpdate,
    });

    return updatedGround;
  }
  async deleteGroundData(groundId) {
    const { isDeleted } = await this.groundModel.deleteById(groundId);

    if (!isDeleted) {
      throw new Error(`${groundId} 데이터의 삭제에 실패하였습니다.`);
    }

    return { result: 'success' };
  }
  async getGround(groundId) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    const ground = await this.groundModel.findById(groundId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!ground) {
      throw new Error(' 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    return ground;
  }
  async getGroundByPagination(location, search, offset = 0, count = 8) {
    let search_list = [];

    if (search) {
      search_list.push({ groundName: { $regex: search } });
    }
    // const address = {
    //   address1: { $regex: location },
    // };

    if (location) {
      search_list.push({ 'groundAddress.address1': { $regex: location } });
    }
    let query = {};

    if (search_list.length > 0) {
      query = { $and: search_list };
    }

    const grounds = await this.groundModel.findByPagination(
      query,
      offset,
      count,
    );
    const length = await this.groundModel.countdocument(query);
    const result = {
      length,
      grounds,
    };
    return result;
  }
}

const groundService = new GroundService(groundModel);

export { groundService };
