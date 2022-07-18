/**
 * @swagger
 * definitions:
 *   users:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: "objectid"
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
 *   createPoint:
 *     type: object
 *     required:
 *        - _id
 *        - paymentAmount
 *        - user
 *     properties:
 *       _id:
 *         type: objectid
 *         description: primary key
 *       user:
 *         _id:
 *           type: objectid
 *           description: primary key
 *       paymentOption:
 *         type: boolean
 *         description: 페이옵션
 *         required: true
 *       paymentAmount:
 *         type: string
 *         description: 요금
 *         required: true
 *       isCharged:
 *         type: string
 *         description: 충전 됬는지 여부
 *         required: true
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
 *   points:
 *     type: object
 *     required:
 *        - _id
 *        - paymentAmount
 *        - user
 *     properties:
 *       _id:
 *         type: objectid
 *         description: primary key
 *       user:
 *         type: object
 *         description: user입니다. poplutate용 생성이 userId값을 입력하세요.
 *         required: true
 *         properties:
 *           _id:
 *             type: string
 *             description: primary key
 *           name:
 *             type: string
 *             description: 이름
 *             required: false
 *             default: "null"
 *           email:
 *             type: string
 *             description: 이메일
 *             required: true
 *       paymentOption:
 *         type: boolean
 *         description: 페이옵션
 *         required: true
 *       paymentAmount:
 *         type: string
 *         description: 요금
 *         required: true
 *       isCharged:
 *         type: boolean
 *         description: 충전 됬는지 여부
 *         required: true
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
 *   grounds:
 *     type: "object"
 *     properties:
 *       groundName:
 *         type: "string"
 *         description: 구장이름
 *         required: true
 *       paymentPoint:
 *         type: integer
 *         description: 결제포인트
 *         required: true
 *       groundImg:
 *         type: array
 *         description: 이미지 배열
 *         default: []
 *       groundAddress:
 *           type: "object"
 *           required: true
 *           properties:
 *             postalCode:
 *               type: "string"
 *               description: 주소번호
 *             address1:
 *               type: "string"
 *               description: 주소
 *             address2:
 *               type: "string"
 *               description: 주소상세
 *       groundSize:
 *         type: string
 *         description: 경기장 크기
 *       showerPlace:
 *         type: boolean
 *         description: 샤워실
 *       parking:
 *         type: boolean
 *         description: 주차장
 *       shoesRental:
 *         type: boolean
 *         description: 운동복대여
 *       sportswearRental:
 *         type: boolean
 *         description: 풋살화대여
 *       wayTo:
 *         type: "string"
 *         description: 가는길
 *       parkingInfo:
 *         type: "string"
 *         description: 주차장정보
 *       smoking:
 *         type: "string"
 *         description: 흡연
 *       toilet:
 *         type: "string"
 *         description: 화장실
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

 *       phoneNumber:
 *         type: string
 *         description: 전화번호
 *
 */
