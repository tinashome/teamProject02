import { groundModel } from '../db/index.js';

class GroundService {
  constructor(groundModel) {
    this.groundModel = groundModel;
  }
  async addGround(groundInfo) {
    const createdNewGround = await this.groundModel.create(groundInfo);
    return createdNewGround;
  }
}

const groundService = new GroundService(groundModel);

export { groundService };
