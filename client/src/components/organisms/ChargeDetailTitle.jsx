import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const ChargeDetailTitle = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackArrow onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft />
        이전 페이지
      </BackArrow>

      <Title>포인트 충전 정보</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: raw;
  width: 100%;
  height: 4rem;
  margin: 4rem 5rem 4rem 9rem;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  boder-bottom-color: #0000004d;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  margin-right: 16rem;
`;
const BackArrow = styled.button`
  text-align: left;
  width: 100%;
  font-size: 20px;
`;
export default ChargeDetailTitle;
