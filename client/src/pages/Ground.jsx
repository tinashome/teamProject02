import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GroundSlide from 'components/organisms/GroundSlide';
import GroundReservationCalendar from 'components/organisms/GroundReservationCalendar';
import GroundTime from 'components/organisms/GroundTime';
import Button from 'components/atoms/Button';
import { Link, useParams } from 'react-router-dom';
import * as Api from 'api/api';
import { useRecoilState } from 'recoil';
import { selectBtnValue, selectDateValue } from 'stores/reservationStore';
import GroundInfo from '../components/organisms/GroundInfo';

const Ground = () => {
  const [detailInfo, setDetailInfo] = useState([]);
  const [reservationInfo, setReservationInfo] = useState([]);
  const [reservationDate, setReservationDate] = useRecoilState(selectDateValue);
  const [reservationTime, setReservationTime] = useRecoilState(selectBtnValue);

  const params = useParams();
  const groundId = params.id;
  const getInfoList = async () => {
    try {
      const result = await Api.get(`grounds/${params.id}`);
      const reservationResult = await Api.get(`rentals/ground/${params.id}`);
      setDetailInfo(result.data);
      setReservationInfo(reservationResult.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoList();
  }, []);

  const reservationClick = async () => {
    try {
      await Api.post('rentals', { groundId, reservationDate, reservationTime });
      alert('예약되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <GroundSlide info={detailInfo.groundImg} />
      <Container>
        <GroundInfo info={detailInfo} />
        <GroundReservationCalendar info={reservationInfo} />
        <GroundTime info={detailInfo} />
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
