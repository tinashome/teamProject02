import { Router } from 'express';

import { getFileStream, upload } from '../services/s3-service.js';

const uploadRouter = Router();
/**
 * @swagger
 * tags:
 *   name: images
 *   description: s3 이미지 연동
 */

uploadRouter.get('/images/:key', (req, res) => {
  const { key } = req.params;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

/**
 * @swagger
 * /api/upload/imageUpload:
 *   post:
 *     summary: 이미지를 s3로 업로드 합니다.
 *     tags: [images]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 반환 값으로 s3 url을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type: string
 */
uploadRouter.post(
  '/imageUpload',
  upload.single('image'),
  async (req, res, next) => {
    const { file } = req;
    console.log(file);
    if (!file) {
      next(error);
    } else {
      const success = {
        imageUrl: file.location,
      };
      res.send(success);
    }
  },
);

export { uploadRouter };
