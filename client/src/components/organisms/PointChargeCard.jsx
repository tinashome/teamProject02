import React, { useState } from 'react';
import styled from 'styled-components';
import pointList from 'constants/PointList';
import PointBtn from 'components/atoms/PointBtn';
import { useRecoilState } from 'recoil';
import { pointSelected } from 'stores/pointChargeStore';

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
  );
};

const PointCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.5rem;
`;

const PointCard = styled(PointBtn)`
  width: 15rem;
  font-size: 23px;
  font-weight: bold;
  border: 2px solid #bdbdbd;
  margin: 1rem;
`;

export default PointChargeCard;
