import { errorHandler } from "./middlewares/index.js";
import { userRouter, uploadRouter } from "./routers/index.js";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cookieParser from "cookie-parser";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "풋닷컴 API",
      version: "1.0.0",
      description: "풋닷컴 Library API입니다.",
    },
    servers: [
      {
        url: "https://futsal-api-elice.herokuapp.com/",
      },
    ],
  },
  apis: ["./routers/*.js", "./db/schemas/*.js"],
};

const specs = swaggerJSDoc(options);
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// CORS 에러 방지
app.use(
  cors({
    origin: "https://futsal-api-elice.herokuapp.com/",
    credentials: true,
  })
);
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
//로그(log)를 관리하기 위한 별도의 서드파티 라이브러리
app.use(morgan("dev"));
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser("secreatofTeam4"));

// 정적파일 서비스하기--박찬흠 추가
app.use("/uploads", express.static("uploads"));

// api 라우팅
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRouter);
app.use(errorHandler);

export { app };
