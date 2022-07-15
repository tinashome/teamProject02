import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import HeaderButton from '../atoms/HeaderButton';
import Button from '../atoms/Button';
import Logo from '../atoms/Logo';

const Header = () => (
  <Container>
    <NavLink to='/'>
      <Logo>풋살예약닷컴</Logo>
    </NavLink>
    <ButtonContainer>
      <HeaderButton>구장 리스트</HeaderButton>
      <HeaderButton>문의 게시판</HeaderButton>
      <HeaderButton>공지사항</HeaderButton>
      <NavLink to='/login'>
        <Button>로그인</Button>
      </NavLink>
    </ButtonContainer>
  </Container>
);

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 120px;
  background: #ffffff;
`;

const ButtonContainer = styled.div``;

export default Header;
