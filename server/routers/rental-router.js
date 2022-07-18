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
 *     summary: 예약 정보를 생성합니다.-유저
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
 *                 type: string
 *                 description: 시간
 *                 required: true
 *     responses:
 *       200:
 *         description: 반환 값으로 포인트 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/rentals'
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

export { rentalRouter };
