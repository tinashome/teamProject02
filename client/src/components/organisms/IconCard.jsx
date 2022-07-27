import React from 'react';
import styled from 'styled-components';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import IconDataList from 'constants/IconDataList';

const IconCard = ({ info }) => {
  const { showerPlace, parking, sportswearRental, shoesRental, groundSize } =
    info;

  const iconStateFlag = [
    true,
    showerPlace,
    parking,
    sportswearRental,
    shoesRental,
  ];
  return (
    <GroundIcons>
      {IconDataList.map((list, idx) => (
        <GroundIcon key={list.id}>
          <IconContainer>
            <Icon>{iconStateFlag[idx] ? ' ' : <CgClose />}</Icon>
            {list.icon}
          </IconContainer>
          {list.iconName === '경기장크기' ? (
            <IconText>{groundSize}(m)</IconText>
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
  width: 100%;
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
  display:flex;
  justify-content:center;
  width: 100%;
  height: 6rem;
  margin: 0 1.5rem 0.3rem 2rem;
`;

const GroundIcon = styled.div`
  flex-direction: column;
  padding: 0.2rem;
  margin: 0.2rem;
  width: 6rem;
  height: 6.5rem;
  border: solid #bdbdbd;
  border-radius: 5px;
  font-size: 70px;
`;

export default IconCard;
