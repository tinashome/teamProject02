import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { adminContentState } from 'stores/store';
import { useRecoilState } from 'recoil';
import userDataMock from 'api/userDataMock';

const Admin = () => {
  const [content, setContent] = useRecoilState(adminContentState);
  useEffect(() => {
    setContent(['관리자 페이지', <AdminDashboard />]);
    // setContent(['관리자 페이지', <AdminDeleteMember />]);
  }, []);
  return (
    <AdminPageWrapper>
      <AdminSidemenu />
      <AdminPageContentContainer>
        <AdminPageContentTitleBox>{content[0]}</AdminPageContentTitleBox>
        <AdminPageContentBox>{content[1]}</AdminPageContentBox>
      </AdminPageContentContainer>
    </AdminPageWrapper>
  );
};

const AdminPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  letter-spacing: -1px;
`;

const AdminPageContentContainer = styled.div`
  width: 770px;
  margin: 0 100px;
`;

const AdminPageContentTitleBox = styled.div`
  text-align: center;
  padding: 30px 50px;
  font-size: 40px;
  font-weight: 800;
`;

const AdminPageContentBox = styled.div`
  // height: auto;
  height: 100%;
`;

export default Admin;

// AdminSidemenu 관리자페이지의 왼쪽 메뉴바 컴포넌트

const AdminSidemenu = () => {
  const [content, setContent] = useRecoilState(adminContentState);
  return (
    <SideMenuWrapper>
      <SideMenuContainer>
        <SideMenuTitle>사용자 관리</SideMenuTitle>
        <SideMenuLink
          onClick={() => {
            setContent(['회원 탈퇴', <AdminDeleteMember />]);
          }}
        >
          회원 탈퇴
        </SideMenuLink>
      </SideMenuContainer>
      <SideMenuContainer>
        <SideMenuTitle>경기장 관리</SideMenuTitle>
        <SideMenuLink
          onClick={() => {
            setContent(['경기장 추가', <AdminAddGround />]);
          }}
        >
          경기장 추가
        </SideMenuLink>
        <SideMenuLink
          onClick={() => {
            setContent(['경기장 수정', <AdminEditGround />]);
          }}
        >
          경기장 수정
        </SideMenuLink>
        <SideMenuLink
          onClick={() => {
            setContent(['경기장 삭제', <AdminDeleteGround />]);
          }}
        >
          경기장 삭제
        </SideMenuLink>
      </SideMenuContainer>
      <SideMenuContainer>
        <SideMenuTitle>예약 관리</SideMenuTitle>
        <SideMenuLink
          onClick={() => {
            setContent(['예약상태 관리', <AdminReservations />]);
          }}
        >
          예약상태 관리
        </SideMenuLink>
        <SideMenuLink
          onClick={() => {
            setContent(['예약상태 취소', <AdminDeleteReservations />]);
          }}
        >
          예약상태 취소
        </SideMenuLink>
      </SideMenuContainer>
      <SideMenuContainer>
        <SideMenuTitle>포인트 관리</SideMenuTitle>
        <SideMenuLink
          onClick={() => {
            setContent(['충전 관리', <AdminPayment />]);
          }}
        >
          포인트 충전 관리
        </SideMenuLink>
      </SideMenuContainer>
    </SideMenuWrapper>
  );
};

const SideMenuWrapper = styled.div`
  padding-top: 100px;
  text-align: right;
`;

const SideMenuContainer = styled.div`
  width: 220px;
  padding: 0 20px 10px 0px;
  border-bottom: 1px solid #bdbdbd;
  text-align: right;
  align-items: flex-end;
`;

const SideMenuTitle = styled.div`
  width: 200px;
  height: 50px;
  padding-top: 10px;
  font-size: 24px;
  font-weight: 800;
`;

const SideMenuLink = styled.button`
  display: flex;
  height: 32px;
  right: 0;
  margin: 0 0 0 auto;
  font-size: 20px;
  font-weight: 400;
  pointer: cursor;
`;

// 관리자 페이지 content 컴포넌트
// 관리자페이지 메뉴0 대쉬보드 AdminDashboard

const AdminDashboard = () => (
  <Dashboard>
    관리자 페이지
    <br />
    첫화면
  </Dashboard>
);

const Dashboard = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 80%;
  font-size: 80px;
  font-weight: 600;
  text-align: center;
  align-content: center;
  justify-content: center;
`;

// 관리자페이지본문 메뉴1 회원탈퇴 AdminDeleteMember

// const Url =
//   'https://cors-anywhere.herokuapp.com/https://futsal-api-elice.herokuapp.com/api/user/users';

const AdminDeleteMember = () => {
  const [users, setUsers] = useState('');
  // useEffect(() => {
  //   axios
  //     .get(Url)
  //     .then((res) => setUsers(res.data))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <TitleRow>
        <Text>이메일</Text>
        <Text>이름</Text>
        <Text>닉네임</Text>
        <Text>연락처</Text>
        <Text>삭제(탈퇴)</Text>
      </TitleRow>
      {userDataMock.map((e) => (
        <Row key={e.id}>
          <Text>{e.email}</Text>
          <Text>{e.name}</Text>
          <Text>{e.nickName}</Text>
          <Text>{e.phoneNumber}</Text>
          <Text>
            <Button>회원삭제</Button>
          </Text>
        </Row>
      ))}
    </>
  );
};

const TitleRow = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 2px solid black;
  font-weight: 600;
  font-size: 20px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-bottom: 1px solid #bdbdbd;
  justify-content: space-between;
`;
const Text = styled.p`
  display: flex;
  width: 150px;
  height: 24px;
  letter-spacing: 0.5px;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  font-size: 16px;
`;
// 관리자페이지본문 메뉴2 경기장추가 AdminAddGround
const AdminAddGround = () => (
  <Dashboard>
    관리자 페이지 <br /> 메뉴2 경기장추가
  </Dashboard>
);
// 관리자페이지본문 메뉴3 경기장수정 AdminEditGround
const AdminEditGround = () => (
  <Dashboard>
    관리자 페이지 <br /> 메뉴3 경기장수정
  </Dashboard>
);
// 관리자페이지본문 메뉴4 경기장삭제 AdminDeleteGround
const AdminDeleteGround = () => (
  <Dashboard>
    관리자 페이지 <br /> 메뉴4 경기장삭제
  </Dashboard>
);
// 관리자페이지본문 메뉴5 예약상태관리(예약목록조회) AdminReservations
const AdminReservations = () => (
  <Dashboard>
    관리자 페이지 <br /> 메뉴5 예약상태관리
  </Dashboard>
);
// 관리자페이지본문 메뉴6 예약취소 AdminDeleteReservations
const AdminDeleteReservations = () => (
  <Dashboard>
    관리자 페이지 <br /> 메뉴6 예약취소
  </Dashboard>
);
// 관리자페이지본문 메뉴9 충전승인 AdminPayment
const AdminPayment = () => (
  <Dashboard>
    관리자 페이지 <br /> 메뉴9 충전승인
  </Dashboard>
);
