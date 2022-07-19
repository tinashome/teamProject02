import React, { useState } from 'react';
import styled from 'styled-components';
import pointList from 'constants/PointList';
import PointBtn from 'components/atoms/PointBtn';
import { useRecoilState } from 'recoil';
import pointSelected from 'stores/pointChargeStore';

const PointChargeCard = () => {
  const [selectBtn, setSelectBtn] = useState(false);
  const [selectPoint, setSelectPoint] = useRecoilState(pointSelected);

  const handleClick = (idx) => {
    const newPointBtn = Array(8).fill(false);
    newPointBtn[idx] = true;
    setSelectBtn(newPointBtn);
    setSelectPoint(pointList[idx].amount);
  };

  return (
    <>
      <Title>결제금액</Title>
      <PointCards>
        {pointList.map((list, idx) => (
          <PointCard
            key={list.id}
            value={list.amount}
            style={{
              color: selectBtn[idx] ? 'white' : 'black',
              backgroundColor: selectBtn[idx] ? '#3563e9' : 'white',
            }}
            onClick={() => handleClick(idx)}
          >
            {list.amount.toLocaleString()}원
          </PointCard>
        ))}
      </PointCards>
    </>
  );
};

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
`;

export default PointChargeCard;
