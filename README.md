# 풋닷컴

### 공을 차고 싶을 땐 간편하게 풋살예약닷컴에서 예약하세요 😉

<br>

## :white_check_mark: 서비스 소개

#### ⚽️ 풋살장 예약 서비스

> 풋살장을 예약할 수 있습니다.

#### 💵 포인트 충전 기능

> 결제할 포인트를 충전할 수 있습니다.

<br>

## 🛠️ 기술 스택

# FE

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,react,styledcomponents" />
    <img width="50px" height="50px" src="https://cdn.discordapp.com/attachments/994130334604066837/996660977472905276/recoil_icon.png" />
  </a>
</p>

# BE

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,aws,redis" />
  </a>
</p>

# Common

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=figma,vscode,gitlab" />
  </a>
</p>

<br>

## 프로젝트 기간

</br>

### 2022.07.11 ~ 2022.07.29 ( 3주 )

<br>

# 📌 [프로젝트 구성도 - Notion](https://www.notion.so/b6d9bea8f4534057b45e9d4df673de82)

## 🔗 화면 흐름도

<p align="center">
  <img src="/image/flow.png" alt="text" width="number" />
</p>

</br></br>

## 🔗 [기능정의서](https://docs.google.com/spreadsheets/d/1yxnbhTdu6lL7A0aK_BEIDmrwFvcMAnj21aXOMwsH6tU/edit?usp=sharing)

</br></br>

## 🔗 [와이어프레임](https://www.figma.com/file/ZuJWF6GLUNvijzzkQmNvNT/%ED%92%8B%EC%82%B4%EC%9E%A5-%EC%98%88%EC%95%BD-%EC%84%9C%EB%B9%84%EC%8A%A4)

</br></br>

## 🔗 [API](https://glowing-angelfish-c5a.notion.site/API-94e393ca70d84c1a86c382da194558bf)

</br></br>

<br>

# 🚗 [주요 기능]

</br>

## 로그인

<p align="center">
  <img src="/image/login.gif" alt="text" width="number" />
</p>

<br>

### 1. 로그인 페이지에서 비밀번호찾기, 체험하기, 소셜 로그인, 기존 로그인을 할 수 있다.

</br></br>

## 회원가입

<p align="center">
  <img src="/image/signin.gif" alt="text" width="number" />
</p>

<br>

### 1. 회원가입 페이지에서 회원가입을 할 수 있다.

</br></br>

## 메인 페이지

<p align="center">
  <img src="/image/main.gif" alt="text" width="number" />
</p>

<br>

### 1. 다양한 풋살 경기장을 카드 형식과 리스트 형식으로 한눈에 볼 수 있습니다.

</br></br>

## 자유 게시판

<p align="center">
  <img src="/image/board.gif" alt="text" width="number" />
</p>

<br>

### 1. 자유 게시판 페이지에서 공지글과 자유글을 나눠서 확인 할 수 있다.

### 2. 게시글 생성, 수정, 삭제를 할 수 있다.

</br></br>

## 포인트 충전

<p align="center">
  <img src="/image/pointCharge.gif" alt="text" width="number" />
</p>

<br>

### 1. 포인터 충전 페이지에서 충전을 할 수 있습니다.

</br></br>

## 구장 상세 페이지(경기장 정보 조회 & 예약)

<p align="center">
  <img src="/image/rentals.gif" alt="text" width="number" />
</p>

<br>

### 1. 예약을 원하는 경기장을 선택하고, 해당 경기자으이 정보를 확인

### 2. 날짜 별로 예약 상태와 시간을 선택해서 경기장 예약을 합니다.

</br></br>

## 마이페이지

<p align="center">
  <img src="/image/mypage.gif" alt="text" width="number" />
</p>

<br>

### 1. 마이페이지에서 회원을 수정, 삭제, 탈퇴 등을 할 수 있다.

</br></br>

# 관리자

<br>

## 관리자 페이지1

<p align="center">
  <img src="/image/admin2.gif" alt="text" width="number" />
</p>

<br>

### 1. 관리자 페이지에서 사용자 관리, 경기장 관리

### 2. 구장 생성에서 이미지 업로드시 s3 서버를 통해 url의 값을 받고, 구장 생성 해당 값들을 DB에 저장하게 된다.

</br></br>

## 관리자 페이지2

<p align="center">
  <img src="/image/admin4.gif" alt="text" width="number" />
</p>

<br>

### 1. 관리자 페이지에서 예약 관리, 포인트 관리

</br></br>

## ⚙️ 프로젝트 구동 방법

우선 Repository clone 한다.

### 백엔드 환경변수 설정

back 폴더 아래 .env 파일 생성 후 내용 작성하기

- .env 예시

```javascript

  MONGODB_URL=[몽고 디비 클라우드]

JWT_SECRET_KEY = [jwt 비밀키]
AWS_BUCKET_NAME = [aws-s3 버킷 이름]
AWS_BUCKET_REGION =[aws-s3 지역]
AWS_ACCESS_KEY = [aws-s3 접근키]
AWS_SECRET_KEY = [aws-s3 비밀키]

REDIS_URL = [redis 설정을 위한 url]
EMAIL_CERTIFICATION_USER =[이메일 인증을 위한 유저값]
EMAIL_CERTIFICATION_PASS = [이메일 인증을 위한 비밀번호]

KAKAO_REST_API_KEY=[소셜로그인]
KAKAO_REDIRECT_URI=[소셜로그인]
```

### 백엔드 실행

back 폴더로 이동 후 실행

```
  cd server
  npm install
  npm start
```

### 프론트 실행

front 폴더로 이동 후 실행

```
  cd client
  npm install
  npm start #npm run start
```
