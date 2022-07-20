// 관리자페이지 메뉴0 대쉬보드 AdminDashboard
// 대쉬보드는 관리자페이지의 첫페이지이며 각종정보를 요약하여 표시할 예정입니다.
// 현재는 개발도중 필요한 기능들이 표시됩니다.

/* eslint-disable no-console */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminContentState } from 'stores/adminUserStore';
import * as Api from 'api/api';
import ContentLargetxt from 'components/atoms/ContentLargetxt';
import AdminDeleteGround from './AdminDeleteGround';

const AdminDashboard = () => {
  // const [users, setUsers] = useRecoilState(adminUsers);
  const [content, setContent] = useRecoilState(adminContentState);
  const [role, setRole] = useState(false);
  const newUsers = [];
  const newGround = [];
  setContent(['경기장 추가', <AdminDeleteGround />]);

  // 관리자로그인함수
  const signin = async (email, pass) => {
    try {
      const result = await Api.post('auth/signin', {
        email,
        password: pass,
      });
      const { token } = result.data;
      localStorage.setItem('token', token);
      setRole(localStorage.getItem('token'));
    } catch (err) {
      console.log(err);
    }
  };

  // 회원가입함수(테스트계정 일괄가입시 사용)
  const signup = (usersss) => {
    const { name, email, phoneNumber } = usersss;
    Api.post('auth/signup', {
      name,
      email,
      password: '1234',
      phoneNumber,
    }).then((res) => {
      console.log(res.data);
    });
  };

  // 경기장 등록함수(테스트경기장 일괄 등록시 사용)
  const addGround = async (ground) => {
    const {
      groundName,
      paymentPoint,
      groundImg,
      postalCode,
      address1,
      address2,
      groundSize,
      showerPlace,
      parking,
      shoesRental,
      sportswearRental,
      wayTo,
      parkingInfo,
      smoking,
      toilet,
      shoesRentallInfo,
      actInfo,
      startTime,
      endTime,
    } = ground;
    const newGroundData = {
      groundName,
      paymentPoint,
      groundImg,
      groundAddress: { postalCode, address1, address2 },
      groundSize,
      showerPlace,
      parking,
      shoesRental,
      sportswearRental,
      wayTo,
      parkingInfo,
      smoking,
      toilet,
      shoesRentallInfo,
      actInfo,
      startTime,
      endTime,
    };

    try {
      const result = await Api.post(`grounds`, newGroundData);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  // // 사용자목록조회 api요청
  // const getUsers = async () => {
  //   try {
  //     const result = await Api.get('users');
  //     setUsers(result.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   localStorage.getItem('token');
  //   setRole(localStorage.getItem('token'));
  // };

  // 유저목록 미리 로딩
  // useEffect(() => {
  //   // getUsers();
  // }, []);

  return (
    <ContentLargetxt>
      관리자 페이지
      <br />
      첫화면
      <br />
      admin:{role ? '로그인완료' : '로그인전'}
      <br />
      <Button
      // onClick={() => {
      //   console.log(users);
      // }}
      >
        {/* 유저목록출력
      </Button>
      <Button
        onClick={() => {
          signin('admin@gamil.com', '1234');
        }}
      > */}
        관리자로그인
      </Button>
      <Button
        onClick={() => {
          signin('user@gmail.com', '12341234');
        }}
      >
        사용자로그인
      </Button>
      <Button
        onClick={() => {
          signup(newUsers.map((e) => signup(e)));
        }}
      >{`테스트계정 ${newUsers.length}개 일괄생성`}</Button>
      <Button
        onClick={() => {
          signup(newGround.map((e) => signup(e)));
        }}
      >
        {`테스트경기장 ${newGround.length}개 일괄생성`}
      </Button>
    </ContentLargetxt>
  );
};

const Button = styled.button`
  // width: 80px;
  // height: 50px;
  padding: 5px 20px;
  margin-top: 10px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  text-align: center;
  font-size: 20px;
`;

export default AdminDashboard;
