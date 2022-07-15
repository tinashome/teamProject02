import React from 'react';
import styled from 'styled-components';
import groundInfo from 'mockData/groundInfo';
import 'react-datepicker/dist/react-datepicker.css';
import IconDataList from 'components/atoms/IconDataList';

const info = groundInfo.groundInfo[0];
const act = info.actInfo;

const GroundInfo = () => (
  <>
    <GroundTitle>{info.groundName}</GroundTitle>
    <GroundSubTitle>경기장 정보</GroundSubTitle>
    <GroundIcons>
      {IconDataList.map((list) => (
        <GroundIcon key={list.id}>{list.iconName}</GroundIcon>
      ))}
    </GroundIcons>

    <GroundDetailInformation>
      <GroundSubTitle>경기장 특이사항</GroundSubTitle>

      <GroundInfoTitle>풋살장 가는길</GroundInfoTitle>
      <GroundText>{info.wayTo}</GroundText>

      <GroundInfoTitle>주차</GroundInfoTitle>
      <GroundText>{info.parkingInfo}</GroundText>

      <GroundInfoTitle>흡연</GroundInfoTitle>
      <GroundText>{info.smoking}</GroundText>

      <GroundInfoTitle>풋살화 대여</GroundInfoTitle>
      <GroundText>{info.shoesRentalInfo}</GroundText>

      <GroundInfoTitle>화장실</GroundInfoTitle>
      <GroundText>{info.toilet}</GroundText>

      <GroundInfoTitle>기타</GroundInfoTitle>

      {act.map((list) => (
        <GroundText>
          <li>{list}</li>
        </GroundText>
      ))}
    </GroundDetailInformation>
  </>
);

const GroundIcons = styled.div`
  display: flex;
  width: 100x;
  height: 120px;
  border: solid black;
  margin: 5px;
`;
const GroundIcon = styled.div`
  width: 100px;
  height: 100px;
  border: solid blue;
  border-radius: 5px;
  font-size: 90px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 5px;
`;

const GroundTitle = styled.h1`
  border: solid black;
  font-size: 45px;
  text-align: center;
  margin: 5px;
`;

const GroundSubTitle = styled.h2`
  border: solid black;
  font-size: 30px;
  text-align: left;
  margin: 5px;
`;

const GroundDetailInformation = styled.div`
  border: solid black;
  margin: 5px;
`;

const GroundInfoTitle = styled.h3`
  border: solid black;
  font-size: 25px;
  text-align: left;
  margin: 5px;
`;

const GroundText = styled.p`
  border: solid black;
  font-size: 20px;
  margin: 5px;
`;

export default GroundInfo;
