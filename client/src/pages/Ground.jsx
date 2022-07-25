import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GroundSlide from 'components/organisms/GroundSlide';
import GroundReservationCalendar from 'components/organisms/GroundReservationCalendar';
import GroundTime from 'components/organisms/GroundTime';
import Button from 'components/atoms/Button';
import { Link, useParams } from 'react-router-dom';
import * as Api from 'api/api';
import Spinner from 'components/atoms/Spinner';
import GroundInfo from '../components/organisms/GroundInfo';

const Ground = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [detailInfo, setDetailInfo] = useState([]);
  const [reservationInfo, setReservationInfo] = useState([]);

  const [reservationDate, setReservationDate] = useState('');
  const [reservationDateInfo, setReservationDateInfo] = useState([]);
  const [dateValue, setDateValue] = useState(new Date());

  const [reservationTime, setReservationTime] = useState([]);
  const params = useParams();
  const groundId = params.id;

  const getInfoList = async () => {
    try {
      setIsLoading(true);
      const result = await Api.get(`grounds/${groundId}`);
      setDetailInfo(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getReservation = async () => {
    try {
      const reservationResult = await Api.get(`rentals/ground/${groundId}`);
      setReservationInfo(reservationResult.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const reservationClick = async () => {
    try {
      if(reservationTime.length > 0){
      await Api.post('rentals', {
        groundId,
        reservationDate,
        reservationTime,
      });
      alert('예약되었습니다.');}
      else {
        alert('예약시간을 선택 해주세요.')
      }
    } catch (err) {
      alert('날짜와 시간을 정확히 선택해주세요.');
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoList();
  }, []);

  useEffect(() => {
    getReservation();
  }, [dateValue]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <GroundSlide info={detailInfo.groundImg} />
      <Container>
        <GroundInfo info={detailInfo} />
        <GroundReservationCalendar
          info={reservationInfo}
          setReservationDate={setReservationDate}
          setReservationDateInfo={setReservationDateInfo}
          dateValue={dateValue}
          setDateValue={setDateValue}
        />
        <GroundTime
          info={detailInfo}
          dateValue={dateValue}
          reservationDateInfo={reservationDateInfo}
          reservationDate={reservationDate}
          reservationTime={reservationTime}
          setReservationTime={setReservationTime}
        />
        <BackBtn>
          <Link to='/'>돌아가기</Link>{' '}
        </BackBtn>
        <ReservationBtn onClick={reservationClick}>예약하기</ReservationBtn>
      </Container>
    </>
  );
};

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
