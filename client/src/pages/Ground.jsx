import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GroundSlide from 'components/organisms/GroundSlide';
import GroundReservationCalendar from 'components/organisms/GroundReservationCalendar';
import GroundTime from 'components/organisms/GroundTime';
import Button from 'components/atoms/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as Api from 'api/api';
import Spinner from 'components/atoms/Spinner';
import ModalDiv from 'components/atoms/AdminModalDiv';
import ModalWrapper from 'components/atoms/AdminModalWrapper';
import moment from 'moment';
import GroundInfo from '../components/organisms/GroundInfo';

const Ground = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [detailInfo, setDetailInfo] = useState([]);
  const [reservationInfo, setReservationInfo] = useState([]);

  const [reservationDate, setReservationDate] = useState('');
  const [reservationDateInfo, setReservationDateInfo] = useState([]);
  const [dateValue, setDateValue] = useState(new Date());

  const [reservationTime, setReservationTime] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const [formatDate, setFormatDate] = useState(
    moment(dateValue).format('MM월 DD일'),
  );

  const [showImgModal, setShowImgModal] = useState(false);
  const [imgModalCurser, setImgModalCurser] = useState(true);
  const params = useParams();
  const groundId = params.id;
  const navigate = useNavigate();
  const getInfoList = async () => {
    try {
      setIsLoading(true);
      const result = await Api.get(`grounds/${groundId}`);
      setDetailInfo(result.data);
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  const getReservation = async () => {
    try {
      const reservationResult = await Api.get(`rentals/ground/${groundId}`);
      setReservationInfo(reservationResult.data);
      setIsLoading(false);
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  const reservationClick = async () => {
    try {
      if (reservationTime.length > 0) {
        await Api.post('rentals', {
          groundId,
          reservationDate,
          reservationTime,
        });
        alert('예약되었습니다.');
        navigate('/');
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
    setFormatDate(moment(dateValue).format('MM월 DD일'));
  }, [dateValue]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <GroundSlide
        info={detailInfo.groundImg}
        showImgModal={showImgModal}
        setShowImgModal={setShowImgModal}
        imgModalCurser ={imgModalCurser}
      />
      <InfoMainTitle>{detailInfo.groundName}</InfoMainTitle>
      <Container>
        <GroundInfoList>
          <GroundInfo info={detailInfo} />
        </GroundInfoList>
        <ReservationList>
          <GroundReservationCalendar
            info={detailInfo}
            reservationinfo={reservationInfo}
            reservationDate={reservationDate}
            setReservationDate={setReservationDate}
            setReservationDateInfo={setReservationDateInfo}
            dateValue={dateValue}
            setDateValue={setDateValue}
          />
          <GroundTime
            info={detailInfo}
            dateValue={dateValue}
            reservationDateInfo={reservationDateInfo}
            reservationTime={reservationTime}
            setReservationTime={setReservationTime}
          />
          <BackBtn>
            <Link to='/'>돌아가기</Link>{' '}
          </BackBtn>
          <ReservationBtn onClick={() => setModalShow(!modalShow)}>
            예약하기
          </ReservationBtn>
        </ReservationList>

        {modalShow && (
          <ModalWrapper onClick={() => setModalShow(!modalShow)}>
            <ReservationCheckModal>
              <MainTitle>[ 예약 확인 ]</MainTitle>
              <InfoDetail>
                <SubTitle>경기장 이름 :</SubTitle>
                <Info>{detailInfo.groundName}</Info>
              </InfoDetail>
              <InfoDetail>
                <SubTitle>예약 날짜 :</SubTitle>
                <Info>{formatDate}</Info>
              </InfoDetail>
              <InfoDetail>
                <SubTitle>예약 시간 :</SubTitle>
                <Info>
                  {reservationTime.map((list) => (
                    <ReservationTimeList>{list}&nbsp;</ReservationTimeList>
                  ))}
                </Info>
              </InfoDetail>
              <InfoDetail>
                <SubTitle>결제 포인트 :</SubTitle>
                <Info>
                  {(
                    detailInfo.paymentPoint * reservationTime.length
                  ).toLocaleString()}{' '}
                  P
                </Info>
              </InfoDetail>
              <WarningText>
                ※ 예약 완료 후 24시간이 지나고 예약 취소가 가능합니다.
              </WarningText>
              <ButtonList>
                <CheckButton onClick={() => reservationClick()}>
                  확인
                </CheckButton>
                <CancelButton>취소</CancelButton>
              </ButtonList>
            </ReservationCheckModal>
          </ModalWrapper>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin: 0 auto;
  width: 80rem;
`;

const InfoMainTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 1rem 2rem 1rem;
`;
const GroundInfoList = styled.div`
  width: 60%;
`;

const ReservationBtn = styled(Button)`
  font-size: 0.8rem;
  font-weight: bold;
  float: right;
  border: solid 1px black;
  margin: 1rem 1.5rem 2rem 0;
`;
const BackBtn = styled(Button)`
  font-size: 0.8rem;
  font-weight: bold;
  color: #3563e9;
  background-color: white;
  border: solid 1px black;
  float: right;
  margin: 1rem 1rem 0 0;
`;

// 달력이랑 시간 버튼 css
const ReservationList = styled.div`
  position: sticky;
  top: 0;
  border: solid 1px #ced4da;
  border-radius: 0.7rem;
  width: 30%;
  height: 60%;
`;

const ReservationCheckModal = styled(ModalDiv)`
  justify-content: center;
  width: 45%;
  height: 50%;
  margin-left: -20rem;
  margin-top: -10rem;
`;

const MainTitle = styled.h1`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const InfoDetail = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0.5rem 0 0.5rem 0;
  width: 100%;
  height: 80%;
`;

const SubTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: bold;
  width: 11rem;
  text-align: right;
`;

const Info = styled.p`
  display: flex;
  font-size: 1.3rem;
  text-align: left;
  margin-left: 0.5rem;
`;

const ReservationTimeList = styled.div`
  font-size: 1rem;
  width: 4.8rem;
  border: solid 1px black;
  border-radius: 0.25rem;
  padding: 0.1rem;
  margin-right: 0.2rem;
`;

const ButtonList = styled.div`
  justify-content: center;
  margin-top: 0.5rem;
  font-weight: bold;
`;

const CheckButton = styled(Button)`
  margin: 0 0.5rem 0 0.5rem;
  border: solid 1px #bdbdbd;
`;

const CancelButton = styled(Button)`
  color: black;
  background-color: white;
  border: solid 1px #bdbdbd;
  margin: 0 0.5rem 0 0.5rem;
`;

const WarningText = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0.5rem 0 0.5rem 0;
`;

export default Ground;
