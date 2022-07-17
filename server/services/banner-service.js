import { bannerModel } from '../db/index.js';

class BannerService {
  constructor(bannerModel) {
    this.bannerModel = bannerModel;
  }

  async addBanner(bannerInfo) {
    const { title } = bannerInfo;

    const banner = await this.bannerModel.findByTitle(title);
    if (banner) {
      throw new Error(
        '이 제목은 현재 사용중입니다. 다른 이름을 입력해 주세요.',
      );
    }

    const createdNewBanner = await this.bannerModel.create(bannerInfo);
    return createdNewBanner;
  }

  async getBanners() {
    const banners = await this.bannerModel.findAll();
    return banners;
  }

  async setBanner(bannerId, toUpdate) {
    console.log('hi');
    let banner = await this.bannerModel.findById(bannerId);

    if (!banner) {
      throw new Error('배너가 없습니다. 다시 한 번 확인해 주세요.');
    }
    console.log('hi');
    banner = await this.bannerModel.update({
      bannerId,
      update: toUpdate,
    });

    return banner;
  }

  async deleteBannerData(bannerId) {
    const { isDeleted } = await this.bannerModel.deleteById(bannerId);

    if (!isDeleted) {
      throw new Error(`${bannerId} 데이터의 삭제에 실패하였습니다.`);
    }

    return { result: 'success' };
  }
}

const bannerService = new BannerService(bannerModel);

export { bannerService };
