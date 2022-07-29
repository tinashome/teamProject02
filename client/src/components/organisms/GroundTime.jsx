import React, { useState } from 'react';
import styled from 'styled-components';
import { BiTimeFive } from '@react-icons/all-files/bi/BiTimeFive';
import { FaAngleDown } from '@react-icons/all-files/fa/FaAngleDown';
import { FaAngleUp } from '@react-icons/all-files/fa/FaAngleUp';
import { morningTimeValue, afternoonTimeValue } from 'constants/TimeBtnValue';
import { TimeBtn } from '../atoms/TimeButton';

const GroundTime = ({
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
          &nbsp;
          <BiTimeFive /> 시간 선택
          <ReservationPaymentText>
            {reservationTime.length > 0 ? reservationTime.length : '0'}시간 /{' '}
            {(info.paymentPoint * reservationTime.length).toLocaleString()} P
          </ReservationPaymentText>
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
const ReservationPaymentText = styled.div`
  font-size: 0.9rem;
  color: #868e96;
  margin-top: 0.2rem;
  margin-left: 5rem;
`;

const TimeText = styled.h1`
  display: flex;
  font-size: 20px;
  text-align: left;
  height: 2rem;
`;

const Container = styled.div`
  width: 100%;
  /* height: 25.5rem; */
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  margin-top: 2rem;
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: 550;
`;

const TimeBtns = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 90%;
  margin: 1rem 0 1.5rem 1rem;
  gap: 0.4rem 0;
  &:last-child {
    margin-bottom: 4rem;
  }
  /* border: solid 1px #dee2e6; */
  /* padding: 1rem; */
`;

const DateTimeNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
  margin: 2rem 0 1rem 0;
  cursor: pointer;
`;

const ShowBtn = styled.button`
  font-size: 20px;
  text-align: right;
  margin-right: 0.8rem;
`;

export default GroundTime;
