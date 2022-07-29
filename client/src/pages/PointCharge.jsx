import React, { useState, useEffect } from 'react';
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
import ClipboardCopy from 'components/atoms/ClipboardCopy';
import Button from 'components/atoms/Button';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import {useNavigate} from 'react-router-dom';


const PointCharge = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [selectedValue, setSelectedValue] = useRecoilState(pointSelected);
  const [orderNum, setOrderNum] = useRecoilState(orderNumber);
  const [createdDate, setCreatedDate] = useRecoilState(issuedDate);

  const [payName, setPayName] = useState('');
  const [paymentOption, setPaymentOption] = useState(false);
  const [checkValid, setCheckValid] = useState(false);
  const navigate = useNavigate();
  const modalClose = () => {
    setModalOpen(!modalOpen);
    navigate('/');
  };

  return (
    <Container>
      <PointChargeTitle />
      <PointChargeCard />
      <PointChargeCheck
        payName={payName}
        setPayName={setPayName}
        paymentOption={paymentOption}
        setPaymentOption={setPaymentOption}
        checkValid={checkValid}
        setCheckValid={setCheckValid}
      />
      {modalOpen && (
        <ModalWrapper onClick={modalClose}>
          <PointModalDiv onClick={(e) => e.stopPropagation()}>
            <AiOutlineClose onClick={modalClose} />
            <MainTitle>포인트 충전 정보</MainTitle>
            <InfoDetail>
              <Title>주문번호&nbsp;: </Title>
              <Info>{orderNum}</Info>
            </InfoDetail>
            <InfoDetail>
              <Title>결제금액&nbsp;: </Title>
              <Info>{selectedValue.toLocaleString()}원</Info>
            </InfoDetail>
            <InfoDetail>
              <Title>계좌주명 (사업자)&nbsp;: </Title>
              <Info>풋살예약닷컴(주)</Info>
            </InfoDetail>
            <InfoDetail>
              <Title>고정 가상 계좌&nbsp;: </Title>
              <Info>[국민은행] 104440-00-288818</Info>
              <ClipboardCopy />
            </InfoDetail>
            <InfoDetail>
              <Title>결제방식&nbsp;: </Title>
              <Info>고정계좌 입금 (무통장)</Info>
            </InfoDetail>
            <InfoDetail>
              <Title>발급일시&nbsp;: </Title>
              <Info>{createdDate}</Info>
            </InfoDetail>
            <CheckBtn onClick={modalClose}> 확인</CheckBtn>
          </PointModalDiv>
        </ModalWrapper>
      )}
    </Container>
  );
};

const CheckBtn = styled(Button)`
  margin-top: 0.3rem;
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% auto;
`;

const MainTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 1rem 1.5rem 0;
`;

const InfoDetail = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: 6rem;
  margin-bottom: auto;
`;
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
const Info = styled.div`
  font-size: 1.2rem;
  margin: 0.2rem 0 0.7rem 0.5rem;
`;

const PointModalDiv = styled(ModalDiv)`
  display: flex;
  justify-content: center;
  width: 45rem;
  height: 24rem;
  margin-left: -20rem;
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
export default PointCharge;
