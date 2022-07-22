import React from 'react';
import ContentLargetxt from 'components/atoms/ContentLargetxt';

// 관리자페이지본문 메뉴5 예약상태관리(예약목록조회) AdminReservations
const AdminReservations = () => (
  <ContentLargetxt>
    관리자 페이지 <br /> 메뉴5 예약상태관리
  </ContentLargetxt>
);
// 관리자페이지본문 메뉴6 예약취소 AdminDeleteReservations
const AdminDeleteReservations = () => (
  <ContentLargetxt>
    관리자 페이지 <br /> 메뉴6 예약취소
  </ContentLargetxt>
);
// 관리자페이지본문 메뉴9 충전승인 AdminPayment
const AdminPayment = () => (
  <ContentLargetxt>
    관리자 페이지 <br /> 메뉴9 충전승인
  </ContentLargetxt>
);

// 관리자 페이지 content 컴포넌트
export { AdminReservations, AdminDeleteReservations, AdminPayment };
