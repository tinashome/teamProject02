import { rentalModel, userModel, groundModel } from '../db/index.js';

class RentalService {
  constructor(rentalModel, userModel, groundModel) {
    this.rentalModel = rentalModel;
    this.userModel = userModel;
    this.groundModel = groundModel;
  }
  async addRental({ userId, groundId, reservationDate, reservationTime }) {
    const userInfo = await this.userModel.findById({ _id: userId });
    const groundInfo = await this.groundModel.findById({ _id: groundId });

    if (!userInfo || !groundInfo) {
      throw new Error('구장정보 또는 유저 정보가 없습니다. 다시 확인해주세요.');
    }

    if (
      groundInfo.paymentPoint * reservationTime.length >
      userInfo.totalPoint
    ) {
      throw new Error(
        '유저의 포인트가 해당 구장의 포인트 값보다 작아서 예약을 할 수 없습니다. 다시 확인해 주세요.',
      );
    }
    const changeTotalPoint =
      userInfo.totalPoint - groundInfo.paymentPoint * reservationTime.length;

    const toUpdateTotalPoint = {
      totalPoint: changeTotalPoint,
    };
    const updatedUserbyTotalPoint = await this.userModel.update({
      userId,
      update: toUpdateTotalPoint,
    });
    if (!updatedUserbyTotalPoint) {
      throw new Error(`${updatedUserbyTotalPoint} 정보가 수정되지 않았습니다.`);
    }
    const rentalInfo = {
      userId: userId,
      groundId: groundId,
      groundName: groundInfo.groundName,
      userName: userInfo.name,
      reservationDate,
      reservationTime,
    };
    const createNewRental = await this.rentalModel.create(rentalInfo);
    return createNewRental;
  }

  async setRental(rentalId, toUpdate) {
    const updatedRental = await this.rentalModel.update({
      rentalId,
      update: toUpdate,
    });
    if (!updatedRental) {
      throw new Error(`${updatedRental} 정보가 없습니다.`);
    }

    const userId = updatedRental.userId._id;

    let resultPoint = 0;

    if (toUpdate.isBooked) {
      resultPoint =
        updatedRental.userId.totalPoint -
        updatedRental.groundId.paymentPoint *
          updatedRental.reservationTime.length;
    } else {
      resultPoint =
        updatedRental.userId.totalPoint +
        updatedRental.groundId.paymentPoint *
          updatedRental.reservationTime.length;
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
    return updatedRental;
  }

  async deleteRentalData(rentalId) {
    const rental = await this.rentalModel.findById(rentalId);

    if (rental.isBooked) {
      const userId = rental.userId._id;

      const user = await this.userModel.findById({ _id: userId });

      if (!user) {
        throw new Error(`${user} 정보가 없습니다.`);
      }
      const resultPoint =
        user.totalPoint +
        rental.groundId.paymentPoint * rental.reservationTime.length;
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

    const { isDeleted } = await this.rentalModel.deleteById(rentalId);

    if (!isDeleted) {
      throw new Error(`${rentalId} 데이터의 삭제에 실패하였습니다.`);
    }

    return { result: 'success' };
  }
  async getRentalsByGround(groundId) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    const rentals = await this.rentalModel.findAllByGroundId(groundId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!rentals) {
      throw new Error(' 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    return rentals;
  }

  async getRentalsByUser(userId) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    const rentals = await this.rentalModel.findAllByUserId(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!rentals) {
      throw new Error(' 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    return rentals;
  }

  async getRentalsByPagination(
    isBooked,
    userName,
    groundName,
    offset = 0,
    count = 10,
  ) {
    let search_list = [];

    if (userName) {
      search_list.push({ userName: { $regex: userName } });
    }
    if (groundName) {
      search_list.push({ groundName: { $regex: groundName } });
    }
    if (isBooked === 'true') {
      search_list.push({ isBooked: true });
    }
    if (isBooked === 'false') {
      search_list.push({ isBooked: false });
    }
    let query = {};

    if (search_list.length > 0) {
      query = { $and: search_list };
    }

    const rentals = await this.rentalModel.findByPagination(
      query,
      offset,
      count,
    );
    const length = await this.rentalModel.countdocument(query);
    const result = {
      length,
      rentals,
    };
    return result;
  }
}

const rentalService = new RentalService(rentalModel, userModel, groundModel);

export { rentalService };
