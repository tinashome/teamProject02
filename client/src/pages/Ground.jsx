import React from 'react';
import styled from 'styled-components';
import GroundSlide from 'components/organisms/GroundSlide';
import GroundReservationCalendar from 'components/organisms/GroundReservationCalendar';
import GroundTime from 'components/organisms/GroundTime';
import Button from 'components/atoms/Button';
import GroundInfo from '../components/organisms/GroundInfo';

const Ground = () => (
  <>
    <GroundSlide />
    <Container>
      <GroundInfo />
      <GroundReservationCalendar />
      <GroundTime />
      <BackBtn>돌아가기</BackBtn>
      <ReservationBtn>예약하기</ReservationBtn>
    </Container>
  </>
);

const Container = styled.div`
  width: 80%;
  margin: auto;
`;

const ReservationBtn = styled(Button)`
  font-size: 18px;
  float: right;
  border: solid 1px black;
  margin: 1rem 1.5rem 2rem 0;
`;
const BackBtn = styled(Button)`
  font-size: 18px;
  color: #3563e9;
  background-color: white;
  border: solid 1px black;
  float: right;
  margin: 1rem 1rem 0 0;
`;
export default Ground;
