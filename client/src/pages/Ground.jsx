import React from 'react';
import GroundSlide from 'components/organisms/GroundSlide';
import GroundReservationCalendar from 'components/organisms/GroundReservationCalendar';
import GroundTime from 'components/organisms/GroundTime';
import GroundInfo from '../components/organisms/GroundInfo';

const Ground = () => (
  <>
    <GroundSlide />
    <GroundInfo />
    <GroundReservationCalendar />
    <GroundTime />
  </>
);

export default Ground;
