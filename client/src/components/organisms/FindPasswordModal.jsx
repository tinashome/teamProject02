import ModalDiv from 'components/atoms/AdminModalDiv';
import ModalWrapper from 'components/atoms/AdminModalWrapper';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as Api from 'api/api';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import { useForm } from 'react-hook-form';

const FindPasswordModal = ({ toggleModal }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [userId, setUserId] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

  const validateEmail = async () => {
    try {
      const { email } = getValues();
      const result = await Api.post('mail/check-mail', { mail: email });
      if (result.status === 200) {
        alert('이메일로 발송된 인증 코드를 확인해주세요.');
        setIsEmailValid(true);
        setUserId(result.data.userId);
      } else {
        alert('이메일 인증을 다시 시도해주세요.');
      }
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  const validateCode = async () => {
    try {
      const { email, code } = getValues();
      const result = await Api.post('mail/check-code', { mail: email, code });
      if (result.data.result === 'success') {
        alert('이메일 인증이 완료되었습니다.');
        setIsCodeValid(true);
      } else {
        alert('인증 코드가 일치하지 않습니다. 이메일 인증에 실패하였습니다.');
      }
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  const onSubmit = async (data) => {
    const { password } = data;
    try {
      const result = await Api.post('auth/change-pwd', { userId, password });
      if (result.status === 200) {
        alert(
          '비밀번호가 정상적으로 변경되었습니다. 변경된 비밀번호로 로그인해주세요.',
        );
        toggleModal();
      } else {
        alert('비밀번호가 정상적으로 변경되지 않았습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.reason);
    }
  };

  return (
    <ModalWrapper>
      {isCodeValid ? (
        <Modal
          as='form'
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
        >
          <AiOutlineClose onClick={toggleModal} />
          <h1>비밀번호 변경</h1>
          <span>새로운 비밀번호</span>
          <InputWrapper>
            <Input
              type='password'
              placeholder='새로운 비밀번호를 입력해주세요.'
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
              })}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </InputWrapper>
          <span>새로운 비밀번호 확인</span>
          <InputWrapper>
            <Input
              type='password'
              placeholder='비밀번호를 한번 더 입력해주세요.'
              {...register('passwordConfirmation', {
                required: true,
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
            <ErrorMessage>{errors.passwordConfirmation?.message}</ErrorMessage>
          </InputWrapper>
          <StyledButton button='submit'>확인</StyledButton>
        </Modal>
      ) : (
        <Modal onClick={(e) => e.stopPropagation()}>
          <AiOutlineClose onClick={toggleModal} />
          <h1>비밀번호 찾기</h1>
          <span>이메일 인증</span>
          <InputWrapper>
            <Input
              type='email'
              placeholder='이메일을 입력해주세요.'
              {...register('email', { required: true })}
              disabled={isEmailValid}
            />
            <ConfirmButton
              type='button'
              onClick={validateEmail}
              disabled={isEmailValid}
            >
              {isEmailValid ? '인증' : '확인'}
            </ConfirmButton>
          </InputWrapper>
          {isEmailValid && (
            <>
              <span>인증코드 입력</span>
              <InputWrapper>
                <Input
                  type='number'
                  placeholder='인증 코드를 입력해주세요.'
                  {...register('code', { required: true })}
                />
                <ConfirmButton type='button' onClick={validateCode}>
                  확인
                </ConfirmButton>
              </InputWrapper>
            </>
          )}
        </Modal>
      )}
    </ModalWrapper>
  );
};

const Modal = styled(ModalDiv)`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  width: 30%;
  height: auto;
  top: 35%;
  left: 45%;
  padding: 2rem;

  svg {
    position: absolute;
    right: 30px;
    cursor: pointer;
    border-radius: 4px;
    opacity: 0.6;
    &:hover {
      background: #ced4da;
    }
  }

  span {
    font-size: 20px;
    margin: 1rem 0.3rem;
  }

  h1 {
    align-self: center;
    margin-bottom: 2rem;
  }

  div {
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: #f03e3e;
  margin: 0.5rem 0;
  font-size: 15px;
  align-self: flex-end;
`;

const ConfirmButton = styled(Button)`
  position: absolute;
  right: 0;
  height: 100%;
  border-radius: 0 4px 4px 0;

  :disabled {
    background: #868e96;
    pointer-events: none;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
  align-self: flex-end;
`;

export default FindPasswordModal;
