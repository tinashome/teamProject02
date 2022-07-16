import React from 'react';
import styled from 'styled-components';

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

// 관리자 페이지 content 컴포넌트
export {
  AdminAddGround,
  AdminEditGround,
  AdminDeleteGround,
  AdminReservations,
  AdminDeleteReservations,
  AdminPayment,
};
