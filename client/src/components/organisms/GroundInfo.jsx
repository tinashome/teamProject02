import React from 'react';
import styled from 'styled-components';
import { RiCheckboxBlankFill } from '@react-icons/all-files/ri/RiCheckboxBlankFill';

import IconCard from './IconCard';

const GroundInfo = ({ info }) => {
  const { wayTo, parkingInfo, smoking, shoesRentallInfo, toilet, actInfo } =
    info;
  const infoContents = [
    {
      id: 1,
      title: '풋살장 가는길',
      text: wayTo,
    },
    {
      id: 2,
      title: '주차',
      text: parkingInfo,
    },
    {
      id: 3,
      title: '흡연',
      text: smoking,
    },
    {
      id: 4,
      title: '풋살화 대여',
      text: shoesRentallInfo,
    },
    {
      id: 5,
      title: '화장실',
      text: toilet,
    },
  ];

  return (
    <>
      <GroundIconList>
        <GroundSubTitle>경기장 정보</GroundSubTitle>
        {/* 아이콘  */}
        <IconCards>
          <IconCard info={info} />
        </IconCards>
      </GroundIconList>
      <GroundDetailInformation>
        <GroundSubTitle>경기장 특이사항</GroundSubTitle>

        {infoContents?.map((list) => (
          <>
            <GroundInfoTitle key={list.id}>
              <BoxBlanckIcon />
              {list.title}
            </GroundInfoTitle>
            {list.text === '' ? (
              <GroundText>정보없음</GroundText>
            ) : (
              <GroundText>{list.text}</GroundText>
            )}
          </>
        ))}

        <GroundInfoTitle>
          <BoxBlanckIcon />
          기타
        </GroundInfoTitle>

        {actInfo?.map((list) => (
          <GroundText>{list==='' ? '정보없음' : <li>{list}</li>}</GroundText>
        ))}
      </GroundDetailInformation>
    </>
  );
};
const IconCards = styled.div`
  display:flex;
  justify-content:center;
`;

const GroundIconList = styled.div`
  text-align: center;
  border: solid 1px #ced4da;
  border-radius: 0.7rem;
  margin: 0 1rem 0 1rem;
  height: 14rem;
`;

const GroundSubTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  margin: 2rem 0.3rem 1.5rem 1rem;
`;

const GroundDetailInformation = styled.div`
  border: solid 1px #ced4da;
  border-radius: 0.7rem;
  margin: 1rem;
`;

const GroundInfoTitle = styled.h3`
  font-size: 25px;
  text-align: left;
  font-weight: bold;
  margin: 0rem 0 1rem 2rem;
`;

const GroundText = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0 2rem 4rem;
`;

const BoxBlanckIcon = styled(RiCheckboxBlankFill)`
  font-size: 0.7rem;
  margin: 0 0.3rem 0.3rem 0;
`;
export default GroundInfo;
