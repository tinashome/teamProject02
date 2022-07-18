import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaFutbol, FaUserCircle } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import userState from 'stores/userStore';
import { getToken, isExistToken } from 'util/useful-functions';
import jwtDecode from 'jwt-decode';
import HeaderButton from '../atoms/HeaderButton';
import Button from '../atoms/Button';
import Logo from '../atoms/Logo';

const Header = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserInfo({
      isLogin: false,
    });
  };

  useEffect(() => {
    if (isExistToken()) {
      const { userId, name, role, isOAuth } = jwtDecode(getToken());
      setUserInfo({
        userId,
        name,
        role,
        isOAuth,
        isLogin: true,
      });
    }
  }, []);

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

        {userInfo.isLogin ? (
          <>
            {/* <UserImage /> */}
            {/* 임시로 넣은 유저 아이콘 */}
            <FaUserCircle style={{ width: 40, height: 40, marginRight: 10 }} />
            <UserProfile>
              <p>{userInfo?.name}님! 환영합니다.</p>
              <UserProfileButtonWrapper>
                <UserProfileButton>
                  {userInfo.role === 'admin' ? (
                    <NavLink to='/admin'>관리자 페이지</NavLink>
                  ) : (
                    <NavLink to='/myinfo'>마이 페이지</NavLink>
                  )}
                </UserProfileButton>
                <UserProfileButton onClick={handleLogout}>
                  로그아웃
                </UserProfileButton>
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
  align-items: center;
  width: 100%;
  padding: 30px 120px;
  background: #ffffff;
  z-index: 99;
  border-bottom: 1px solid #e9ecef;
`;

const LogoTitle = styled.p`
  align-content: center;
  padding: 0 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.1rem;
  }
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
  border: 1px solid red;
  border-radius: 50%;
`;

const UserProfileButton = styled.button`
  font-size: 0.85rem;
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
