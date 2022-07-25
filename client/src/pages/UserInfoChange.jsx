import React from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import userState from '../stores/userStore';
import * as Api from '../api/api';

const UserInfoChange = () => {
  const [user, setUser] = useRecoilState(userState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userData = {
        name: user.name,
        email: user.email,
        phoneNumber: data.phoneNumber,
        role: user.role,
      };
      const result = await Api.patch('users', userData);
      if (result.status === 200) {
        setUser((prev) => ({ ...prev, ...result.data }));
        alert('개인 정보 변경이 완료되었습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Title>개인 정보 변경</Title>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Contents>
            <Content>
              이름{' '}
              <input
                disabled='ture'
                placeholder={user.name}
                style={{ backgroundColor: '#e9e9e9' }}
              />
            </Content>
            <Content>
              이메일{' '}
              <input
                disabled='ture'
                placeholder={user.email}
                style={{ backgroundColor: '#e9e9e9' }}
              />
            </Content>
            <Content>
              전화번호{' '}
              <input
                {...register('phoneNumber', {
                  required: '휴대전화 번호를 입력해주세요.',
                  validate: {
                    changePhoneNumber: (value) =>
                      user.phoneNumber !== value ||
                      '휴대전화 번호를 변경해 주세요.',
                  },
                  pattern: {
                    value: /^[0-9\b]{0,11}$/,
                    message: '올바른 휴대전화 번호를 숫자만 입력해 주세요.',
                  },
                })}
                placeholder={user.phoneNumber}
              />
            </Content>
            <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>
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
    width: 60%;
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

export default UserInfoChange;
