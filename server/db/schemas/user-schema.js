import mongoose from "mongoose";

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
 *         required: false
 *         default: "null"
 *       email:
 *         type: string
 *         description: 이메일
 *         required: true
 *       password:
 *         type: string
 *         description: 비밀번호
 *         required: true
 *       phoneNumber:
 *         type: string
 *         description: 전화번호
 *         required: false
 *       role:
 *         type: string
 *         description: basic-user, admin 넣기
 *         default: "basic-user"
 *         required: false
 *       isOAuth:
 *         type: boolean
 *         description: 카카오 권한 확인
 *         default: false
 *         required: false
 *       totalPoint:
 *         type: intiger
 *         description: point를 가지고 있는 돈
 *         default: 0
 *         required: false
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
      required: false,
      default: null,
    },
    phoneNumber: {
      type: String,
      required: false,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "basic-user",
    },

    isOAuth: {
      type: Boolean,
      required: false,
      default: false,
    },
    totalPoint: {
      type: Boolean,
      required: false,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { UserSchema };
