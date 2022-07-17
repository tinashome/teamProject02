import React, { useState } from 'react';
import styled from 'styled-components';
import { BiTimeFive } from 'react-icons/bi';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import TimeButton from '../atoms/TimeButton';

const morningTimeValue = [
  '07:00~08:00',
  '08:00~09:00',
  '09:00~10:00',
  '10:00~11:00',
  '11:00~12:00',
];

const afternoonTimeValue = [
  '12:00~13:00',
  '13:00~14:00',
  '14:00~15:00',
  '15:00~16:00',
  '16:00~17:00',
  '17:00~18:00',
  '18:00~19:00',
  '19:00~20:00',
  '20:00~21:00',
  '21:00~22:00',
];

const GroundTime = () => {
  const [timeBtnShow, setTimeBtnShow] = useState(true);

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
          {morningTimeValue.map((list) => (
            <Button>{list}</Button>
          ))}
        </TimeBtns>
        <Title>오후</Title>
        <TimeBtns>
          {afternoonTimeValue.map((list) => (
            <Button>{list}</Button>
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

const Title = styled.h2`
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
    color:white;
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
