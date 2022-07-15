import { Router } from 'express';
import is from '@sindresorhus/is';
import { adminOnly } from '../middlewares/index.js';
import { bannerService } from '../services/index.js';
const bannerRouter = Router();
/**
 * @swagger
 * tags:
 *   name: banners
 *   description: 배너정보 API-배너생성 전에 images의 imageUpload에서 imageUrl변환후 이미지 url과 제목을 넣으세요.
 */
/**
 * @swagger
 * /api/banners:
 *   post:
 *     summary: 배너를 생성합니다.
 *     tags: [banners]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 제목
 *               imageUrl:
 *                 type: string
 *                 description: 이미지 url
 *     responses:
 *       200:
 *         description: 반환 값으로 s3 url을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/bannerPost"
 */

bannerRouter.post('/', adminOnly, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // req (request) 에서 데이터 가져오기
    const { title, imageUrl } = req.body;

    // 위 데이터를 카테고리 db에 추가하기
    const newBanner = await bannerService.addBanner({
      title,
      imageUrl,
    });

    res.status(201).json(newBanner);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/banners:
 *   get:
 *     summary: 모든 배너정보를 가져옵니다.
 *     tags: [banners]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     responses:
 *       200:
 *         description: 모든 배너정보를 가져옵니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/bannerPost"
 */
bannerRouter.get('/', adminOnly, async (req, res, next) => {
  try {
    const banners = await bannerService.getBanners();
    res.send(banners);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/banners/{bannerId}:
 *   patch:
 *     summary: 배너정보를 업데이트합니다.
 *     tags: [banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         schema:
 *           type: string
 *         required: true
 *         description: 배너 id 고유값을 입력하세요.
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 제목
 *               imageUrl:
 *                 type: string
 *                 description: 이미지 url
 *     responses:
 *       200:
 *         description: 배너 정보가 업데이트 되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/bannerPost"
 */
bannerRouter.patch('/:bannerId', adminOnly, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const { bannerId } = req.params;
    const { title, imageUrl } = req.body;

    const toUpdate = {
      ...(title && { title }),
      ...(imageUrl && { imageUrl }),
    };

    const updatedBannerInfo = await bannerService.setBanner(bannerId, toUpdate);

    res.status(200).json(updatedBannerInfo);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/banners/{bannerId}:
 *   delete:
 *     summary: 배너정보를 삭제합니다..
 *     tags: [banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         schema:
 *           type: string
 *         required: true
 *         description: 배너 id 고유값을 입력하세요.
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     responses:
 *       200:
 *         description: 배너가 삭제되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 성공여부
 */
bannerRouter.delete('/:bannerId', adminOnly, async (req, res, next) => {
  try {
    const { bannerId } = req.params;
    let result = await bannerService.deleteBannerData(bannerId);
    result.message = `해당 배너: ${bannerId}는 삭제처리 되었습니다.`;
    // 사용자 정보를 JSON 형태로 프론트에 보냄
    res.send(result);
  } catch (error) {
    next(error);
  }
});

export { bannerRouter };

/**
 * @swagger
 * definitions:
 *   bannerPost:
 *     type: "object"
 *     properties:
 *                   _id:
 *                     type: objectid
 *                     description: primaryKey
 *                   title:
 *                     type: string
 *                     description: 제목
 *                   imageUrl:
 *                     type: string
 *                     description: 이미지 url
 *                   createdAt:
 *                     type: "string"
 *                     format: "date-time"
 *                   updatedAt:
 *                     type: "string"
 *                     format: "date-time"
 *
 */
