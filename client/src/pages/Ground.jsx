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
import { useSetRecoilState } from 'recoil';
import { userPointState } from 'stores/userStore';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
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
  const imgModalCurser = true;
  const params = useParams();
  const groundId = params.id;
  const navigate = useNavigate();
  const warningText =
    '※ 예약 시간 중 제일 빠른 예약시간 기준 24시간 전까지만 예약취소, 변경이 가능합니다.';

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

  const setTotalPoint = useSetRecoilState(userPointState);
  const reservationClick = async () => {
    try {
      if (reservationTime.length > 0) {
        await Api.post('rentals', {
          groundId,
          reservationDate,
          reservationTime,
        });
        setTotalPoint((prev) => ({ ...prev, isChange: true }));
        alert('예약되었습니다.');
        navigate('/');
      }
    } catch (err) {
      alert(err.response.data.reason);
      setModalShow(!modalShow);
    }
  };

  const reservationBtn = () => {
    if (reservationTime.length > 0) {
      setModalShow(!modalShow);
    } else {
      alert('예약시간을 선택해주세요.');
    }
  };
  useEffect(() => {
    getInfoList();
  }, []);

  useEffect(() => {
    getReservation();
    setFormatDate(moment(dateValue).format('MM월 DD일'));
  }, [dateValue]);

  useEffect(() => {
    if (modalShow) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }, [modalShow]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <GroundSlide
        info={detailInfo.groundImg}
        showImgModal={showImgModal}
        setShowImgModal={setShowImgModal}
        imgModalCurser={imgModalCurser}
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
          <ReservationBtn onClick={reservationBtn}>예약하기</ReservationBtn>
        </ReservationList>

        {modalShow && (
          <ModalWrapper onClick={() => setModalShow(!modalShow)}>
            <ReservationCheckModal onClick={(e) => e.stopPropagation()}>
              <AiOutlineClose onClick={() => setModalShow(!modalShow)} />
              <MainTitle>[ 예약 확인 ]</MainTitle>
              <InfoDetail>
                <SubTitle>경기장 이름&nbsp; :</SubTitle>
                <Info>{detailInfo.groundName}</Info>
              </InfoDetail>
              <InfoDetail>
                <SubTitle>예약 날짜&nbsp; :</SubTitle>
                <Info>{formatDate}</Info>
              </InfoDetail>
              <InfoDetail>
                <SubTitle>예약 시간&nbsp; :</SubTitle>
                <Info>
                  {reservationTime.map((list) => (
                    <ReservationTimeList>{list}&nbsp;</ReservationTimeList>
                  ))}
                </Info>
              </InfoDetail>
              <InfoDetail>
                <SubTitle>결제 포인트&nbsp; :</SubTitle>
                <Info>
                  {(
                    detailInfo.paymentPoint * reservationTime.length
                  ).toLocaleString()}{' '}
                  P
                </Info>
              </InfoDetail>
              <WarningText>{warningText}</WarningText>
              <ButtonList>
                <CheckButton onClick={() => reservationClick()}>
                  확인
                </CheckButton>
                <CancelButton onClick={() => setModalShow(!modalShow)}>
                  취소
                </CancelButton>
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
  width: 100%;
`;

const InfoMainTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin: 3rem 1rem;
`;
const GroundInfoList = styled.div`
  width: 50%;
  margin-bottom: 3rem;
`;

const ReservationBtn = styled(Button)`
  font-size: 0.8rem;
  font-weight: bold;
  float: right;
  border: solid 1px #adb5bd;
  margin: 1rem 0.5rem 2rem 0;
`;
const BackBtn = styled(Button)`
  font-size: 0.8rem;
  font-weight: bold;
  color: #3563e9;
  background-color: white;
  border: solid 1px #adb5bd;
  float: right;
  margin: 1rem 2rem 0 0;
`;

const ReservationList = styled.div`
  position: sticky;
  top: 0;
  border: solid 1px #e9ecef;
  border-radius: 0.7rem;
  width: 30%;
  height: 60%;
  margin-bottom: 4rem;
`;

const ReservationCheckModal = styled(ModalDiv)`
  position: fix;
  justify-content: center;
  width: 50rem;
  height: 23rem;
  margin-left: -25rem;
  margin-top: -10rem;
  svg {
    top: 25px;
    position: absolute;
    font-size: 20px;
    right: 30px;
    cursor: pointer;
    border-radius: 4px;
    opacity: 0.6;
    &:hover {
      background: #ced4da;
    }
  }
`;

const MainTitle = styled.h1`
  font-weight: bold;
  width: 100%;
  margin-bottom: 1rem;
`;

const InfoDetail = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 80%;
  margin: 0.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: bold;
  width: 21%;
  text-align: right;
  margin-left: 1rem;
  margin-bottom: auto;
`;

const Info = styled.p`
  display: flex;
  width: 70%;
  font-size: 1.3rem;
  text-align: left;
  margin-left: 0.5rem;
  margin-bottom: auto;
  flex-wrap: wrap;
  gap: 0.5rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
