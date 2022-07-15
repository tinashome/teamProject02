import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
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
