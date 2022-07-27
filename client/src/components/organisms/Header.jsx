import React, { useEffect } from 'react';
import * as Api from 'api/api';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaFutbol } from '@react-icons/all-files/fa/FaFutbol';
import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';

import { useRecoilState } from 'recoil';
import { userPointState, userState } from 'stores/userStore';
import { addCommas, isExistToken } from 'util/useful-functions';
import HeaderButton from '../atoms/HeaderButton';
import Button from '../atoms/Button';
import Logo from '../atoms/Logo';

const Header = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [user, setUser] = useRecoilState(userState);
  const [totalPoint, setTotalPoint] = useRecoilState(userPointState);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getUserData = async () => {
    try {
      const result = await Api.get('users/user');
      const { _id, email, name, role, isOAuth } = result.data;
      setUser({
        userId: _id,
        email,
        name,
        role,
        isOAuth,
      });
      setTotalPoint((prev) => ({
        ...prev,
        totalPoint: result.data.totalPoint,
      }));
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  useEffect(() => {
    getUserData();
  }, [totalPoint.isChange]);

  useEffect(() => {
    setTotalPoint((prev) => ({ ...prev, isChange: false }));
  }, [totalPoint.totalPoint]);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [params]);

  return (
    <Container>
      <NavLink to='/'>
        <Logo>
          <FaFutbol />
          <LogoTitle>풋살예약닷컴</LogoTitle>
        </Logo>
      </NavLink>
      <ButtonContainer>
        <Link to='/pointcharge'>
          <HeaderButton>포인트 충전</HeaderButton>
        </Link>
        <Link to='/board'>
          <HeaderButton>자유 게시판</HeaderButton>
        </Link>

        {isExistToken() ? (
          <UserProfile>
            <FaUserCircle style={{ width: 40, height: 40, marginRight: 10 }} />
            <div>
              <span style={{ fontWeight: 700 }}>보유 포인트 </span>
              {addCommas(totalPoint?.totalPoint)}P
              <UserProfileButtonWrapper>
                <UserProfileButton>
                  {user?.role === 'admin' ? (
                    <NavLink to='/admin'>관리자 페이지</NavLink>
                  ) : (
                    <NavLink to='/myinfo'>마이 페이지</NavLink>
                  )}
                </UserProfileButton>
                <UserProfileButton onClick={handleLogout}>
                  로그아웃
                </UserProfileButton>
              </UserProfileButtonWrapper>
            </div>
          </UserProfile>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 120px;
  background: #ffffff;
  z-index: 99;
  border-bottom: 1px solid #e9ecef;
`;

const LogoTitle = styled.p`
  align-self: center;
  padding: 0 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
`;

const UserProfile = styled.div`
  display: flex;
  p {
    font-size: 1.1rem;
  }
`;

const UserProfileButton = styled.button`
  font-size: 0.85rem;
  font-weight: 600;
  color: #3563e9;
`;

const UserProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 8rem;
`;

const LoginButton = styled(Button)`
  /* margin-left: 2rem; */
`;

export default Header;
