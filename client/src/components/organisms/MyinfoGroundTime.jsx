import React, { useState } from 'react';
import styled from 'styled-components';
import { BiTimeFive } from '@react-icons/all-files/bi/BiTimeFive';
import { FaAngleDown } from '@react-icons/all-files/fa/FaAngleDown';
import { FaAngleUp } from '@react-icons/all-files/fa/FaAngleUp';
import { morningTimeValue, afternoonTimeValue } from 'constants/TimeBtnValue';
import TimeBtn from '../atoms/MyinfoTimeButton';

const MyinfoGroundTime = ({
  info,
  dateValue,
  reservationDateInfo,
  reservationTime,
  setReservationTime,
}) => {
  const [timeBtnShow, setTimeBtnShow] = useState(true);
  const { startTime, endTime } = info;

  const handleClick = () => {
    setTimeBtnShow(!timeBtnShow);
  };

  return (
    <>
      <DateTimeNavbar onClick={handleClick}>
        <TimeText>
          <BiTimeFive /> 시간 선택
        </TimeText>
        <ShowBtn>{timeBtnShow ? <FaAngleUp /> : <FaAngleDown />}</ShowBtn>
      </DateTimeNavbar>
      <Container style={timeBtnShow ? { display: '' } : { display: 'none' }}>
        <Title>오전</Title>
        <TimeBtns>
          {morningTimeValue.map((renderTime) =>
            TimeBtn({
              renderTime,
              startTime,
              endTime,
              reservationDateInfo,
              reservationTime,
              setReservationTime,
              dateValue,
            }),
          )}
        </TimeBtns>
        <Title>오후</Title>
        <TimeBtns>
          {afternoonTimeValue.map((renderTime) =>
            TimeBtn({
              renderTime,
              startTime,
              endTime,
              reservationDateInfo,
              reservationTime,
              setReservationTime,
              dateValue,
            }),
          )}
        </TimeBtns>
      </Container>
    </>
  );
};
const TimeText = styled.h1`
  font-size: 20px;
  text-align: left;
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
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  margin: 1rem 0;
  gap: 0.5rem 0;
  border: solid #bdbdbd;
  padding: 1rem;
`;

const DateTimeNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #0000004d;
  margin: 2rem 0 1rem 0;
  cursor: pointer;
`;

const ShowBtn = styled.button`
  font-size: 20px;
  text-align: right;
  margin-right: 0.8rem;
`;

export default MyinfoGroundTime;
