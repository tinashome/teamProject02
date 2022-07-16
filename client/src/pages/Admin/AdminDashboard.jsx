// 관리자페이지 메뉴0 대쉬보드 AdminDashboard
/* eslint-disable no-console */

import React, { useState } from 'react';
import ContentLargetxt from 'components/atoms/ContentLargetxt';
import styled from 'styled-components';
import axios from 'axios';

const AdminDashboard = () => {
  const [role, setRole] = useState(false);

  const signin = () => {
    axios
      .post('https://futsal-api-elice.herokuapp.com/api/auth/signin', {
        email: 'admin@gmail.com',
        password: '1234',
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        console.log(res.data);
      });

    setRole(localStorage.getItem('token'));
  };

  return (
    <ContentLargetxt>
      관리자 페이지
      <br />
      첫화면
      <br />
      admin:{role ? '로그인완료' : '로그인전'}
      <br />
      <Button onClick={signin}>관리자로그인</Button>
    </ContentLargetxt>
  );
};

const Button = styled.button`
  // width: 80px;
  // height: 50px;
  padding: 5px 10px;
  margin-top: 20px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  text-align: center;
  font-size: 25px;
`;

export default AdminDashboard;
