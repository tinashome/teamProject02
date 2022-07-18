import React from 'react';
import styled from 'styled-components';
import pointList from 'constants/PointList';
import PointBtn from 'components/atoms/PointBtn';

const PointChargeCard = () => (
  <>
    <Title>결제금액</Title>
    <PointCards>
      {pointList.map((list) => (
        <PointCard key={list.id}>{list.amount.toLocaleString()}원</PointCard>
      ))}
    </PointCards>
  </>
);

const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin: 0 0 0 15rem;
`;
const PointCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 1rem 0 2rem 19rem;
  width: 80%;
  height: 14rem;
  padding: 0.5rem;
`;

const PointCard = styled(PointBtn)`
  width: 13rem;
  font-size: 23px;
  font-weight: bold;
  border: solid #bdbdbd;
  margin: 0.5rem;
  &:hover {
    color: white;
    background-color: #3563e9;
  }
`;
export default PointChargeCard;
