import React from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import { useRecoilState } from 'recoil';
import {
  pointSelected,
  modalState,
  orderNumber,
  issuedDate,
} from 'stores/pointChargeStore';
import * as Api from 'api/api';

const PointChargeCheck = ({
  payName,
  setPayName,
  paymentOption,
  setPaymentOption,
  checkValid,
  setCheckValid,
}) => {
  const [paymentAmount, setPaymentAmount] = useRecoilState(pointSelected);
  const [modalShow, setModalShow] = useRecoilState(modalState);
  const [orderNum, setOrderNum] = useRecoilState(orderNumber);
  const [createdDate, setCreatedDate] = useRecoilState(issuedDate);
  const navigate = useNavigate();

  const getCurrentDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(1 + date.getMonth()).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const userRole = jwtDecode(token).role;
      const regex = /[가-힣]+/u;

      if (userRole == null) alert('로그인이 필요합니다.');
      else if (paymentAmount === 0) alert('충전하실 포인트를 선택해 주세요.');
      else if (payName.length < 2) alert('이름을 2자 이상 입력해주세요.');
      else if (!regex.test(payName)) alert('이름을 확인해주세요.');
      else if (!paymentOption) alert('결제 방법을 선택해 주세요.');
      else if (!checkValid)
        alert('입금자명과 결제방식 확인항목을 확인해주세요.');
      else {
        const setInfo = { payName, paymentOption, paymentAmount };
        const result = await Api.post('points', setInfo);
        const order = new Date().valueOf();
        const date = new Date();
        const formatDate = getCurrentDate(date);
        if (result.status === 201) {
          setModalShow(!modalShow);
          setOrderNum(order);
          setCreatedDate(formatDate);
        }
      }
    } catch (err) {
      alert('로그인이 필요합니다');
      navigate('/login');
    }
  };
  return (
    <Container>
      <Lcontainer>
        <CheckValue>
          <Title>입금자명</Title>
          <InputTxt onChange={(e) => setPayName(e.target.value)} />
        </CheckValue>
        <CheckValue>
          <Title>결제 방법</Title>
          <CheckBox
            type='checkbox'
            onChange={() => setPaymentOption(!paymentOption)}
          />
          무통장 입금
        </CheckValue>
      </Lcontainer>
      <Rcontainer>
        <CheckValue>
          <CheckBox
            type='checkbox'
            onChange={() => setCheckValid(!checkValid)}
          />
          입금자명과 입금 금액을 확인하였습니다.
        </CheckValue>
        <BtnList>
          <ChargeBtn onClick={handleClick}>충전하기</ChargeBtn>
        </BtnList>
      </Rcontainer>
    </Container>
  );
};

const BtnList = styled.div`
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0;
`;
const Rcontainer = styled.div``;

const Lcontainer = styled.div``;

const CheckValue = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-right: 1rem;
`;
const InputTxt = styled(Input)`
  width: 65%;
  padding: 6px 12px;
`;

const ChargeBtn = styled(Button)`
  width: 100%;
  font-size: 23px;
`;

const CheckBox = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;

export default PointChargeCheck;
