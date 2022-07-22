import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ground from 'pages/Ground';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Admin from '../pages/Admin/Admin';
import GlobalLayout from './GlobalLayout';
import MyPage from '../pages/MyPage';
import UserInformation from '../pages/UserInformation';
import PasswordChange from '../pages/PasswordChange';
import UserInfoChange from '../pages/UserInfoChange';
import UnRegister from '../pages/UnRegister';
import RentalManagement from '../pages/RentalManagement';
import PointCharge from '../pages/PointCharge';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/grounds/:id' element={<Ground />} />
        <Route path='/pointCharge' element={<PointCharge />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/myinfo' element={<MyPage />}>
          <Route path='' element={<UserInformation />} />
          <Route path='change' element={<UserInfoChange />} />
          <Route path='password' element={<PasswordChange />} />
          <Route path='withdrawal' element={<UnRegister />} />
          <Route path='rental' element={<RentalManagement />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
