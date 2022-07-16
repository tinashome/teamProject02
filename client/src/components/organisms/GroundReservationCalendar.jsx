import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import moment from 'moment';
import { BiCalendarCheck } from 'react-icons/bi';
import 'react-calendar/dist/Calendar.css';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';

const GroundReservationCalendar = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  // const [dateState, setDateState] = useState(true);

  return (
    <Container>
      <DateNavbar>
        <DateText>
          <BiCalendarCheck /> 예약 날짜{' '}
          {moment(selectDate).format('YYYY년 MM월 DD일')}
        </DateText>
        <ShowBtn>
          <BsArrowDownCircle />
          <BsArrowUpCircle />
        </ShowBtn>
      </DateNavbar>

      <CalendarUI>
        <StyleCalendar onChange={setSelectDate} value={selectDate} />
      </CalendarUI>
    </Container>
  );
};
const StyleCalendar = styled(Calendar)`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  margin: 1.5rem 0 0 0;
`;

const CalendarUI = styled.div`
  display: flex;
  justify-content: center;
`;

const DateNavbar = styled.div`
  display: flex;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  boder-bottom-color: #0000004d;
  margin: 4rem 0 2rem 0;
`;

const DateText = styled.h1`
  font-size: 20px;
  text-align: left;
  width: 100%;
  height: 2rem;
`;

const ShowBtn = styled.button`
  font-size: 20px;
  text-align: right;
  width: 100%;
  margin-right: 0.8rem;
`;
export default GroundReservationCalendar;
