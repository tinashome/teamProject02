import React from 'react';
import styled from 'styled-components';
import { BiTimeFive } from 'react-icons/bi';
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

const GroundTime = () => (
  <Container>
    <TimeText>
      <BiTimeFive /> 시간 선택
    </TimeText>
    <Title>오전</Title>
    <ButtonContainer>
      {morningTimeValue.map((list) => (
        <TimeButton>{list}</TimeButton>
      ))}
    </ButtonContainer>
    <Title>오후</Title>
    <ButtonContainer>
      {afternoonTimeValue.map((list) => (
        <TimeButton>{list}</TimeButton>
      ))}
    </ButtonContainer>
  </Container>
);
const TimeText = styled.h1`
  font-size: 20px;
  text-align: center;
  border: solid red;
  width: 100%;
  height: 50px;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  border: solid black;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  border: solid black;
  margin: 5px;
  gap: 10px 0px;
`;
export default GroundTime;
