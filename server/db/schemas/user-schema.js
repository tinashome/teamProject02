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
 *         required: true
 *       email:
 *         type: string
 *         description: 이메일
 *         required: true
 *       password:
 *         type: string
 *         description: 비밀번호
 *         required: true
 *       nickName:
 *         type: string
 *         description: 닉네임
 *         required: true
 *       phoneNumber:
 *         type: string
 *         description: 전화번호
 *       role:
 *         type: string
 *         description: basic-user, admin 넣기
 *         default: "basic-user"
 *       isOAuth:
 *         type: boolean
 *         description: 카카오 권한 확인
 *         default: false
 *       createAt:
 *         type: "string"
 *         format: "date-time"
 *       updateAt:
 *         type: "string"
 *         format: "date-time"
 *
 */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
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
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },

    isOAuth: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
