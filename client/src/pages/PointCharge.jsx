import React from 'react';
import styled from 'styled-components';
import PointChargeTitle from 'components/organisms/PointChargeTitle';
import PointChargeCard from 'components/organisms/PointChargeCard';
import PointChargeCheck from 'components/organisms/PointChargeCheck';
import ModalWrapper from 'components/atoms/AdminModalWrapper';
import ModalDiv from 'components/atoms/AdminModalDiv';
import { useRecoilState } from 'recoil';
import {
  modalState,
  pointSelected,
  orderNumber,
  issuedDate,
} from 'stores/pointChargeStore';

const PointCharge = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [selectedValue, setSelectedValue] = useRecoilState(pointSelected);
  const [orderNum, setOrderNum] = useRecoilState(orderNumber);
  const [createdDate, setCreatedDate] = useRecoilState(issuedDate);

  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <Container>
      <button type='button' onClick={modalClose}>
        버튼
      </button>
      <PointChargeTitle />
      <PointChargeCard />
      <PointChargeCheck />
      {modalOpen && (
        <ModalWrapper onClick={modalClose}>
          <PointModalDiv onClick={(e) => e.stopPropagation()}>
            <MainTitle>나의 포인트 충전 정보</MainTitle>
            <InfoDetail>
              <Title>주문번호 : </Title>
              <Info>{orderNum}</Info>
            </InfoDetail>
            <InfoDetail>
              <Title>결제금액 : </Title>
              <Info>{selectedValue.toLocaleString()}원</Info>
            </InfoDetail>
            <InfoDetail>
              <Title>계좌주명(사업자) : </Title>
              <Info>풋살예약닷컴(주)</Info>
            </InfoDetail>
            <InfoDetail>
              <Title>고정 가상 계좌 : </Title>
              <Info>[국민은행] 104440-00-288818</Info>
            </InfoDetail>
            <InfoDetail>
              <Title>결제방식 : </Title>
              <Info>고정계좌 입금 (무통장)</Info>
            </InfoDetail>
            <InfoDetail>
              <Title>발급일시 : </Title>
              <Info>{createdDate}</Info>
            </InfoDetail>
          </PointModalDiv>
        </ModalWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% auto;
`;

const MainTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 0 1rem 1.5rem 0;
`;

const InfoDetail = styled.div`
  display: flex;
  margin-right: auto;
  margin-bottom: 0.5rem;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const Info = styled.div`
  font-size: 30px;
  margin-left: 0.7rem;
`;

const PointModalDiv = styled(ModalDiv)`
  display: flex;
  justify-content: center;
  width: 45rem;
  height: 24rem;
  margin-left: -20rem;
  margin-top: -10rem;
`;
export default PointCharge;
