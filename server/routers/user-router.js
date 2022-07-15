import { Router } from 'express';
import is from '@sindresorhus/is';
import { userService } from '../services/index.js';
import { adminOnly, loginRequired } from '../middlewares/index.js';
/**
 * @swagger
 * tags:
 *   name: users
 *   description: 유저정보 API
 */

const userRouter = Router();

/**
 * @swagger
 * /api/user/users:
 *   get:
 *     summary: 모든 유저정보를 가져옵니다.
 *     tags: [users]
 *     responses:
 *       200:
 *         description: 모든 유저정보를 가져옵니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/users"
 */
userRouter.get('/users', async (req, res, next) => {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄

    console.log(users);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/user/{email}:
 *   get:
 *     summary: 이메일를 파라미터로 입력시 해당 유저정보를 가져옵니다.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: 유저 이메일를 입력하세요.
 *     responses:
 *       200:
 *         description: 해당 유저 정보를 가져옵니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 *       404:
 *         description: 이메일이 존재하지 않습니다.
 */
userRouter.get('/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    console.log(email);
    const checkResultMail = await userService.getUserMail(email);

    res.send(checkResultMail);
    if (!checkResultMail) {
      res.status(404).json({
        message: `${email}유저 정보가 존재하지 않습니다.`,
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/user/{userId}:
 *   patch:
 *     summary: 유저정보를 업데이트합니다.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 유저 id 고유값을 입력하세요.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
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
userRouter.patch('/:userId', async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // params로부터 id를 가져옴
    const { userId } = req.params;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { nickName } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { phoneNumber } = req.body;
    const { role } = req.body;

    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
    const { currentPassword } = req.body;

    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { userId, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(nickName && { nickName }),
      ...(email && { email }),
      ...(password && { password }),
      ...(phoneNumber && { phoneNumber }),
      ...(role && { role }),
    };

    // 사용자 정보를 업데이트함.
    const updatedUserInfo = await userService.setUser(
      userInfoRequired,
      toUpdate,
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: 유저정보를 삭제합니다..
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 유저 id 고유값을 입력하세요.
 *     responses:
 *       200:
 *         description: 유저가 삭제되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 *       404:
 *         description: 유저를 찾지 못했습니다.
 *
 */
userRouter.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params;
    await userService.deleteUser(userId);

    // 사용자 정보를 JSON 형태로 프론트에 보냄
    res.status(200).json({
      message: `${userId}유저는 탈퇴처리 되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
});

export { userRouter };
