import jwtDecode from 'jwt-decode';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from 'util/useful-functions';

const PrivateRoute = ({ adminAuth }) => {
  const token = getToken();
  // 어드민 인증이 필요한 페이지 (role 확인)
  if (token && adminAuth) {
    const { role } = jwtDecode(token);
    return role === 'admin' ? <Outlet /> : <Navigate to='/' />;
  }
  // 유저 인증이 필요한 페이지 (token 확인)
  return token ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
