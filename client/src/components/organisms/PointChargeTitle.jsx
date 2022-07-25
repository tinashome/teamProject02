import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { AiOutlineQuestionCircle } from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import { AiOutlineArrowLeft } from '@react-icons/all-files/ai/AiOutlineArrowLeft';

const PointChargeTitle = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackArrow onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft />
        <span>이전 페이지</span>
      </BackArrow>

      <Title>포인트 충전</Title>

      <ChargeInfoBtn>
        <Link to='/'>
          <AiOutlineQuestionCircle />
          <span>충전내역</span>
        </Link>
      </ChargeInfoBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #0000004d;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const BackArrow = styled.button`
  display: flex;
  align-items: center;
  font-size: 20px;
  opacity: 0.7;
  span {
    margin: 0 0.3rem;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const ChargeInfoBtn = styled.div`
  opacity: 0.7;
  a {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  span {
    margin: 0 0.3rem;
  }
`;
export default PointChargeTitle;
