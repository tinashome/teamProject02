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
            <InfoIcon opacity={iconStateFlag[idx] ? 1 : 0.4}>
              {list.icon}
            </InfoIcon>
          </IconContainer>
          {list.iconName === '경기장크기' ? (
            <IconText opacity={iconStateFlag[idx] ? 1 : 0.4}>
              {groundSize}(m)
            </IconText>
          ) : (
            <IconText opacity={iconStateFlag[idx] ? 1 : 0.4}>
              {list.iconName}
            </IconText>
          )}
        </GroundIcon>
      ))}
    </GroundIcons>
  );
};

const IconContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  color: #343a40;
`;

const InfoIcon = styled.div`
  opacity: ${(props) => props.opacity};
`;

const Icon = styled.div`
  position: absolute;
  right: 15%;
  color: red;
  opacity: 0.7;
  margin-left: 0.5rem;
`;

const IconText = styled.div`
  font-size: 13px;
  margin-top: 0.5rem;
  font-weight: bold;
  text-align: center;
  opacity: ${(props) => props.opacity};
`;

const GroundIcons = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  margin-bottom: 2rem;
  margin-left: 1.5rem;
`;

const GroundIcon = styled.div`
  flex-direction: column;
  padding: 0.2rem;
  margin: 0.2rem;
  width: 6rem;
  height: 6rem;
  border-radius: 5px;
  font-size: 65px;
`;

export default IconCard;
