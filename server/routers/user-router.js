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
 * /api/user/register:
 *   post:
 *     summary: 유저정보가 새로 생성됩니다.
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/registerSchema"
 *     responses:
 *       200:
 *         description: 유저정보가 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/users"
 */
userRouter.post('/register', async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const { nickName } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { phoneNumber } = req.body;
    const { name } = req.body;
    console.log(nickName);
    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      nickName,
      email,
      password,
      phoneNumber,
      name,
    });
    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/user/register/kakao:
 *   post:
 *     summary: 카카오 유저 정보가 새로 생성됩니다.
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: 유저정보가 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 */
userRouter.post('/register/kakao', async (req, res, next) => {
  try {
    const { nickName } = req.body;
    const { email } = req.body;
    const { phoneNumber } = req.body;
    const userInfo = {
      nickName,
      email,
      phoneNumber,
    };
    const newUser = await userService.addUserWithKakao(userInfo);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: 유저 정보가 새로 생성됩니다.
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: 유저정보가 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 */
userRouter.post('/login', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // req (request) 에서 데이터 가져오기
    const { email } = req.body;
    const { password } = req.body;

    // 로그인 진행 passport하기-작성
    const loginResult = await userService.getUerToken({
      email,
      password,
    });
    res.status(200).json(loginResult);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/user/login/kakao:
 *   post:
 *     summary: 카카오 유저 정보가 새로 생성됩니다.
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: 유저정보가 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 */
userRouter.post('/login/kakao', async function (req, res, next) {
  try {
    const email = req.body.email;

    const loginResult = await userService.getUserTokenWithKakao(email);

    res.status(200).json(loginResult);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     summary: 유저정보를 업데이트합니다.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
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
