import React, { useCallback, useState } from 'react';
import Button from 'components/atoms/Button';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as Api from 'api/api';
import { useNavigate } from 'react-router-dom';
import CheckBox from 'components/atoms/CheckBox';
import { useRecoilValue } from 'recoil';
import { userState } from 'stores/userStore';

const BoardWrite = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [isNotified, setIsNotified] = useState(false);
  const toggleChecked = useCallback(() => {
    setIsNotified(!isNotified);
  }, [isNotified]);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await Api.post('boards', { ...data, isNotified });
      console.log(result);
      alert('게시글 작성 완료');
      navigate('/board');
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Title
          type='text'
          placeholder='제목을 입력해주세요'
          {...register('title', {
            required: true,
          })}
        />
        {user.role === 'admin' && (
          <div>
            <p>공지사항</p>
            <CheckBox
              text='notice'
              checked={isNotified}
              onChange={toggleChecked}
            />
          </div>
        )}
      </Wrapper>
      <Description
        type='text'
        placeholder='내용을 입력해주세요'
        {...register('contents', {
          required: true,
        })}
      />
      <StyledButton>작성</StyledButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 3rem auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ced4da;
  margin-bottom: 2rem;

  p {
    font-size: 20px;
    margin-right: 10px;
    color: #37b24d;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.input`
  width: 80%;
  font-size: 26px;
  font-weight: 600;
  border: none;
  padding: 0 0 1rem 0.5rem;
  outline: none;
`;

const Description = styled.textarea`
  padding-left: 0.5rem;
  border: none;
  height: 20rem;
  font-size: 20px;
  letter-spacing: 0.5px;
  word-spacing: 0.5px;
  line-height: 1.3;
  resize: none;
  outline: none;
  white-space: pre-wrap;
  &::placeholder {
    font-size: 20px;
  }
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  width: 10%;
`;

export default BoardWrite;
