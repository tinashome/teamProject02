import { Router } from 'express';
import is from '@sindresorhus/is';
import { adminOnly, loginRequired } from '../middlewares/index.js';
import { rentalService } from '../services/index.js';

const rentalRouter = Router();
/**
 * @swagger
 * tags:
 *   name: rentals
 *   description: 예약 정보 API
 */

/**
 * @swagger
 * /api/rentals:
 *   post:
 *     summary: 예약 정보를 생성합니다.-유저 -성공시 해당 유저의 포인트값 바로 감소
 *     tags: [rentals]
 *     security:
 *       - JWT: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groundId:
 *                 type: string
 *                 description: 구장 objectid
 *                 required: true
 *               reservationDate:
 *                 type: string
 *                 description: 날짜
 *                 required: true
 *               reservationTime:
 *                 type: array
 *                 description: 시간
 *                 required: true
 *                 default: []
 *     responses:
 *       200:
 *         description: 반환 값으로 예약 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/rentals"
 */

rentalRouter.post('/', loginRequired, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }
    const userId = req.currentUserId;
    // req (request) 에서 데이터 가져오기
    const { groundId, reservationDate, reservationTime } = req.body;

    // 위 데이터를 카테고리 db에 추가하기
    const newRental = await rentalService.addRental({
      userId,
      groundId,
      reservationDate,
      reservationTime,
    });

    res.status(201).json(newRental);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/rentals/{rentalId}:
 *   patch:
 *     summary: 예약 정보를 업데이트합니다.
 *     tags: [rentals]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: rentalId
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
 *               reservationDate:
 *                 type: string
 *                 description: 날짜
 *               reservationTime:
 *                 type: array
 *                 description: 배열
 *                 default: []
 *     responses:
 *       200:
 *         description: 예약 정보가 업데이트 되었습니다.-유저의 totalPoint 값감소
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/rentals'
 */
rentalRouter.patch(
  '/:rentalId',
  loginRequired,
  async function (req, res, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      const { rentalId } = req.params;
      const { reservationDate, reservationTime } = req.body;

      const toUpdate = {
        ...(reservationDate && { reservationDate }),
        ...(reservationTime && { reservationTime }),
      };

      const updatedRental = await rentalService.setRental(rentalId, toUpdate);
      if (!updatedRental) {
        throw new Error(`${rentalId} 정보가 수정되지 않았습니다.`);
      }

      res.status(200).json(updatedRental);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @swagger
 * /api/rentals/{rentalId}:
 *   delete:
 *     summary: 예약정보를 삭제합니다.삭제시 예약상태일 경우 해당 유저의 총 포인터 증가, 아니면 그냥 삭제.-유저
 *     tags: [rentals]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         schema:
 *           type: string
 *         required: true
 *         description: 예약 id 고유값을 입력하세요.
 *     responses:
 *       204:
 *         description: 예약정보가 삭제되었습니다.
 */
rentalRouter.delete('/:rentalId', loginRequired, async (req, res, next) => {
  try {
    const { rentalId } = req.params;
    let result = await rentalService.deleteRentalData(rentalId);
    if (!result) {
      throw new Error(`${rentalId} 삭제가 완료되지 않았습니다.`);
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
 * /api/rentals/ground/{groundId}:
 *   get:
 *     summary: 구장별 예약정보 리스트를 조회합니다.-구장
 *     tags: [rentals]
 *     parameters:
 *       - in: path
 *         name: groundId
 *         schema:
 *           type: string
 *         required: true
 *         description:  id 고유값을 입력하세요.
 *     responses:
 *       200:
 *         description: 구장별 예약정보 리스트가 조회되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 length:
 *                   type: string
 *                   description: 길이
 *                 rentals:
 *                   type: "array"
 *                   $ref: '#/components/schemas/rentals'
 */
rentalRouter.get('/ground/:groundId', async function (req, res, next) {
  try {
    const { groundId } = req.params;
    const rentals = await rentalService.getRentalsByGround(groundId);

    if (!rentals) {
      res.status(404).json({
        message: `${groundId} 예약된 정보가 존재하지 않습니다.`,
      });
    }
    res.send(rentals);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/rentals/user:
 *   get:
 *     summary: 유저별 예약정보 리스트를 조회합니다.-유저
 *     tags: [rentals]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: 유저별 예약정보 리스트가 조회되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 length:
 *                   type: string
 *                   description: 길이
 *                 rentals:
 *                   type: "array"
 *                   $ref: '#/components/schemas/rentals'
 */
rentalRouter.get('/user', loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const rentals = await rentalService.getRentalsByUser(userId);

    if (!rentals) {
      res.status(404).json({
        message: `${userId} 예약된 정보가 존재하지 않습니다.`,
      });
    }
    res.send(rentals);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: 예약정보 리스트를 조회합니다.-관리자
 *     tags: [rentals]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     parameters:
 *       - in: query
 *         name: isBooked
 *         schema:
 *           type: boolean
 *         description:  입력 x - 전체 출력, 입력 true - 결제된 값만 출력, 입력 false - 결제가 안된 값 출력
 *       - in: query
 *         name: userName
 *         schema:
 *           type: string
 *         description: 회원이름 입력이 없을시 보내지 마시고 입력할 경우 보내세요.
 *       - in: query
 *         name: groundName
 *         schema:
 *           type: string
 *         description:  구장정보 입력이 없을시 보내지 마시고 입력할 경우 보내세요.
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
 *                 rentals:
 *                   type: "array"
 *                   $ref: '#/components/schemas/rentals'
 */
rentalRouter.get('/', adminOnly, async function (req, res, next) {
  try {
    // grounds/?filter_conditions={"title":"asdf"}&offset=0&count=8
    const { isBooked, userName, groundName, offset, count } = req.query;

    // offset=${offset}&count=6
    // 전체 제품 목록을 얻음

    const rentals = await rentalService.getRentalsByPagination(
      isBooked,
      userName,
      groundName,
      offset,
      count,
    );

    res.status(200).json(rentals);
  } catch (error) {
    next(error);
  }
});

export { rentalRouter };
