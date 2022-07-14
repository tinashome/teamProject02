import Title from 'components/atoms/Title';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Input from '../components/atoms/Input';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    console.log(data);
    // 회원가입 API 요청 로직 작성
  };

  const onInvalid = (error) => {
    console.log(error);
  };

  return (
    <Form onSubmit={handleSubmit(onValid, onInvalid)}>
      <Title>회원 가입</Title>

      <InputTitle>이름</InputTitle>
      <Input
        type='text'
        {...register('name', {
          required: '이름을 입력해주세요.',
          minLength: {
            value: 2,
            message: '이름은 최소 2글자 이상이어야 합니다.',
          },
        })}
        placeholder='이름을 입력해주세요. (최소 2자 이상)'
      />
      <ErrorMessage>{errors.name?.message}</ErrorMessage>

      <InputTitle>이메일</InputTitle>
      <Input
        type='email'
        {...register('email', {
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '이메일 형식으로 입력해주세요.',
          },
        })}
        placeholder='이메일을 입력해주세요.'
      />
      <ErrorMessage>{errors.email?.message}</ErrorMessage>

      <InputTitle>휴대전화 번호</InputTitle>
      <Input
        type='number'
        {...register('phoneNumber', {
          required: '휴대전화 번호를 입력해주세요.',
          pattern: {
            value: /^[0-9\b]{0,11}$/,
            message: '올바른 휴대전화 형식이 아닙니다. (11자 초과)',
          },
        })}
        placeholder='"-"를 빼고 번호를 입력해주세요.'
      />
      <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>

      <InputTitle>비밀번호</InputTitle>
      <Input
        type='password'
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다.',
          },
        })}
        placeholder='비밀번호를 입력해주세요. (최소 8자 이상)'
      />
      <ErrorMessage>{errors.password?.message}</ErrorMessage>

      <InputTitle>비밀번호 확인</InputTitle>
      <Input
        type='password'
        {...register('passwordConfirmation', {
          required: '비밀번호를 확인해주세요.',
          validate: {
            matchesPreviousPassword: (value) => {
              const { password } = getValues();
              return password === value || '비밀번호가 일치하지 않습니다.';
            },
          },
        })}
        placeholder='비밀번호를 한번 더 입력해주세요.'
      />
      <ErrorMessage>{errors.passwordConfirmation?.message}</ErrorMessage>
      <SignUpButton type='submit' value='회원가입' />
    </Form>
  );
};

const Form = styled.form`
  width: 30rem;
  display: flex;
  flex-direction: column;
  margin: 2.5rem auto;
`;

const InputTitle = styled.p`
  font-size: 1rem;
  margin: 0 0 0.5rem 0.3rem;
`;

const ErrorMessage = styled.p`
  color: #f03e3e;
  margin-bottom: 0.5rem;
  text-align: right;
`;

const SignUpButton = styled(Input)`
  color: #ffffff;
  font-size: 1.5rem;
  background: #3563e9;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default SignUp;
