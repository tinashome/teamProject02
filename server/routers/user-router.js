import { Router } from 'express';
import is from '@sindresorhus/is';
import { userService } from '../services/index.js';
import { adminOnly, loginRequired } from '../middlewares/index.js';
/**
 * @swagger
 * tags:
 *   name: users
 *   description: 유저정보 API - jwt 토큰 이용
 */

const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 모든 유저정보를 가져옵니다. -관리자
 *     tags: [users]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     parameters:
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
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         description: 회원전화번호 입력이 없을시 보내지 마시고 입력할 경우 보내세요.
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
 *         description: 특정 유저정보를 가져옵니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 length:
 *                   type: string
 *                   description: 길이
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: "#/definitions/users"
 */
userRouter.get('/', adminOnly, async (req, res, next) => {
  try {
    const { name, email, phoneNumber, offset, count } = req.query;
    // 전체 사용자 목록을 얻음
    // const users = await userService.getUsers();

    const users = await userService.getUsersByPagination({
      name,
      email,
      phoneNumber,
      offset,
      count,
    });

    res.send(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users/user:
 *   get:
 *     summary:  해당 유저정보를 가져옵니다. - 유저
 *     tags: [users]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: 해당 유저 정보를 가져옵니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/users"
 *       404:
 *         description: 유저 정보이 존재하지 않습니다.
 */
userRouter.get('/user', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const user = await userService.getUser(userId);
    if (!user) {
      res.status(404).json({
        message: `${userId}유저 정보가 존재하지 않습니다.`,
      });
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users/updatedPwd:
 *   patch:
 *     summary: 유저비밀번호정보를 업데이트합니다. - 유저
 *     tags: [users]
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: 바꿀비밀번호
 *               currentPassword:
 *                 type: string
 *                 description: 현재전화번호
 *     responses:
 *       200:
 *         description: 유저정보가 업데이트 되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 성공여부
 *                 message:
 *                   type: string
 *                   description: 성공여부
 *       404:
 *         description: 유저정보를 찾지 못했습니다.
 *       500:
 *         description: Some error happend
 */
userRouter.patch('/updatedPwd', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const userId = req.currentUserId;
    // update할 비밀번호
    const { password } = req.body;
    //현재 비밀번호
    const { currentPassword } = req.body;

    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { userId, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(password && { password }),
    };

    // 사용자 정보를 업데이트함.
    await userService.setUser(userInfoRequired, toUpdate);

    res.status(200).json({
      result: 'success',
      message: `${userId}유저는 비밀번호가 변경 되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: 유저정보를 업데이트합니다. -유저
 *     tags: [users]
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 이름
 *                 required: false
 *               email:
 *                 type: string
 *                 description: 이메일
 *                 required: false
 *               phoneNumber:
 *                 type: string
 *                 description: 전화번호
 *                 required: false
 *               role:
 *                 type: string
 *                 description: 권한
 *                 required: false
 *     responses:
 *       200:
 *         description: 유저정보가 업데이트 되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 *       404:
 *         description: 유저정보를 찾지 못했습니다.
 *       500:
 *         description: Some error happend
 */
userRouter.patch('/', loginRequired, async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // params로부터 id를 가져옴
    const userId = req.currentUserId;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { name } = req.body;
    const { email } = req.body;
    const { phoneNumber } = req.body;
    const { role } = req.body;

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name }),
      ...(email && { email }),
      ...(phoneNumber && { phoneNumber }),
      ...(role && { role }),
    };

    // 사용자 정보를 업데이트함.
    const updatedUserInfo = await userService.saveUserInfo(userId, toUpdate);

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: 유저정보를 삭제합니다.. - 유저
 *     tags: [users]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: 유저가 삭제되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 성공여부
 *                 message:
 *                   type: string
 *                   description: 성공여부
 *       404:
 *         description: 유저를 찾지 못했습니다.
 *
 */
userRouter.delete('/', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    await userService.deleteUserData(userId);

    // 사용자 정보를 JSON 형태로 프론트에 보냄
    res.status(200).json({
      result: 'success',
      message: `${userId}유저는 탈퇴처리 되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: 유저정보를 삭제합니다.- 관리자
 *     tags: [users]
 *     security:
 *       - JWT: []
 *       - IsAdmin: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 유저 id 고유값을 입력하세요.
 *     responses:
 *       204:
 *         description: 유저가 삭제되었습니다.
 *       404:
 *         description: 유저를 찾지 못했습니다.
 *
 */
userRouter.delete('/:userId', adminOnly, async (req, res, next) => {
  try {
    const { userId } = req.params;

    await userService.deleteUserData(userId);

    // 사용자 정보를 JSON 형태로 프론트에 보냄
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
export { userRouter };
