import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GroundReservationCalendar from '../components/organisms/GroundReservationCalendar';
import MyinfoGroundTime from '../components/organisms/MyinfoGroundTime';
import * as Api from '../api/api';

const RentalChange = () => {
  const [reservationInfo, setReservationInfo] = useState([]);
  const [detailInfo, setDetailInfo] = useState([]);

  const [reservationDate, setReservationDate] = useState('');
  const [reservationDateInfo, setReservationDateInfo] = useState([]);
  const [dateValue, setDateValue] = useState(new Date());

  const [reservationTime, setReservationTime] = useState([]);

  const params = useParams();
  const groundId = params.groundid;
  const rentalId = params.rentalid;

  const navigate = useNavigate();

  const getInfoList = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClick = async () => {
    try {
      if (reservationTime.length > 0) {
        await Api.patch(`rentals/${rentalId}`, {
          reservationDate,
          reservationTime,
        });
        alert('예약이 변경 되었습니다.');
        navigate('/myinfo');
      } else {
        alert('예약시간을 선택 해주세요.');
      }
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  useEffect(() => {
    getInfoList();
  }, []);

  useEffect(() => {
    getReservation();
  }, [dateValue]);

  return (
    <Container>
      <Wrapper>
        <GroundReservationCalendar
          info={detailInfo}
          reservationinfo={reservationInfo}
          reservationDate={reservationDate}
          setReservationDate={setReservationDate}
          setReservationDateInfo={setReservationDateInfo}
          dateValue={dateValue}
          setDateValue={setDateValue}
        />
        <MyinfoGroundTime
          info={detailInfo}
          dateValue={dateValue}
          reservationDateInfo={reservationDateInfo}
          reservationTime={reservationTime}
          setReservationTime={setReservationTime}
        />
        <ButtonBox>
          <button type='button' onClick={handleOnClick}>
            변경하기
          </button>
          <button type='button'>
            <NavLink to='/myinfo'>돌아가기</NavLink>
          </button>
        </ButtonBox>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  margin: 0.9375rem 3rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;

  & button {
    padding: 0.75rem 1rem;
    margin: 0.5rem 2rem;
    border-radius: 0.25rem;
    color: white;
    background: #3563e9;
    font-size: 1.125rem;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export default RentalChange;
