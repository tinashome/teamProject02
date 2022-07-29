import React from 'react';
import styled from 'styled-components';
import { RiCheckboxBlankFill } from '@react-icons/all-files/ri/RiCheckboxBlankFill';
import KakaoMap from 'pages/KakaoMap';
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
        <IconCards>
          <IconCard info={info} />
        </IconCards>
      </GroundIconList>
      <GroundDetailInformation>
        <GroundSubTitle>경기장 특이사항</GroundSubTitle>

        {infoContents?.map((list) => (
          <>
            <GroundInfoTitle key={list}>
              <BoxBlanckIcon key={list.title} />
              {list.title}
            </GroundInfoTitle>
            {list.text === '' ? (
              <GroundText key={list.id}>정보없음</GroundText>
            ) : (
              <GroundText key={list.text}>{list.text}</GroundText>
            )}
          </>
        ))}

        <GroundInfoTitle>
          <BoxBlanckIcon />
          기타
        </GroundInfoTitle>

        {actInfo?.map((list, idx) => (
          <GroundListText key={idx}>
            {list === '' ? '정보없음' : <p key={idx}>- {list}</p>}
          </GroundListText>
        ))}

        <GroundInfoTitle>
          <BoxBlanckIcon />
          경기장 위치 Map
        </GroundInfoTitle>
        <GroundText>
          <KakaoMap
            address={info.groundAddress?.address1}
            name={info.groundName}
          />
        </GroundText>
      </GroundDetailInformation>
    </>
  );
};
const IconCards = styled.div`
  display: flex;
  text-align: center;
`;

const GroundIconList = styled.div`
  border-radius: 0.7rem;
  margin: 0 1rem 0 1rem;
  padding: 1.5rem 1rem;
  background-color: #f8f9fa;
`;

const GroundSubTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0.3rem 2rem 2rem;
  height: auto;
`;

const GroundDetailInformation = styled.div`
  border-radius: 0.7rem;
  margin: 1rem;
  padding: 1.5rem 0;
  background-color: #f8f9fa;
`;

const GroundInfoTitle = styled.h3`
  font-size: 25px;
  text-align: left;
  font-weight: bold;
  margin: 2rem 0 1rem 2rem;
`;

const GroundText = styled.p`
  display: flex;
  font-size: 1.2rem;
  margin: 1rem 2rem 0rem 3rem;
  line-height: 23px;
  color: #212529;
  svg {
    width: 25px;
    height: 25px;
  }
`;

const GroundListText = styled.p`
  font-size: 1.2rem;
  margin: 1rem 3rem;
  color: #212529;

  p {
    &:last-child {
      margin-bottom: 1rem;
    }
  }
`;

const BoxBlanckIcon = styled(RiCheckboxBlankFill)`
  font-size: 0.7rem;
  margin: 0 0.3rem 0.3rem 0;
`;
export default GroundInfo;
