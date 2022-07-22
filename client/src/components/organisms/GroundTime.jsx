import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiTimeFive } from 'react-icons/bi';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { morningTimeValue, afternoonTimeValue } from 'stores/reservationStore';
import TimeButton from '../atoms/TimeButton';

const GroundTime = ({ startTime, endTime }) => {
  const [timeBtnShow, setTimeBtnShow] = useState(true);
  const [morningTime, setMorningTime] = useRecoilState(morningTimeValue);
  const [afternoonTime, setAfternoonTime] = useRecoilState(afternoonTimeValue);
  const [startTimeValue, setStartTimeValue] = useState('');
  const [endTimeValue, setEndTimeValue] = useState('');

  const morningTimeState = () => {
    const newMorningTime = [...morningTime];
    const morningSliceResult = morningTime.map((list) =>
      list.value.slice(0, 5),
    );
    const morningTimeIndex = morningSliceResult.indexOf(startTimeValue);
    if (morningTimeIndex !== -1) {
      for (let i = 0; i < morningTimeIndex; i += 1) {
        newMorningTime[i] = { ...newMorningTime[i], reservation: true };
      }
    }
    setMorningTime(newMorningTime);
  };

  const afternoonTimeState = () => {
    const newAfternoonTime = [...afternoonTime];
    const afternoonSliceResult = afternoonTime.map((list) =>
      list.value.slice(6, 11),
    );
    const afternoonTimeIndex = afternoonSliceResult.indexOf(endTimeValue);
    if (afternoonTimeIndex !== -1) {
      for (
        let i = afternoonTimeIndex + 1;
        i < newAfternoonTime.length;
        i += 1
      ) {
        newAfternoonTime[i] = { ...newAfternoonTime[i], reservation: true };
      }
    }
    setAfternoonTime(newAfternoonTime);
  };

  useEffect(() => {
    if (startTime) {
      const startTimeFormat = `${startTime.slice(0, 2)}:${startTime.slice(
        2,
        4,
      )}`;
      const endTimeFormat = `${endTime.slice(0, 2)}:${endTime.slice(2, 4)}`;
      setStartTimeValue(startTimeFormat);
      setEndTimeValue(endTimeFormat);
      console.log('1');
    }
  }, [startTime, endTime]);

  useEffect(() => {
    morningTimeState();
    console.log('2');
  }, [startTimeValue]);

  useEffect(() => {
    afternoonTimeState();
    console.log('3');
  }, [endTimeValue]);

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
          {morningTime.map((list) => (
            <Button key={list.id} disabled={list.reservation}>
              {list.value}
            </Button>
          ))}
        </TimeBtns>
        <Title>오후</Title>
        <TimeBtns>
          {afternoonTime.map((list) => (
            <Button key={list.id} disabled={list.reservation}>
              {list.value}
            </Button>
          ))}
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
  width: 100%;
  margin: 1rem 0 1rem 1rem;
  gap: 0.5rem 0;
`;

const Button = styled(TimeButton)`
  &:hover {
    color: white;
    background-color: #3563e9;
  }
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
