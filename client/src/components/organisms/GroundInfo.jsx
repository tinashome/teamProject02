import React from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { RiCheckboxBlankFill } from 'react-icons/ri';

import IconCard from './IconCard';

// 경기장 정보 값 받아오기 (api)
// const act = info.actInfo;
// contents

const GroundInfo = ({ info }) => {
  
  const infoContents = [
    {
      title: '풋살장 가는길',
      text: info.wayTo,
    },
    {
      title: '주차',
      text: info.parkingInfo,
    },
    {
      title: '흡연',
      text: info.smoking,
    },
    {
      title: '풋살화 대여',
      text: info.shoesRentalInfo,
    },
    {
      title: '화장실',
      text: info.toilet,
    },
  ];

  return (
    <>
      <GroundTitle>{info.groundName}</GroundTitle>
      <GroundSubTitle>경기장 정보</GroundSubTitle>
      {/* 아이콘  */}
      <IconCard size={info.groundSize} />

      <GroundDetailInformation>
        <GroundSubTitle>경기장 특이사항</GroundSubTitle>

        {infoContents.map((list) => (
          <>
            <GroundInfoTitle>
              <BoxBlanckIcon />
              {list.title}
            </GroundInfoTitle>
            <GroundText>{list.text}</GroundText>
          </>
        ))}

        <GroundInfoTitle>
          <BoxBlanckIcon /> 기타
        </GroundInfoTitle>

        {/* {act.map((list) => (
          <GroundText>
            <li>{list}</li>
          </GroundText>
        ))} */}

      </GroundDetailInformation>
    </>
  );
};

const GroundTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  margin: 0.3rem;
  text-align: center;
`;

const GroundSubTitle = styled.h2`
  font-size: 30px;
  text-align: left;
  margin: 2rem 0.3rem 1.5rem 1rem;
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

const BoxBlanckIcon = styled(RiCheckboxBlankFill)`
  font-size: 17px;
`;
export default GroundInfo;
