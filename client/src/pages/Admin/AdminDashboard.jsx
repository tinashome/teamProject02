// 관리자페이지 메뉴0 대쉬보드 AdminDashboard
/* eslint-disable no-console */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminUsers } from 'stores/adminStore';
import * as Api from 'api/api';
import ContentLargetxt from 'components/atoms/ContentLargetxt';

const AdminDashboard = () => {
  const [users, setUsers] = useRecoilState(adminUsers);
  const [role, setRole] = useState(false);

  const signin = async () => {
    try {
      const result = await Api.post('auth/signin', {
        email: 'admin@gmail.com',
        password: '1234',
      });
      const { token } = result.data;
      localStorage.setItem('token', token);
      setRole(localStorage.getItem('token'));
    } catch (err) {
      console.log(err);
    }
  };
  const signup = () => {
    Api.post('auth/signup', {
      name: '관리자',
      email: 'admin@gmail.com',
      password: '1234',
      phoneNumber: '0100001234',
    }).then((res) => {
      console.log(res.data);
    });
  };

  const getUsers = async () => {
    // 사용자목록조회 api요청
    try {
      const result = await Api.get('users');
      setUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 유저목록 미리 로딩
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ContentLargetxt>
      관리자 페이지
      <br />
      첫화면
      <br />
      admin:{role ? '로그인완료' : '로그인전'}
      <br />
      <Button
        onClick={() => {
          console.log(users);
        }}
      >
        관리자가입
      </Button>
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
