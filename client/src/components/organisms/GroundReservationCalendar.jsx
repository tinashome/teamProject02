import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import moment from 'moment';
import { BiCalendarCheck } from '@react-icons/all-files/bi/BiCalendarCheck';
import 'react-calendar/dist/Calendar.css';
import { FaAngleDown } from '@react-icons/all-files/fa/FaAngleDown';
import { FaAngleUp } from '@react-icons/all-files/fa/FaAngleUp';

import { useRecoilState } from 'recoil';
import {
  reservationDateInfo,
  selectDateValue,
  selectCalendarDate,
} from 'stores/reservationStore';

const GroundReservationCalendar = ({ info }) => {
  const [selectDate, setSelectDate] = useRecoilState(selectDateValue);
  const [calendarShowBtn, setCalendarShowBtn] = useState(true);
  const [reservationInfo, setReservationInfo] =
    useRecoilState(reservationDateInfo);

  const [dateValue, setDateValue] = useRecoilState(selectCalendarDate);

  useEffect(() => {
    const dateFormat = moment(dateValue).format('MMDD');
    if (info && info.length > 0) {
      const result = info
        .filter((list) => list.reservationDate === dateFormat)
        .map((list) => list.reservationTime);
      setReservationInfo(result); // 0727 = [11:00~12:00, 13:00~14:00]
      setSelectDate(dateFormat);
    }
  }, [info, selectDate, dateValue]);

  const handleClick = () => {
    setCalendarShowBtn(!calendarShowBtn);
  };

  return (
    <Container>
      <DateNavbar onClick={handleClick}>
        <DateText>
          <BiCalendarCheck /> 예약 날짜{' '}
          {moment(dateValue).format('YYYY년 MM월 DD일')}
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
        />
      </CalendarUI>
    </Container>
  );
};
const StyleCalendar = styled(Calendar)`
  width: 100%;
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
  border-bottom: 1px solid #0000004d;
  margin: 4rem 0 2rem 0;
  cursor: pointer;
`;

const DateText = styled.h1`
  font-size: 20px;
  text-align: left;
  height: 2rem;
`;

const ShowBtn = styled.button`
  font-size: 20px;
  text-align: right;
  margin-right: 0.8rem;
`;
export default GroundReservationCalendar;
