import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { addCommas } from 'util/useful-functions';
import { defaultImg } from 'constants/imgList';

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
        <ImageContainer>
          <GroundImage src={groundImg[0] || defaultImg} alt={_id} />
        </ImageContainer>
        <GroundAddress>{address1}</GroundAddress>
        <GroundName>{groundName}</GroundName>
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
  margin: 1rem;
  border: 1px solid #adb5bd;
  border-radius: 4px;
  text-align: center;
  transition: background 0.2s ease;
  overflow: hidden;

  &:hover {
    background: #3563e9;
    opacity: 0.9;
  }
`;

const ImageContainer = styled.div`
  height: 200px;
`;

const GroundImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
  border: none;
`;

const GroundAddress = styled.div`
  margin: 1.5rem auto 0.5rem auto;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GroundName = styled.div`
  height: 2rem;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;

  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
