import { Router } from 'express';
import is from '@sindresorhus/is';
import { adminOnly, loginRequired } from '../middlewares/index.js';
import { pointService } from '../services/point-service.js';

const pointRouter = Router();

/**
 * @swagger
 * tags:
 *   name: points
 *   description: 포인트 정보 API
 */
/**
 * @swagger
 * /api/points/user:
 *   get:
 *     summary: 해당 유저의 포인트정보 리스트를 조회합니다. - 유저 jwt 토큰 필요
 *     tags: [points]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description:  입력이 없을시 0부터,
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *         description:  입력이 없을시 10개만큼
 *     responses:
 *       200:
 *         description: 포인트가 조회되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 points:
 *                   type: "array"
 *                   $ref: '#/components/schemas/points'
 */
pointRouter.get('/user', loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;

    const { offset, count } = req.query;
    const points = await pointService.getPointsbyUser(userId, offset, count);

    if (!points) {
      res.status(404).json({
        message: `${pointId} 포인트 정보가 존재하지 않습니다.`,
      });
    }
    res.send(points);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /api/points:
 *   post:
 *     summary: 포인터 충전을 생성합니다.-유저
 *     tags: [points]
 *     security:
 *       - JWT: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payName:
 *                 type: string
 *                 description: 입금자
 *                 required: false
 *               paymentOption:
 *                 type: boolean
 *                 description: 페이옵션
 *               paymentAmount:
 *                 type: integer
 *                 description: 요금
 *                 required: false
 *     responses:
 *       200:
 *         description: 반환 값으로 포인트 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/points"
 */

pointRouter.post('/', loginRequired, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }
    const userId = req.currentUserId;
    // req (request) 에서 데이터 가져오기
    const { paymentOption, paymentAmount, payName } = req.body;

    // 위 데이터를 카테고리 db에 추가하기
    const newPoint = await pointService.addPoint({
      userId,
      paymentOption,
      paymentAmount,
      payName,
    });

    res.status(201).json(newPoint);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/points/{pointId}:
 *   patch:
 *     summary: point 정보를 업데이트합니다.(승인할시 true로)-관리자 취소할시 다시 false로
 *     tags: [points]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     parameters:
 *       - in: path
 *         name: pointId
 *         schema:
 *           type: string
 *         required: true
 *         description: 포인트 id 고유값을 입력하세요.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCharged:
 *                 type: boolean
 *                 description: 승인여부 기존에는 false
 *     responses:
 *       200:
 *         description: 포인트 정보가 업데이트 되었습니다.-유저의 totalPoint 값증가
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/points"
 */
pointRouter.patch('/:pointId', adminOnly, async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const { pointId } = req.params;
    const { isCharged } = req.body;

    const toUpdate = {
      ...(isCharged && { isCharged }),
    };
    // 제품 정보를 업데이트함.

    const updatedPoint = await pointService.setPoint(
      pointId,
      toUpdate,
      payName,
    );
    if (!updatedPoint) {
      throw new Error(`${pointId} 정보가 수정되지 않았습니다.`);
    }

    res.status(200).json(updatedPoint);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/points/{pointId}:
 *   delete:
 *     summary: 포인트정보를 삭제합니다.삭제시 포인터가 충전되어있을경우 해당 유저의 총 포인터 감소, 아니면 그냥 삭제.-유저
 *     tags: [points]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: pointId
 *         schema:
 *           type: string
 *         required: true
 *         description: 포인트 id 고유값을 입력하세요.
 *     responses:
 *       204:
 *         description: 포인트가 삭제되었습니다.

 */
pointRouter.delete('/:pointId', loginRequired, async (req, res, next) => {
  try {
    const { pointId } = req.params;
    let result = await pointService.deletePointData(pointId);
    if (!result) {
      throw new Error(`${pointId} 삭제가 완료되지 않았습니다.`);
    }
    // result.message = `해당 포인트: ${pointId}는 삭제처리 되었습니다.`;
    // 사용자 정보를 JSON 형태로 프론트에 보냄
    // res.send(result);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/points/{pointId}:
 *   get:
 *     summary: 해당 포인트 정보를 조회합니다.-유저
 *     tags: [points]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: pointId
 *         schema:
 *           type: string
 *         required: true
 *         description:  id 고유값을 입력하세요.
 *     responses:
 *       200:
 *         description: 해당 포인트 정보가 조회되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/points'
 */
pointRouter.get('/:pointId', loginRequired, async (req, res, next) => {
  try {
    const { pointId } = req.params;
    const point = await pointService.getPoint(pointId);

    if (!point) {
      res.status(404).json({
        message: `${pointId} 포인트 정보가 존재하지 않습니다.`,
      });
    }
    res.send(point);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/points:
 *   get:
 *     summary: 포인트정보 리스트를 조회합니다.-관리자
 *     tags: [points]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     parameters:
 *       - in: query
 *         name: isCharged
 *         schema:
 *           type: boolean
 *         description:  입력 x - 전체 출력, 입력 true - 포인트 승인된 값만 출력, 입력 false - 포인트 승인이 안된 값 출력
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: 회원이름 입력이 없을시 보내지 마시고 입력할 경우 보내세요.
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: 회원이메일 입력이 없을시 보내지 마시고 입력할 경우 보내세요.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description:  입력이 없을시 0부터,
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *         description:  입력이 없을시 10개만큼
 *     responses:
 *       200:
 *         description: 포인트가 조회되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 length:
 *                   type: string
 *                   description: 길이
 *                 points:
 *                   type: "array"
 *                   $ref: '#/components/schemas/points'
 */
pointRouter.get('/', adminOnly, async function (req, res, next) {
  try {
    // grounds/?filter_conditions={"title":"asdf"}&offset=0&count=8
    const { isCharged, name, email, offset, count } = req.query;

    // offset=${offset}&count=6
    // 전체 제품 목록을 얻음

    const points = await pointService.getPointByPagination(
      isCharged,
      name,
      email,
      offset,
      count,
    );

    res.status(200).json(points);
  } catch (error) {
    next(error);
  }
});

export { pointRouter };
