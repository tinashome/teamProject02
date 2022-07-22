import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiTimeFive } from 'react-icons/bi';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import timeValue from 'stores/reservationStore';
import TimeButton from '../atoms/TimeButton';

const GroundTime = ({ info }) => {
  const [timeBtnShow, setTimeBtnShow] = useState(true);
  const [timeBtnValue, setTimeBtnValue] = useRecoilState(timeValue);
  const [startTimeValue, setStartTimeValue] = useState(info.startTime);
  const [endTimeValue, setEndTimeValue] = useState(info.endTime);

  const timeBtnState = () => {
    const newTimeList = [...timeBtnValue];
    const startTimeSlice = newTimeList.map((list) => list.value.slice(0, 5)); // 11:00
    const endTimeSlice = newTimeList.map((list) => list.value.slice(6, 11)); // 21:00 ~ 22:00
    const startTimeIndex = startTimeSlice.indexOf(startTimeValue);
    const endTimeIndex = endTimeSlice.indexOf(endTimeValue);

    // 시작 시간 이전 버튼 비활성화
    for (let i = 0; i < startTimeIndex; i += 1) {
      newTimeList[i] = { ...newTimeList[i], reservation: true };
    }

    // 마감 시간 이후 버튼 비활성화
    // for (let i = endTimeIndex + 1; i < newTimeList.length; i += 1) {
    //   newTimeList[i] = { ...newTimeList[i], reservation: true };
    // }
    // console.log(newTimeList)
    setTimeBtnValue(newTimeList);
  };

  useEffect(() => {
    const startTimeFormat = `${startTimeValue?.slice(
      0,
      2,
    )}:${startTimeValue?.slice(2, 4)}`; // 0700 => 07:00
    const endTimeFormat = `${endTimeValue?.slice(0, 2)}:${endTimeValue?.slice(
      2,
      4,
    )}`; // 2300 => 23:00
    setStartTimeValue(startTimeFormat);
    setEndTimeValue(endTimeFormat);
    timeBtnState();
    console.log(info);

  }, [startTimeValue, endTimeValue]);

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
        <Title>오전 / 오후</Title>
        <TimeBtns>
          {/* */}
          {timeBtnValue.map((list) => (
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
