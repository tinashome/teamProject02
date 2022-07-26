import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as Api from 'api/api';
import Spinner from 'components/atoms/Spinner';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import userState from 'stores/userStore';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userState);

  // 인가코드
  const authorizationCode = new URL(window.location.href).searchParams.get(
    'code',
  );

  useEffect(() => {
    (async () => {
      try {
        // 로컬 테스트 시 요청 URI 수정해야 함.
        const result = await Api.post('auth/signup/kakao', {
          authorizationCode,
        });
        const { token } = result.data;
        localStorage.setItem('token', token);
        const { userId, name, role, isOAuth } = jwtDecode(token);
        setUserInfo({
          userId,
          name,
          role,
          isOAuth,
        });
        navigate('/');
      } catch (err) {
        navigate('/login');
      }
    })();
  }, []);

  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default KakaoRedirectHandler;
