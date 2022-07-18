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

    const rentalInfo = {
      userObject: userId,
      groundObject: groundId,
      groundName: groundInfo.groundName,
      userName: userInfo.name,
      reservationDate,
      reservationTime,
    };
    const createNewRental = await this.rentalModel.create(rentalInfo);
    return createNewRental;
  }
}

const rentalService = new RentalService(rentalModel, userModel, groundModel);

export { rentalService };
