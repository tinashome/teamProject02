import React from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as Api from '../api/api';

const PasswordChange = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await Api.patch('users/updatedPwd', data);
      if (result.status === 200) {
        alert('비밀번호 변경이 완료되었습니다.');
      } else {
        alert('비밀번호 변경에 실패하였습니다.');
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.reason);
    }
  };

  return (
    <Container>
      <Title>비밀번호 변경</Title>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Contents>
            <Content>
              현재 비밀번호{' '}
              <input
                type='password'
                {...register('currentPassword', {
                  required: '현재 비밀번호를 입력해 주세요.',
                })}
              />
            </Content>
            <ErrorMessage>{errors.currentPassword?.message}</ErrorMessage>
            <Content>
              새 비밀번호{' '}
              <input
                type='password'
                {...register('password', {
                  required: '새 비밀번호를 입력해 주세요.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다.',
                  },
                  validate: {
                    matchesPassword: (value) => {
                      const { currentPassword } = getValues();
                      return (
                        currentPassword !== value ||
                        '현재 비밀번호와 다른 비밀번호를 입력해 주세요.'
                      );
                    },
                  },
                })}
              />
            </Content>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
            <Content>
              새 비밀번호 확인{' '}
              <input
                type='password'
                {...register('passwordConfirmation', {
                  required: '새 비밀번호를 다시 입력해 주세요.',
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return (
                        password === value || '비밀번호가 일치하지 않습니다.'
                      );
                    },
                  },
                })}
              />
            </Content>
            <ErrorMessage>{errors.passwordConfirmation?.message}</ErrorMessage>
          </Contents>
          <ButtonBox>
            <button type='submit'>변경하기</button>
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
  color: #000000;
  font-family: 'Inter';
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

export default PasswordChange;
