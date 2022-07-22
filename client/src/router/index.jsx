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

// Route-based Code Splitting
const Ground = lazy(() => import('pages/Ground'));
const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const SignUp = lazy(() => import('pages/SignUp'));
const Admin = lazy(() => import('pages/Admin/Admin'));
const PointCharge = lazy(() => import('pages/PointCharge'));
const MyPage = lazy(() => import('pages/MyPage'));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/grounds/:id' element={<Ground />} />
          <Route path='/pointCharge' element={<PointCharge />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/myinfo' element={<MyPage />}>
            <Route path='' element={<RentalManagement />} />
            <Route path='change' element={<UserInfoChange />} />
            <Route path='password' element={<PasswordChange />} />
            <Route path='withdrawal' element={<UnRegister />} />
            <Route path='point' element={<UserPointHistory />} />
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
