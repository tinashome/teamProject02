import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import userInfo from '../stores/userInfoStore';
import * as Api from '../api/api';

const UserInformation = () => {
  const [user, setUser] = useRecoilState(userInfo);

  const userInformation = async () => {
    try {
      const result = await Api.get('users/user');
      setUser(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userInformation();
  }, []);

  return (
    <Container>
      <Title>내 정보</Title>
      <Wrapper>
        <Contents>
          <Content>
            <div>이름 :&nbsp;</div>
            {user?.name}
          </Content>
          <Content>
            <div>이메일 :&nbsp;</div>
            {user?.email}
          </Content>
          <Content>
            <div>전화번호 :&nbsp;</div>
            {user?.phoneNumber}
          </Content>
        </Contents>
        <ButtonBox>
          <button type='button'>
            <NavLink to='/'>돌아가기</NavLink>
          </button>
        </ButtonBox>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  line-height: 3rem;
  padding: 1.875rem 3.125rem;
  margin-top: 1.875rem;
  color: #000000;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.0625rem;
`;

const Wrapper = styled.div`
  height: 100%;
  margin: 0.9375rem 6.25rem;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.125rem;
  height: 65%;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;

  & button {
    padding: 0.75rem 1rem;
    margin: 0.5rem 2rem;
    border-radius: 0.25rem;
    color: white;
    background: #3563e9;
    font-size: 1.125rem;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 1.8125rem;
  color: #000000;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: -0.0625rem;
  text-align: right;

  & div {
    width: 9.375rem;
    margin: 0.25rem 0;
  }
`;

export default UserInformation;
