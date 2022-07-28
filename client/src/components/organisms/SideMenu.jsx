import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SideMenu = () => (
  <Container>
    <SidemenuName>마이페이지</SidemenuName>
    <SideItem>
      <SideTitle>예약 관리</SideTitle>
      <SideList>
        <SideListItem>
          <NavLink to='/myinfo'>예약 조회</NavLink>
        </SideListItem>
      </SideList>
    </SideItem>
    <SideItem>
      <SideTitle>내 정보 관리</SideTitle>
      <SideList>
        <SideListItem>
          <NavLink to='/myinfo/password'>비밀번호 변경</NavLink>
        </SideListItem>
        <SideListItem>
          <NavLink to='/myinfo/change'>개인 정보 변경</NavLink>
        </SideListItem>
        <SideListItem>
          <NavLink to='/myinfo/withdrawal'>회원 탈퇴</NavLink>
        </SideListItem>
      </SideList>
    </SideItem>
    <SideItem>
      <SideTitle>포인트 충전</SideTitle>
      <SideList>
        <SideListItem>
          <NavLink to='/pointCharge'>포인트 충전</NavLink>
        </SideListItem>
        <SideListItem>
          <NavLink to='/myinfo/point'>포인트 충전 내역</NavLink>
        </SideListItem>
      </SideList>
    </SideItem>
  </Container>
);

const Container = styled.div`
  flex: 1;
  height: 100vh;
`;

const SidemenuName = styled.div`
  display: flex;
  justify-content: space-around;
  line-height: 3rem;
  margin: 1.25rem 0 1.25rem;
  align-items: center;
  color: #000000;
  font-style: normal;
  font-weight: 800;
  font-size: 2rem;
  letter-spacing: -0.0625rem;
  text-align: center;
`;

const SideItem = styled.div`
  margin-bottom: 2rem;
`;

const SideTitle = styled.div`
  display: flex;
  flex-direction: row-reverse;
  line-height: 1.8125rem;
  padding: 1rem 1.875rem 1rem 0;
  border-top: 0.0625rem solid black;
  align-items: center;
  color: #000000;
  font-style: normal;
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.0625rem;
  text-align: right;
`;

const SideList = styled.div`
  padding: 0 1.875rem 0 0;
`;

const SideListItem = styled.div`
  display: flex;
  flex-direction: row-reverse;
  line-height: 1.5rem;
  margin: 0 0 0.625rem auto;
  align-items: center;
  color: #000000;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  letter-spacing: -0.0625rem;
  text-align: right;
`;

export default SideMenu;
