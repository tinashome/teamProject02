import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ground from 'pages/Ground';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Admin from '../pages/Admin';
import GlobalLayout from './GlobalLayout';
import MyPage from '../pages/MyPage';
import PasswordChange from '../pages/PasswordChange';
import UserInfoChange from '../pages/UserInfoChange';
import UnRegister from '../pages/UnRegister';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ground' element={<Ground />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/myinfo' element={<MyPage />}>
          <Route path='' element={<UserInfoChange />} />
          <Route path='password' element={<PasswordChange />} />
          <Route path='user' element={<UnRegister />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
