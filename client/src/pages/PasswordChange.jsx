import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Api from '../api/api';

const PasswordChange = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const onClickHandle = async () => {
    try {
      const userData = { password: newPassword, currentPassword: password };
      if (newPassword.length < 8) {
        alert('비밀번호는 최소 8자 이상이어야 합니다.');
        return;
      }
      if (newPassword !== newPasswordConfirm) {
        alert('새 비밀번호를 다시 확인해 주세요.');
        return;
      }
      if (password === newPassword) {
        alert('같은 비밀번호 말고 다른 비밀번호를 입력해 주세요.');
        return;
      }
      const result = await Api.patch('users/updatedPwd', userData);
      if (result.status === 200) {
        alert('비밀번호 변경이 완료되었습니다.');
      }
      setPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Title>비밀번호 변경</Title>
      <Wrapper>
        <Contents>
          <Content>
            현재 비밀번호{' '}
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Content>
          <Content>
            새 비밀번호{' '}
            <input
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Content>
          <Content>
            새 비밀번호 확인{' '}
            <input
              type='password'
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
          </Content>
        </Contents>
        <ButtonBox>
          <button type='button' onClick={onClickHandle}>
            변경하기
          </button>
          <button type='button'>돌아가기</button>
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
  height: 65%;

  & input {
    width: 50%;
    padding: 0.875rem 1rem;
    margin: 0.5rem 5rem 0.5rem 1rem;
    border: 0.0625rem solid #ced4da;
    border-radius: 0.25rem;
  }
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
  justify-content: flex-end;
  line-height: 1.8125rem;
  color: #000000;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: -0.0625rem;
  text-align: right;
`;

export default PasswordChange;
