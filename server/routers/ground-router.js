import is from '@sindresorhus/is';
import { Router } from 'express';
import { adminOnly, loginRequired } from '../middlewares/index.js';
import { groundService } from '../services/ground-service.js';

const groundRouter = Router();
/**
 * @swagger
 * tags:
 *   name: grounds
 *   description: 구장정보 API-구장생성 전에 images의 imageUpload에서 imageUrl변환후 이미지 url을 넣으세요.
 */
/**
 * @swagger
 * /api/grounds:
 *   post:
 *     summary: 구장 정보를 생성합니다.
 *     tags: [grounds]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: "#/definitions/grounds"
 *     responses:
 *       200:
 *         description: 반환 값으로 구장정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/grounds'
 */
groundRouter.post('/', adminOnly, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }
    const {
      groundName,
      paymentPoint,
      groundImg,
      groundAddress,
      groundSize,
      showerPlace,
      parking,
      shoesRental,
      sportswearRental,
      wayTo,
      parkingInfo,
      smoking,
      toilet,
    } = req.body;

    const newGround = await groundService.addGround({
      groundName,
      paymentPoint,
      groundImg,
      groundAddress,
      groundSize,
      showerPlace,
      parking,
      shoesRental,
      sportswearRental,
      wayTo,
      parkingInfo,
      smoking,
      toilet,
    });
    res.send(newGround);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /api/grounds/{groundId}:
 *   patch:
 *     summary: 구장정보를 업데이트합니다.
 *     tags: [grounds]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     parameters:
 *       - in: path
 *         name: groundId
 *         schema:
 *           type: string
 *         required: true
 *         description: 구장 id 고유값을 입력하세요.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: "#/definitions/grounds"
 *     responses:
 *       200:
 *         description: 구장 정보가 업데이트 되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/grounds'
 */
groundRouter.patch('/:groundId', adminOnly, async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const { groundId } = req.params;
    const {
      groundName,
      paymentPoint,
      groundImg,
      groundAddress,
      groundSize,
      showerPlace,
      parking,
      shoesRental,
      sportswearRental,
      wayTo,
      parkingInfo,
      smoking,
      toilet,
    } = req.body;

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(groundName && { groundName }),
      ...(paymentPoint && { paymentPoint }),
      ...(groundAddress && { groundAddress }),
      ...(groundSize && { groundSize }),
      ...(showerPlace && { showerPlace }),
      ...(groundImg && { groundImg }),
      ...(parking && { parking }),
      ...(shoesRental && { shoesRental }),
      ...(sportswearRental && { sportswearRental }),
      ...(wayTo && { wayTo }),
      ...(parkingInfo && { parkingInfo }),
      ...(smoking && { smoking }),
      ...(toilet && { toilet }),
    };

    const updatedGround = await groundService.setGround(groundId, toUpdate);

    res.status(200).json(updatedGround);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/grounds/{groundId}:
 *   delete:
 *     summary: 구장정보를 삭제합니다..
 *     tags: [grounds]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     parameters:
 *       - in: path
 *         name: groundId
 *         schema:
 *           type: string
 *         required: true
 *         description: 구장 id 고유값을 입력하세요.
 *     responses:
 *       204:
 *         description: 구장이 삭제되었습니다.
 */
groundRouter.delete('/:groundId', adminOnly, async (req, res, next) => {
  try {
    const { groundId } = req.params;
    let result = await groundService.deleteGroundData(groundId);
    if (!result) {
      throw new Error(`${groundId} 삭제가 완료되지 않았습니다.`);
    }
    // result.message = `해당 구장: ${groundId}는 삭제처리 되었습니다.`;
    // 사용자 정보를 JSON 형태로 프론트에 보냄
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/grounds/{groundId}:
 *   get:
 *     summary: 해당구장정보를 조회합니다..
 *     tags: [grounds]
 *     parameters:
 *       - in: path
 *         name: groundId
 *         schema:
 *           type: string
 *         required: true
 *         description:  id 고유값을 입력하세요.
 *     responses:
 *       200:
 *         description: 구장이 조회되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/grounds'
 *
 */
groundRouter.get('/:groundId', async (req, res, next) => {
  try {
    const { groundId } = req.params;
    const ground = await groundService.getGround(groundId);

    if (!ground) {
      res.status(404).json({
        message: `${userId} 구장 정보가 존재하지 않습니다.`,
      });
    }
    res.send(ground);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /api/grounds:
 *   get:
 *     summary: 구장정보 리스트를 조회합니다. grounds 는 리스트 형태로 나옵니다.
 *     tags: [grounds]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description:  전체 지역시 보내지 마시고 부산, 서울, 지역을 입력하세요.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description:  입력이 없을시 보내지 마시고 입력할 경우 보내세요.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description:  입력이 없을시 0부터,
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *         description:  입력이 없을시 8개만큼
 *     responses:
 *       200:
 *         description: 구장이 조회되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 length:
 *                   type: string
 *                   description: 길이
 *                 grounds:
 *                   type: "array"
 *                   $ref: '#/components/schemas/grounds'
 */
groundRouter.get('/', async function (req, res, next) {
  try {
    // grounds/?filter_conditions={"title":"asdf"}&offset=0&count=8
    const { location, search, offset, count } = req.query;

    // offset=${offset}&count=6
    // 전체 제품 목록을 얻음

    const grounds = await groundService.getGroundByPagination(
      location,
      search,
      offset,
      count,
    );

    res.status(200).json(grounds);
  } catch (error) {
    next(error);
  }
});

export { groundRouter };
