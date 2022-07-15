import React from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import { Link } from 'react-router-dom';

const GroundCard = ({ ground }) => (
  <Container>
    <GroundImage src={ground.groundImg} />
    <GroundAddress>{ground.groundAddress1}</GroundAddress>
    <GroundName>{ground.groundName}</GroundName>
    <Wrapper>
      <PaymentPoint>{ground.paymentPoint}</PaymentPoint>
      <Link to={`detail/${ground.shortId}`}>
        <ReservationButton type='button'>예약하기</ReservationButton>
      </Link>
    </Wrapper>
  </Container>
);

const Container = styled.div`
  width: 20%;
  height: 20rem;
  margin: 1rem;
  border: 1px solid #adb5bd;
  border-radius: 4px;
  text-align: center;
  min-width: fit-content;
`;

const GroundImage = styled.img`
  width: 100%;
  height: 50%;
`;

const GroundAddress = styled.p`
  margin: 1.5rem 0 0.5rem 0;
`;

const GroundName = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PaymentPoint = styled.p`
  font-size: 22px;
`;

const ReservationButton = styled(Button)`
  font-size: 1rem;
  padding: 8px 12px;
`;

export default GroundCard;
