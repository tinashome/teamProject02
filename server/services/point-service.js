import { pointModel, userModel } from '../db/index.js';

class PointService {
  constructor(pointModel, userModel) {
    this.pointModel = pointModel;
    this.userModel = userModel;
  }
  async addPoint({ userId, paymentOption, paymentAmount, payName }) {
    const userInfo = await this.userModel.findById({ _id: userId });

    const user = {
      id: userInfo._id,
      email: userInfo.email,
      name: userInfo.name,
    };
    const pointInfo = {
      user,
      paymentOption,
      paymentAmount,
      payName,
    };
    const createdNewPoint = await this.pointModel.create(pointInfo);
    return createdNewPoint;
  }
  async setPoint(pointId, toUpdate) {
    const updatedPoint = await this.pointModel.update({
      pointId,
      update: toUpdate,
    });

    const userId = updatedPoint.user.id;
    const user = await this.userModel.findById({ _id: userId });

    if (!user) {
      throw new Error(`${user} 정보가 없습니다.`);
    }
    let resultPoint = 0;

    if (toUpdate.isCharged) {
      resultPoint = user.totalPoint + updatedPoint.paymentAmount;
    } else {
      resultPoint = user.totalPoint - updatedPoint.paymentAmount;
    }
    const toUpdateTotalPoint = {
      totalPoint: resultPoint,
    };
    const updatedUserbyTotalPoint = await this.userModel.update({
      userId,
      update: toUpdateTotalPoint,
    });
    if (!updatedUserbyTotalPoint) {
      throw new Error(`${updatedUserbyTotalPoint} 정보가 수정되지 않았습니다.`);
    }
    return updatedPoint;
  }
  async deletePointData(pointId) {
    const point = await this.pointModel.findById(pointId);

    if (point.isCharged) {
      const userId = point.user.id;

      const user = await this.userModel.findById({ _id: userId });

      if (!user) {
        throw new Error(`${user} 정보가 없습니다.`);
      }
      const resultPoint = user.totalPoint - point.paymentAmount;
      const toUpdateTotalPoint = {
        totalPoint: resultPoint,
      };
      const updatedUserbyTotalPoint = await this.userModel.update({
        userId,
        update: toUpdateTotalPoint,
      });
      if (!updatedUserbyTotalPoint) {
        throw new Error(
          `${updatedUserbyTotalPoint} 정보가 수정되지 않았습니다.`,
        );
      }
    }

    const { isDeleted } = await this.pointModel.deleteById(pointId);

    if (!isDeleted) {
      throw new Error(`${pointId} 데이터의 삭제에 실패하였습니다.`);
    }

    return { result: 'success' };
  }
  async getPoint(pointId) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    const point = await this.pointModel.findById(pointId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!point) {
      throw new Error(' 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    return point;
  }
  async getPointsbyUser(userId, offset = 0, count = 10) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    console.log(userId);
    const user = {
      'user.id': userId,
    };
    const point = await this.pointModel.findByPagination(user, offset, count);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!point) {
      throw new Error(' 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    return point;
  }
  async getPointByPagination(isChecked, name, email, offset = 0, count = 10) {
    let search_list = [];

    if (name) {
      search_list.push({ 'user.name': { $regex: name } });
    }
    if (email) {
      search_list.push({ 'user.email': { $regex: email } });
    }
    if (isChecked === 'true') {
      search_list.push({ isCharged: true });
    }
    if (isChecked === 'false') {
      search_list.push({ isCharged: false });
    }
    let query = {};

    if (search_list.length > 0) {
      query = { $and: search_list };
    }

    const points = await this.pointModel.findByPagination(query, offset, count);
    const length = await this.pointModel.countdocument(query);
    const result = {
      length,
      points,
    };
    return result;
  }
}

const pointService = new PointService(pointModel, userModel);

export { pointService };
