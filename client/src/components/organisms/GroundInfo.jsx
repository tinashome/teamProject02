import React from 'react';
import styled from 'styled-components';
import groundInfo from 'mockData/groundInfo';
import 'react-datepicker/dist/react-datepicker.css';
import IconDataList from 'components/atoms/IconDataList';
import { RiCheckboxBlankFill } from 'react-icons/ri';

const info = groundInfo.groundInfo[0];
const act = info.actInfo;
const fontSize = { fontSize: 17 };
const GroundInfo = () => (
  <>
    <GroundTitle>{info.groundName}</GroundTitle>
    <GroundSubTitle>경기장 정보</GroundSubTitle>
    <GroundIcons>
      {IconDataList.map((list) => (
        <GroundIcon key={list.id}>
          {list.icon}
          <GroundIconText>{list.iconName}</GroundIconText>
        </GroundIcon>
      ))}
    </GroundIcons>

    <GroundDetailInformation>
      <GroundSubTitle>경기장 특이사항</GroundSubTitle>

      <GroundInfoTitle>
        <RiCheckboxBlankFill style={fontSize} /> 풋살장 가는길
      </GroundInfoTitle>
      <GroundText>{info.wayTo}</GroundText>

      <GroundInfoTitle>
        <RiCheckboxBlankFill style={fontSize} /> 주차
      </GroundInfoTitle>
      <GroundText>{info.parkingInfo}</GroundText>

      <GroundInfoTitle>
        <RiCheckboxBlankFill style={fontSize} /> 흡연
      </GroundInfoTitle>
      <GroundText>{info.smoking}</GroundText>

      <GroundInfoTitle>
        <RiCheckboxBlankFill style={fontSize} /> 풋살화 대여
      </GroundInfoTitle>
      <GroundText>{info.shoesRentalInfo}</GroundText>

      <GroundInfoTitle>
        <RiCheckboxBlankFill style={fontSize} /> 화장실
      </GroundInfoTitle>
      <GroundText>{info.toilet}</GroundText>

      <GroundInfoTitle>
        <RiCheckboxBlankFill style={fontSize} /> 기타
      </GroundInfoTitle>

      {act.map((list) => (
        <GroundText>
          <li>{list}</li>
        </GroundText>
      ))}
    </GroundDetailInformation>
  </>
);

const GroundTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  margin: 0.3rem;
  text-align: center;
`;

const GroundSubTitle = styled.h2`
  font-size: 30px;
  text-align: left;
  margin: 2rem 0.3rem 1rem 1rem;
`;

const GroundIcons = styled.div`
  display: flex;
  width: 6rem;
  height: 6rem;
  margin: 0.3rem 0.3rem 0.3rem 2rem;
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

const GroundIconText = styled.p`
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  margin-top: 0.3rem;
`;

const GroundDetailInformation = styled.div`
  margin: 0.2rem;
`;

const GroundInfoTitle = styled.h3`
  font-size: 25px;
  text-align: left;
  font-weight: bold;
  margin: 0.5rem 0 1rem 2rem;
`;

const GroundText = styled.p`
  font-size: 20px;
  margin: 1rem 0 2rem 4rem;
`;

export default GroundInfo;
