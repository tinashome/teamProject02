import React from 'react';
import styled from 'styled-components';
import { CgClose } from 'react-icons/cg';
import IconDataList from 'constants/IconDataList';

const IconCard = ({ size }) => {
  // GroundInfo 에서 groundSize(경기장 크기값 => iconName에 넣기) ,showerPlace, parking, shoesRental, sportsWearRental 넘겨 받기
  // 아이콘 상태 값 저장 (idx => 0은 map때문에 무조건 true 값으로 지정)
  // 배열로 저장하영 상태값을 관리

  const iconStateFlag = [true, false, true, false, true];
  return (
    <GroundIcons>
      {IconDataList.map((list, idx) => (
        <GroundIcon key={list.id}>
          <IconContainer>
            <Icon>{iconStateFlag[idx] ? ' ' : <CgClose />}</Icon>
            {list.icon}
          </IconContainer>
          {list.iconName === '경기장크기' ? (
            <IconText>{size}(m)</IconText>
          ) : (
            <IconText>{list.iconName}</IconText>
          )}
        </GroundIcon>
      ))}
    </GroundIcons>
  );
};

const IconContainer = styled.div`
  position: relative;
`;

const Icon = styled.div`
  position: absolute;
  color: red;
  opacity: 0.3;
`;

const IconText = styled.div`
  font-size: 10px;
  font-weight: bold;
  text-align: center;
`;

const GroundIcons = styled.div`
  display: flex;
  width: 6rem;
  height: 6rem;
  margin: 0 0.3rem 0.3rem 2rem;
`;

const GroundIcon = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  margin: 0.2rem;
  width: 6rem;
  height: 6rem;
  border: solid #bdbdbd;
  border-radius: 5px;
  font-size: 70px;
`;

export default IconCard;
