import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiTimeFive } from 'react-icons/bi';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { morningTimeValue, afternoonTimeValue } from 'constants/TimeBtnValue';
import { reservationDateInfo } from 'stores/reservationStore';
import { TimeBtn } from '../atoms/TimeButton';

const GroundTime = ({ info }) => {
  const [timeBtnShow, setTimeBtnShow] = useState(true);
  const [reservationInfo, setReservationInfo] =
    useRecoilState(reservationDateInfo);
    
  const { startTime, endTime } = info;

  const handleClick = () => {
    setTimeBtnShow(!timeBtnShow);
  };

  return (
    <>
      <DateTimeNavbar>
        <TimeText>
          <BiTimeFive /> 시간 선택
        </TimeText>
        <ShowBtn>
          {timeBtnShow ? (
            <BsArrowDownCircle onClick={handleClick} />
          ) : (
            <BsArrowUpCircle onClick={handleClick} />
          )}
        </ShowBtn>
      </DateTimeNavbar>
      <Container style={timeBtnShow ? { display: '' } : { display: 'none' }}>
        <Title>오전</Title>
        <TimeBtns>
          {morningTimeValue.map((renderTime) =>
            TimeBtn({ renderTime, startTime, endTime, reservationInfo }),
          )}
        </TimeBtns>
        <Title>오후</Title>
        <TimeBtns>
          {afternoonTimeValue.map((renderTime) =>
            TimeBtn({ renderTime, startTime, endTime, reservationInfo }),
          )}
        </TimeBtns>
      </Container>
    </>
  );
};
const TimeText = styled.h1`
  font-size: 20px;
  text-align: left;
  width: 100%;
  height: 2rem;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const TimeBtns = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 75rem;
  margin: 1rem 0 1rem 1rem;
  gap: 0.5rem 0;
  border: solid #bdbdbd;
  padding: 1rem;
`;

const DateTimeNavbar = styled.div`
  display: flex;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  boder-bottom-color: #0000004d;
  margin: 2rem 0 1rem 0;
`;

const ShowBtn = styled.button`
  font-size: 20px;
  text-align: right;
  width: 100%;
  margin-right: 0.8rem;
`;

export default GroundTime;
