import { errorHandler } from './middlewares/index.js';
import { testRouter, userRouter } from './routers/index.js';

import cors from 'cors';
import express from 'express';

const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// 정적파일 서비스하기--박찬흠 추가
app.use('/uploads', express.static('uploads'));

// api 라우팅
app.use('/api', userRouter);
app.use('/api/test', testRouter);
app.use(errorHandler);

export { app };
