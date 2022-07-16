import React from 'react';
import styled from 'styled-components';

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

export default AdminDashboard;
// 관리자페이지 메뉴0 대쉬보드 AdminDashboard
