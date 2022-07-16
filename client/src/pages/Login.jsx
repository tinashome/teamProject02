import Title from 'components/atoms/Title';
import * as Api from 'api/api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import userState from 'stores/userStore';
import { useForm } from 'react-hook-form';
import image from '../assets/image/soccer1.jpeg';
import Input from '../components/atoms/Input';

const Login = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (userData) => {
    const result = await Api.post('auth/signin', userData);
    if (result.status === 200) {
      const { token, isAdmin } = result.data;
      const { userId, name, role, isOAuth } = jwtDecode(token);
      setUserState({
        userId,
        name,
        role,
        isOAuth,
        isAdmin,
      });
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <Container>
      <Image src={image} />
      <InputContainer>
        <Title>풋살 예약은 풋닷컴</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder='이메일을 입력해주세요 :)'
            {...register('email', { required: '이메일을 입력해주세요.' })}
          />
          <Input
            type='password'
            placeholder='비밀번호를 입력해주세요'
            {...register('password', { required: '비밀번호를 입력해주세요.' })}
          />
          <LoginButton type='submit' value='로그인' />
        </Form>
        <Wrapper>
          <Link to='/signup'>
            <SignUpButton>회원가입</SignUpButton>
          </Link>
          <span>
            {'\u00A0'}•{'\u00A0'}
          </span>
          <FindPasswordButton>비밀번호 찾기</FindPasswordButton>
        </Wrapper>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem;
`;

const Image = styled.img`
  width: 550px;
  height: 600px;
  border-radius: 4px;
  margin: 0 3rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
`;

const Form = styled.form``;

const LoginButton = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  color: white;
  background: #3563e9;
  &:hover {
    opacity: 0.7;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-right: auto;
  margin-top: 0.3rem;
  opacity: 0.5;
`;

const SignUpButton = styled.button`
  &:hover {
    text-decoration: underline;
  }
`;

const FindPasswordButton = styled(SignUpButton)``;

export default Login;
