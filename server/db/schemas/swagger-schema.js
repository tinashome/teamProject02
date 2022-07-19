/**
 * @swagger
 * components:
 *  schemas:
 *   users:
 *     type: object
 *     required:
 *        - _id
 *        - email
 *        - password
 *     properties:
 *       _id:
 *         type: objectid
 *         description: primary key
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
 *       isDeleted:
 *         type: boolean
 *         description: 삭제여부
 *         required: false
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
 * components:
 *  schemas:
 *   banners:
 *     type: object
 *     required:
 *        - _id
 *        - title
 *        - imageUrl
 *     properties:
 *       _id:
 *         type: objectid
 *         description: primary key
 *       title:
 *         type: string
 *         description: 제목
 *         default: "null"
 *       imageUrl:
 *         type: string
 *         description: 이미지 url
 *       isDeleted:
 *         type: boolean
 *         description: 삭제여부
 *         required: false
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
 * components:
 *  schemas:
 *   rentals:
 *     type: object
 *     required:
 *        - _id
 *        - userId
 *        - groundId
 *        - reservationDate
 *        - reservationTime
 *     properties:
 *       _id:
 *         type: objectid
 *         description: primary key
 *       userId:
 *         type: object
 *         description: userObject입니다. poplutate용 생성이 userId값을 입력하세요.
 *         required: true
 *         properties:
 *           _id:
 *             type: objectid
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
 *           phoneNumber:
 *             type: string
 *             description: 전화번호
 *             required: false
 *           role:
 *             type: string
 *             description: basic-user, admin 넣기
 *             default: "basic-user"
 *             required: false
 *           isOAuth:
 *             type: boolean
 *             description: 카카오 권한 확인
 *             default: false
 *             required: false
 *           totalPoint:
 *             type: integer
 *             description: point를 가지고 있는 돈
 *             default: 0
 *             required: false
 *           createAt:
 *             type: "string"
 *             format: "date-time"
 *           updateAt:
 *             type: "string"
 *             format: "date-time"
 *       groundId:
 *         type: object
 *         description: groundObject입니다. poplutate용 생성이 groundId값을 입력하세요.
 *         required: true
 *         properties:
 *           _id:
 *             type: objectid
 *             description: primary key
 *           groundName:
 *             type: string
 *             description: 이름
 *             required: false
 *             default: "null"
 *           isBookedDate:
 *             type: array
 *             description: rental 생성시 추가 rental 종료시 삭제 ["날짜-시간","날짜-시간","날짜-시간",...]
 *             default: null
 *             required: false
 *           isBooked:
 *             type: boolean
 *             description: 예약 가능 여부
 *             default: false
 *             required: false
 *           paymentPoint:
 *             type: integer
 *             description: 구장 포인트
 *             default: false
 *             required: false
 *       userName:
 *         type: string
 *         description: 예약한 유저이름
 *       groundName:
 *         type: string
 *         description: 예약한 구장 이름
 *         required: true
 *       reservationDate:
 *         type: string
 *         description: 예약날짜
 *         required: true
 *       reservationTime:
 *         type: string
 *         description: 예약시간
 *         required: true
 *       isBooked:
 *         type: boolean
 *         description: 예약여부
 *         required: false
 *         default: true
 *       isDeleted:
 *         type: boolean
 *         description: 삭제여부
 *         required: false
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
 * components:
 *  schemas:
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
 *         type: "object"
 *         required: true
 *         properties:
 *           id:
 *             type: "string"
 *             description: 유저id
 *           email:
 *             type: "string"
 *             description: 이메일
 *           name:
 *             type: "string"
 *             description: 이름
 *       paymentOption:
 *         type: boolean
 *         description: 페이옵션
 *         required: true
 *       paymentAmount:
 *         type: integer
 *         description: 요금
 *         required: true
 *       isCharged:
 *         type: string
 *         description: 충전 됬는지 여부
 *         required: true
 *       isDeleted:
 *         type: boolean
 *         description: 삭제여부
 *         required: false
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
 * components:
 *  schemas:
 *   grounds:
 *     type: object
 *     description: 구장 정보.
 *     required:
 *        - _id
 *        - groundName
 *        - paymentPoint
 *        - groundAddress
 *     properties:
 *           _id:
 *             type: objectid
 *             description: primary key
 *           groundName:
 *             type: string
 *             description: 이름
 *             required: false
 *             default: "null"
 *           paymentPoint:
 *             type: integer
 *             description: 요금
 *             required: true
 *           groundImg:
 *             type: array
 *             description: 이미지 url 배열
 *             required: false
 *           groundAddress:
 *             type: "object"
 *             required: true
 *             properties:
 *               postalCode:
 *                 type: "string"
 *                 description: 주소번호
 *               address1:
 *                 type: "string"
 *                 description: 주소
 *               address2:
 *                 type: "string"
 *                 description: 주소상세
 *           groundSize:
 *             type: string
 *             description: 구장크기
 *             required: false
 *             default: null
 *           showerPlace:
 *             type: boolean
 *             description: 샤워 가능 여부
 *             default: false
 *             required: false
 *           startTime:
 *             type: string
 *             description: 매장 시작 시간
 *             default: '0700'
 *             required: false
 *           endTime:
 *             type: string
 *             description: 매장 종료 시간
 *             default: '2200'
 *             required: false
 *           shoesRentallInfo:
 *             type: string
 *             description: 신발 대여 정보
 *             default: false
 *             required: null
 *           actInfo:
 *             type: string
 *             description: 기타정보
 *             default: false
 *             required: null
 *           parking:
 *             type: boolean
 *             description: 파킹 가능 여부
 *             default: false
 *             required: false
 *           shoesRental:
 *             type: boolean
 *             description: 신발 가능 여부
 *             default: false
 *             required: false
 *           sportswearRental:
 *             type: boolean
 *             description: 옷 가능 여부
 *             default: false
 *             required: false
 *           wayTo:
 *             type: string
 *             description: 가는길
 *             default: null
 *             required: false
 *           parkingInfo:
 *             type: string
 *             description: 주차 정보
 *             default: null
 *             required: false
 *           smoking:
 *             type: string
 *             description: 담배 여부
 *             default: null
 *             required: false
 *           isBookedDate:
 *             type: array
 *             description: rental 생성시 추가 rental 종료시 삭제 ["날짜-시간","날짜-시간","날짜-시간",...]
 *             default: []
 *             required: false
 *           isBooked:
 *             type: boolean
 *             description: 예약 가능 여부
 *             default: false
 *             required: false
 *           createAt:
 *             type: "string"
 *             format: "date-time"
 *           updateAt:
 *             type: "string"
 *             format: "date-time"
 *
 */

