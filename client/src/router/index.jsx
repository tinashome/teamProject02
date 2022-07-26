import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from 'pages/KakaoRedirectHandler';
import Spinner from 'components/atoms/Spinner';
import GlobalLayout from './GlobalLayout';
import PasswordChange from '../pages/PasswordChange';
import UserInfoChange from '../pages/UserInfoChange';
import UnRegister from '../pages/UnRegister';
import RentalManagement from '../pages/RentalManagement';
import UserPointHistory from '../pages/UserPointHistory';
import PrivateRoute from './PrivateRoute';

// Route-based Code Splitting
const Ground = lazy(() => import('pages/Ground'));
const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const SignUp = lazy(() => import('pages/SignUp'));
const Admin = lazy(() => import('pages/Admin/Admin'));
const PointCharge = lazy(() => import('pages/PointCharge'));
const MyPage = lazy(() => import('pages/MyPage'));
const Board = lazy(() => import('pages/Board/Board'));
const BoardDetail = lazy(() => import('pages/Board/BoardDetail'));
const BoardWrite = lazy(() => import('pages/Board/BoardWrite'));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* GlobalLayout -> Header + Footer */}
        <Route element={<GlobalLayout />}>
          {/* 인증 여부 상관없이 접속 가능한 페이지 정의 (비로그인) */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/grounds/:id' element={<Ground />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/board' element={<Board />} />
          <Route path='/pointCharge' element={<PointCharge />} />
          {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 (로그인) */}
          <Route element={<PrivateRoute />}>
            <Route path='/write' element={<BoardWrite />} />
            <Route path='/board/:boardId' element={<BoardDetail />} />
            <Route path='/myinfo' element={<MyPage />}>
              <Route path='' element={<RentalManagement />} />
              <Route path='change' element={<UserInfoChange />} />
              <Route path='password' element={<PasswordChange />} />
              <Route path='withdrawal' element={<UnRegister />} />
              <Route path='point' element={<UserPointHistory />} />
            </Route>
          </Route>
          {/* 관리자만 접근이 가능한 페이지 정의 */}
          <Route element={<PrivateRoute adminAuth />}>
            <Route path='/admin' element={<Admin />} />
          </Route>
        </Route>
        <Route
          path='/oauth/callback/kakao'
          element={<KakaoRedirectHandler />}
        />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Router;
