import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *   users:
 *     type: object
 *     required:
 *        - email
 *        - password
 *     properties:
 *       name:
 *         type: string
 *         description: 이름
 *       email:
 *         type: string
 *         description: 이메일
 *       password:
 *         type: string
 *         description: 비밀번호
 *       nickName:
 *         type: string
 *         description: 닉네임
 *       phoneNumber:
 *         type: integer
 *         description: 전화번호
 *       role:
 *         type: array
 *         description: 사용자, 관리자 권한
 *
 */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