/**
 *    테스트
 *           _id:
 *             type: objectid
 *             description: primary key
 *           groundName:
 *             type: string
 *             description: 이름
 *             required: false
 *             default: "null"
 *           paymentPoint:
 *             type: integer
 *             description: 요금
 *             required: true
 *           groundImg:
 *             type: array
 *             description: 이미지 url 배열
 *             required: false
 *           groundAddress:
 *             type: Schema
 *             description: 주소넣기
 *             properties:
 *               postalCode:
 *                 type: string
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *             required: true
 *           groundSize:
 *             type: string
 *             description: 구장크기
 *             required: false
 *             default: null
 *           showerPlace:
 *             type: boolean
 *             description: 샤워 가능 여부
 *             default: false
 *             required: false
 *           parking:
 *             type: boolean
 *             description: 파킹 가능 여부
 *             default: false
 *             required: false
 *           shoesRental:
 *             type: boolean
 *             description: 신발 가능 여부
 *             default: false
 *             required: false
 *           sportswearRental:
 *             type: boolean
 *             description: 옷 가능 여부
 *             default: false
 *             required: false
 *           wayTo:
 *             type: string
 *             description: 가는길
 *             default: null
 *             required: false
 *           parkingInfo:
 *             type: string
 *             description: 주차 정보
 *             default: null
 *             required: false
 *           smoking:
 *             type: string
 *             description: 담배 여부
 *             default: null
 *             required: false
 *           isBookedDate:
 *             type: array
 *             description: rental 생성시 추가 rental 종료시 삭제 ["날짜-시간","날짜-시간","날짜-시간",...]
 *             default: null
 *             required: false
 *           isBooked:
 *             type: boolean
 *             description: 예약 가능 여부
 *             default: false
 *             required: false
 *           createAt:
 *             type: "string"
 *             format: "date-time"
 *           updateAt:
 *             type: "string"
 *             format: "date-time"
 */
