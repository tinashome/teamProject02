import { errorHandler } from './middlewares/index.js';
import {
  userRouter,
  uploadRouter,
  bannerRouter,
  authRouter,
  pointRouter,
  groundRouter,
  rentalRouter,
  mailRouter,
  boardRouter,
} from './routers/index.js';

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cookieParser from 'cookie-parser';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '풋닷컴 API',
      version: '1.0.0',
      description: '풋닷컴 Library API입니다.',
    },
    components: {
      securitySchemes: {
        JWT: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            '해당 토큰 안에는 role,userId,isOAtuth,name 가 주어집니다. ',
        },
        IsAdmin: {
          type: 'apiKey',
          in: 'header',
          name: 'isAdmin',
          description: 'admin인지 true, false 값을 로그인시 얻게됩니다. ',
        },
      },
    },
    schemes: ['http', 'https'], // 가능
    //'https://futsal-api-elice.herokuapp.com/',
    //'http://localhost:5000/'
    servers: [
      {
        url: 'https://futsal-api-elice.herokuapp.com/',
      },
    ],
  },
  apis: ['./routers/*.js', './db/schemas/*.js'],
};

const specs = swaggerJSDoc(options);
const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
// CORS 에러 방지

app.use(cors());
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
//로그(log)를 관리하기 위한 별도의 서드파티 라이브러리
app.use(morgan('dev'));
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser('secreatofTeam4'));

// 정적파일 서비스하기--박찬흠 추가
app.use('/uploads', express.static('uploads'));

// api 라우팅
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/banners', bannerRouter);
app.use('/api/auth', authRouter);
app.use('/api/grounds', groundRouter);
app.use('/api/points', pointRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/mail', mailRouter);
app.use('/api/boards', boardRouter);
app.use(errorHandler);

app.get('/', async function (req, res, next) {
  const http = `<h1>안녕하세요 여기를 누르세요</h1>
  <h2><a href="http://3.39.193.152:5000/api-docs/">풋닷컴 api주소</a></h2>
  `;
  res.send(http);
});
export { app };
