import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { userState } from '../stores/userStore';
import * as Api from '../api/api';

const UnRegister = () => {
  const setUserInfo = useSetRecoilState(userState);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
      const result = await Api.delete('users');
      if (result.status === 200) {
        alert('회원 탈퇴가 완료되었습니다.');
        localStorage.removeItem('token');
        setUserInfo({});
        navigate('/');
      } else {
        alert('회원 탈퇴에 실패하였습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Title>회원 탈퇴</Title>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Contents>
            <Content
              style={{
                color: 'red',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              회원 탈퇴를 위해 아래 문장을 입력해 주세요
            </Content>
            <Content
              style={{
                color: 'red',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              입력 문장 : 정말 탈퇴 하겠습니다
            </Content>
            <Content>
              문장 확인{' '}
              <input
                {...register('sentenceConfirmation', {
                  required: '문장을 입력해 주세요.',
                  validate: {
                    matchesSentence: (value) =>
                      value === '정말 탈퇴 하겠습니다' ||
                      '입력 문장을 다시 확인해 주세요.',
                  },
                })}
              />
            </Content>
            <ErrorMessage>{errors.sentenceConfirmation?.message}</ErrorMessage>
          </Contents>
          <ButtonBox>
            <button type='submit'>탈퇴하기</button>
            <button type='button'>
              <NavLink to='/'>돌아가기</NavLink>
            </button>
          </ButtonBox>
        </Form>
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
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.0625rem;
`;

const Wrapper = styled.div`
  height: 100%;
  margin: 0.9375rem 6.25rem;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
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
  margin-bottom: 1rem;
  color: #000000;
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: -0.0625rem;
  text-align: right;
`;

const ErrorMessage = styled.p`
  color: #f03e3e;
  margin: 0 5rem 0.5rem 0;
  text-align: right;
`;

export default UnRegister;
