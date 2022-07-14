import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import image from '../assets/image/soccer1.jpeg';
import Input from '../components/atoms/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 API 요청 로직 작성
  };

  return (
    <Container>
      <Image src={image} />
      <InputContainer>
        <Title>풋살 예약은 풋닷컴</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder='이메일을 입력해주세요 :)'
            value={email}
            onChange={handleChangeEmail}
          />
          <Input
            placeholder='비밀번호를 입력해주세요'
            value={password}
            onChange={handleChangePassword}
          />
          <LoginButton type='submit'>로그인</LoginButton>
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

const Title = styled.span`
  width: 100%;
  font-size: 36px;
  margin-bottom: 3rem;
  text-align: center;

  &:last-child {
    color: #3563e9;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 0.5rem;
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
