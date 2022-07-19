import React from 'react';
import styled from 'styled-components';
import { adminContentState } from 'stores/adminUserStore';
import { useRecoilState } from 'recoil';

import AdminDeleteMember from './AdminDeleteUser';
import AdminAddGround from './AdminAddGround';
import AdminEditGround from './AdminEditGround';
import AdminDeleteGround from './AdminDeleteGround';

import {
  AdminReservations,
  AdminDeleteReservations,
  AdminPayment,
} from './AdminPages';

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
            // setContent(['경기장 수정', <AdminEditGround />]);
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
  font-weight: 700;
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

// AdminSidemenu 관리자페이지의 왼쪽 메뉴바 컴포넌트
export default AdminSidemenu;
