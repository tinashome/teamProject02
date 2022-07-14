import { Router } from "express";

import { getFileStream, upload } from "../services/s3-service.js";

const uploadRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   images:
 *     type: object
 *     properties:
 *       image:
 *         type: string
 *         format: binary
 *
 */

uploadRouter.get("/images/:key", (req, res) => {
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
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 반환 값으로 s3 url을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/images'
 */
uploadRouter.post(
  "/imageUpload",
  upload.single("image"),
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
  }
);

export { uploadRouter };
