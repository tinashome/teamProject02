import Title from 'components/atoms/Title';
import * as Api from 'api/api';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import userState from 'stores/userStore';
import jwtDecode from 'jwt-decode';
import image from '../assets/image/soccer1.jpeg';
import Input from '../components/atoms/Input';

const Login = () => {
  const navigate = useNavigate();

  const setUserInfo = useSetRecoilState(userState);
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (userData) => {
    try {
      const result = await Api.post('auth/signin', userData);
      const { token, isAdmin } = result.data;
      const { userId, name, role, isOAuth } = jwtDecode(token);
      localStorage.setItem('token', token);
      setUserInfo({
        userId,
        name,
        role,
        isOAuth,
        isAdmin,
        isLogin: true,
      });
      navigate('/');
    } catch (err) {
      alert(err.response.data.reason);
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
          <span style={{ marginLeft: 5, marginRight: 5 }}>•</span>
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
  width: 450px;
  height: 100%;
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
  justify-content: center;
  align-items: center;
  text-align: center;
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
