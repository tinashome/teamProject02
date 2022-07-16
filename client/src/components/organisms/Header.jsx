import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaFutbol } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import userState from 'stores/userStore';
import HeaderButton from '../atoms/HeaderButton';
import Button from '../atoms/Button';
import Logo from '../atoms/Logo';

const Header = () => {
  const { userId, name, role, isOAuth, isAdmin } = useRecoilValue(userState);
  return (
    <Container>
      <NavLink to='/'>
        <Logo>
          <FaFutbol />
          <LogoTitle>풋살예약닷컴</LogoTitle>
        </Logo>
      </NavLink>
      <ButtonContainer>
        <HeaderButton>구장 리스트</HeaderButton>
        <HeaderButton>문의 게시판</HeaderButton>
        <HeaderButton>공지사항</HeaderButton>
        {userId ? (
          <>
            <UserImage />
            <UserProfile>
              <p>{name}님 환영합니다!</p>
              <UserProfileButtonWrapper>
                <UserProfileButton>마이 페이지</UserProfileButton>
                <UserProfileButton>로그아웃</UserProfileButton>
              </UserProfileButtonWrapper>
            </UserProfile>
          </>
        ) : (
          <NavLink to='/login'>
            <LoginButton>로그인</LoginButton>
          </NavLink>
        )}
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 120px;
  background: #ffffff;
  z-index: 99;
`;

const LogoTitle = styled.p``;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
  border: 1px solid red;
  border-radius: 50%;
`;

const UserProfileButton = styled.button`
  font-size: 0.9rem;
  font-weight: 600;
  color: #3563e9;
  margin-right: 0.3rem;
`;

const UserProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoginButton = styled(Button)`
  margin-left: 2rem;
`;

export default Header;
