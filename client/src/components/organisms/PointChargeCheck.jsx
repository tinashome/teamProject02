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
        const formatDate = moment(date).format('YYYY년 MM월 DD일 HH시');
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
          <TxtValid>
            <InputTxt onChange={(e) => setDepositorName(e.target.value)} />
            입금자명을 입력해주세요(최소 2자 이상)
          </TxtValid>
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
  margin: 3rem 9rem 3rem 15rem;
`;
const Rcontainer = styled.div`
  width: 100%;
  margin-right: 5rem;
`;
const Lcontainer = styled.div`
  width: 100%;
  margin-left: 7rem;
`;
const CheckValue = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-right: 0.5rem;
`;
const InputTxt = styled(Input)`
  width: 20rem;
  height: 1.5rem;
`;
const ChargeBtn = styled(Button)`
  display: flex;
  margin: 1.7rem 0 0 0.5rem;
  font-size: 23px;
  padding: 0.7rem 7rem;
`;
const TxtValid = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-left: 0.5rem;
  color: #bdbdbd;
`;
const CheckBox = styled.input`
  width: 1rem;
  margin: 0 0.5rem 0 0.5rem;
`;
export default PointChargeCheck;
