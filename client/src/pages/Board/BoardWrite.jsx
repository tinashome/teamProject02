import React from 'react';
import Button from 'components/atoms/Button';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as Api from 'api/api';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await Api.post('boards', data);
      alert('게시글 작성 완료');
      navigate('/board');
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title
        type='text'
        placeholder='제목을 입력해주세요'
        {...register('title', {
          required: true,
        })}
      />
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
  width: 70%;
  margin: 3rem auto;
`;

const Title = styled.input`
  font-size: 26px;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #ced4da;
  padding: 0 0 1rem 0.5rem;
  margin-bottom: 2rem;
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
