import React from 'react';
import styled from 'styled-components';
import { AiOutlineQuestionCircle, AiOutlineArrowLeft } from 'react-icons/ai';

const PointChargeTitle = () => (
  <Container>
    <BackArrow>
      <AiOutlineArrowLeft />
      이전 페이지
    </BackArrow>

    <Title>포인트 충전</Title>

    <ChargeInfoBtn>
      <AiOutlineQuestionCircle /> 충전내역
    </ChargeInfoBtn>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: raw;
  width: 100%;
  height:4rem;
  margin: 4rem 5rem 4rem 9rem;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  boder-bottom-color: #0000004d;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  width: 100%;
`;

const BackArrow = styled.button`
  text-align: left;
  width: 100%;
  font-size: 20px;
`;

const ChargeInfoBtn = styled.button`
  text-align: right;
  width: 100%;
  font-size: 20px;
`;
export default PointChargeTitle;
