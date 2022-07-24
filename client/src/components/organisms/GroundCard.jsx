import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { addCommas } from 'util/useful-functions';

const GroundCard = ({ ground }) => {
  const {
    groundImg,
    groundName,
    groundAddress: { address1 },
    paymentPoint,
    _id,
  } = ground;

  return (
    <Container>
      <Link to={`grounds/${_id}`}>
        <GroundImage src={groundImg[0]} alt={_id} />
        <GroundAddress>{`${address1?.slice(0, 10)}`}</GroundAddress>
        <GroundName>{groundName.split(' ')[0].slice(0, 10)}</GroundName>
        <Wrapper>
          <PaymentPoint>{addCommas(paymentPoint)}P</PaymentPoint>
        </Wrapper>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  margin: 1rem;
  border: 1px solid #adb5bd;
  border-radius: 4px;
  text-align: center;
  transition: background 0.5s ease;
  &:hover {
    background: #3563e9;
    opacity: 0.7;
  }
`;

const GroundImage = styled.img`
  width: 100%;
  height: 200px;
  border: none;
`;

const GroundAddress = styled.p`
  margin: 1.5rem 0 0.5rem 0;
`;

const GroundName = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1rem;
`;

const PaymentPoint = styled.p`
  font-size: 20px;
`;

export default GroundCard;
