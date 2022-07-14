/**
 * @swagger
 * definitions:
 *   users:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: "string"
 *         description: objectId 값
 *       email:
 *         type: "string"
 *         description: 이메일 주소
 *       name:
 *         type: "string"
 *         description: 이름
 *       password:
 *         type: "string"
 *         description: 비밀번호
 *       nickName:
 *         type: "string"
 *         description: 닉네임
 *       phoneNumber:
 *         type: "string"
 *         description: 전화번호
 *       role:
 *         type: string
 *         description: basic-user, admin 삽입
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
/**
 * @swagger
 * definitions:
 *   registerSchema:
 *     type: "object"
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
 *
 */
