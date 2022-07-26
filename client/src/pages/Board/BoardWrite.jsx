import Button from 'components/atoms/Button';
import React, { useState } from 'react';
import styled from 'styled-components';

const BoardWrite = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Container>
      <Title
        placeholder='제목을 입력해주세요'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Description
        placeholder='내용을 입력해주세요'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <StyledButton>발행</StyledButton>
    </Container>
  );
};

const Container = styled.div`
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
