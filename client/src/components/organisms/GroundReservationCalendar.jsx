import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import moment from 'moment';
import { BiCalendarCheck } from '@react-icons/all-files/bi/BiCalendarCheck';
import 'react-calendar/dist/Calendar.css';
import { FaAngleDown } from '@react-icons/all-files/fa/FaAngleDown';
import { FaAngleUp } from '@react-icons/all-files/fa/FaAngleUp';

const GroundReservationCalendar = ({
  info,
  reservationinfo,
  setReservationDate,
  setReservationDateInfo,
  dateValue,
  setDateValue,
}) => {
  const [calendarShowBtn, setCalendarShowBtn] = useState(true);

  useEffect(() => {
    const dateFormat = moment(dateValue).format('MMDD');
    const result = reservationinfo
      .filter((list) => list.reservationDate === dateFormat)
      .map((list) => list.reservationTime);
    setReservationDateInfo(result); // 0727 = [11:00~12:00, 13:00~14:00]
    setReservationDate(dateFormat);
  }, [info, dateValue]);

  const handleClick = () => {
    setCalendarShowBtn(!calendarShowBtn);
  };
  return (
    <Container>
      <DateNavbar onClick={handleClick}>
        <DateText>
          &nbsp;
          <BiCalendarCheck /> 예약 날짜{' '}
          <DateSelectText>
            {moment(dateValue).format('YYYY년 MM월 DD일')}
          </DateSelectText>
        </DateText>
        <ShowBtn>{calendarShowBtn ? <FaAngleUp /> : <FaAngleDown />}</ShowBtn>
      </DateNavbar>

      <CalendarUI
        style={calendarShowBtn ? { display: 'flex' } : { display: 'none' }}
      >
        <StyleCalendar
          onChange={setDateValue}
          minDate={new Date()}
          value={dateValue}
          formatDay={(locale, date) => moment(date).format('DD')}
          tileClassName={(activeStartDate, date, view) =>
            view === 'month' && date.getDay() === 3 ? 'Wednesday' : ''
          }
        />
      </CalendarUI>
    </Container>
  );
};

const DateSelectText = styled.div`
  font-size: 0.9rem;
  color: #868e96;
  margin-top: 0.2rem;
  margin-left: 5rem;
`;

const StyleCalendar = styled(Calendar)`
  width: 100%;
  border: solid 1px #dee2e6;

  button:disabled {
    color: #1010104d !important;
  }

  .react-calendar__month-view {
    & div div :nth-child(2) {
      & :nth-child(7n) {
        color: red;
      }
      & :nth-child(7n - 1) {
        color: blue;
      }
    }
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575 !important;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const CalendarUI = styled.div`
  justify-content: center;
`;

const DateNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
  margin: 1rem 0 2rem 0;
  cursor: pointer;
`;

const DateText = styled.h1`
  display: flex;
  font-size: 20px;
  text-align: left;
  height: 2rem;
  padding: 0 1rem;

  svg {
    margin-right: 0.5rem;
  }
`;

const ShowBtn = styled.button`
  font-size: 20px;
  text-align: right;
  margin-right: 0.8rem;
  margin-bottom: 0.8rem;
`;

export default GroundReservationCalendar;
