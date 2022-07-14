import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ground from 'pages/Ground';
import Home from 'pages/Home';
import Login from 'pages/Login';
import GlobalLayout from 'router/GlobalLayout';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ground' element={<Ground />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
