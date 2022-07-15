import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import moment from 'moment';
import { BiCalendarCheck } from 'react-icons/bi';
import 'react-calendar/dist/Calendar.css';

const GroundReservationCalendar = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  return (
    <Container>
      <DateText>
        <BiCalendarCheck /> {moment(selectDate).format('YYYY년 MM월 DD일')}
      </DateText>

      <CalendarUI>
        <Calendar onChange={setSelectDate} value={selectDate} />
      </CalendarUI>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  border: solid black;
  margin: 5px;
`;

const CalendarUI = styled.div`
  display: flex;
  justify-content: center;
`;

const DateText = styled.h1`
  font-size: 20px;
  text-align: center;
  border: solid red;
  width: 100%;
  height: 50px;
`;
export default GroundReservationCalendar;
