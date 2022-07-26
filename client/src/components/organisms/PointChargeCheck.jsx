import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
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

const PointChargeCheck = () => {
  const [depositorName, setDepositorName] = useState('');
  const [paymentOption, setPaymentOption] = useState(false);
  const [checkValid, setCheckValid] = useState(false);
  const [paymentAmount, setPaymentAmount] = useRecoilState(pointSelected);
  const [modalShow, setModalShow] = useRecoilState(modalState);
  const [orderNum, setOrderNum] = useRecoilState(orderNumber);
  const [createdDate, setCreatedDate] = useRecoilState(issuedDate);

  const getCurrentDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(1 + date.getMonth()).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);
    return `${year}년 ${month}월 ${day}일`;
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const userRole = jwtDecode(token).role;
      const regex = /[가-힣]+/u;

      if (userRole == null) alert('로그인이 필요합니다.');
      else if (paymentAmount === 0) alert('충전하실 포인트를 선택해 주세요.');
      else if (depositorName.length < 2) alert('이름을 2자 이상 입력해주세요.');
      else if (!regex.test(depositorName)) alert('이름을 확인해주세요.');
      else if (!paymentOption) alert('결제 방법을 선택해 주세요.');
      else if (!checkValid)
        alert('입금자명과 결제방식 확인항목을 확인해주세요.');
      else {
        const setInfo = { paymentOption, paymentAmount };
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
          <InputTxt onChange={(e) => setDepositorName(e.target.value)} />
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
        <ChargeBtn onClick={handleClick}>충전하기</ChargeBtn>
      </Rcontainer>
    </Container>
  );
};

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
  margin-right: 0.5rem;
`;

export default PointChargeCheck;
