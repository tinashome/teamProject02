import React from 'react';
import styled from 'styled-components';
import { adminContentState, adminCurrentPage } from 'stores/adminUserStore';
import { useRecoilState } from 'recoil';

import AdminUserDelete from './AdminUserDelete';
import AdminGroundAdd from './AdminGroundAdd';
import AdminGroundList from './AdminGroundList';
import AdminPayment from './AdminPayment';
import AdminRentalList from './AdminRentalList';

const AdminSidemenu = () => {
  const [content, setContent] = useRecoilState(adminContentState);
  const [currentPage, setCurentPage] = useRecoilState(adminCurrentPage);
  return (
    <SideMenuWrapper>
      <SideMenuContainer>
        <SideMenuTitle>사용자 관리</SideMenuTitle>
        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['회원정보 삭제(탈퇴)', <AdminUserDelete />]);
          }}
        >
          회원 탈퇴
        </SideMenuLink>
      </SideMenuContainer>

      <SideMenuContainer>
        <SideMenuTitle>경기장 관리</SideMenuTitle>

        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['경기장 추가', <AdminGroundAdd />]);
          }}
        >
          경기장 추가
        </SideMenuLink>

        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['경기장 목록 조회', <AdminGroundList />]);
          }}
        >
          조회/수정/삭제
        </SideMenuLink>
      </SideMenuContainer>

      <SideMenuContainer>
        <SideMenuTitle>예약 관리</SideMenuTitle>

        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['예약상태 관리', <AdminRentalList />]);
          }}
        >
          예약조회/취소
        </SideMenuLink>

        {/* <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['예약상태 취소', <AdminDeleteReservations />]);
          }}
        >
          예약상태 취소
        </SideMenuLink> */}
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

export default AdminSidemenu;
