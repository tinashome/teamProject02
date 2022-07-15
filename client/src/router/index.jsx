import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Admin from '../pages/Admin';
import GlobalLayout from './GlobalLayout';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<Admin />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
