import { Router } from 'express';

import {
  setMail,
  getCodebyMail,
  sendMail,
  verifyCode,
  userService,
} from '../services/index.js';

const mailRouter = Router();

/**
 * @swagger
 * tags:
 *   name: mail
 *   description: 메일전송 정보 API -요청시 3분동안만 가능합니다!
 */

/**
 * @swagger
 * /api/mail:
 *   post:
 *     summary: 메일전송 정보를 생성합니다.
 *     tags: [mail]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 description: 이메일 주소
 *                 required: true
 *     responses:
 *       200:
 *         description: 반환 값으로  성공 여부를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 성공여부
 */
mailRouter.post('/', async (req, res, next) => {
  const { mail } = req.body;
  try {
    const code = await setMail(mail);
    if (!code) {
      throw new Error('code 생성이 안되었습니다.');
    }
    await sendMail(mail, code);
    res.status(200).json({
      result: 'success',
    });
    // 성공
    // res.status(200).json({
    //   mail: mail,
    //   code: code,
    // });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/mail/check-mail:
 *   post:
 *     summary: 이메일이 있는지 확인 후 이메일 인증 코드를 전송합니다.
 *     tags: [mail]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 description: 이메일 주소
 *                 required: true
 *     responses:
 *       200:
 *         description: 반환 값으로 성공 여부를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 성공여부
 *                 userId:
 *                   type: string
 *                   description: 유저 id 값
 */
mailRouter.post('/check-mail', async (req, res, next) => {
  const { mail } = req.body;
  try {
    // 이메일 확인 여부
    const resultEmail = await userService.getUserMail(mail);
    // console.log(resultEmail);

    if (!resultEmail) {
      throw new Error('이메일이 존재하지 않습니다.');
    }
    const code = await setMail(mail);
    if (!code) {
      throw new Error('code 생성이 안되었습니다.');
    }
    await sendMail(mail, code);
    res.status(200).json({
      result: 'success',
      userId: resultEmail._id,
    });

    // // 성공
    // res.send(resultEmail._id);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/mail/check-code:
 *   post:
 *     summary: 메일전송 정보를 확인한 후 메일전송 성공 여부를 반환합니다.
 *     tags: [mail]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 descripticoden: 코드확인-사용자 입력하기
 *                 required: true
 *               mail:
 *                 type: string
 *                 description: 이메일 주소 재확인-보내주세요!
 *                 required: true
 *     responses:
 *       200:
 *         description: 반환 값으로 성공여부와 메시지를 반환합니다.
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
 *                   description: 이유 설명
 */
mailRouter.post('/check-code', async (req, res, next) => {
  try {
    const { mail, code } = req.body;

    const getCode = await getCodebyMail(mail);
    if (!getCode) {
      throw new Error(`${mail}의 code가 존재하지 않습니다.`);
    }
    const result = await verifyCode(code, getCode);

    res.send(result);
  } catch (error) {
    next(error);
  }
});

// function getCache(key, cb) {
//   return new Promise((resolve, reject) => {
//     redisClient.get(key, async (error, data) => {
//       if (error) next(error);
//       if (data != null) {
//         return res.json(JSON.parse(data));
//       } else {
//         const result = {
//           message: `유효기간이 다 지났습니다. 다시 인증해주세요.`,
//         };
//         return res.send(result);
//       }
//     });
//   });
// }
export { mailRouter };
