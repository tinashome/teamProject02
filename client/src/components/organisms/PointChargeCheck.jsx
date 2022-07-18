import React from 'react';
import styled from 'styled-components';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';

const PointChargeCheck = () => (
  <Container>
    <Lcontainer>
      <CheckValue>
        <Title>입금자명</Title>&nbsp;&nbsp;
        <InputTxt />
      </CheckValue>

      <CheckValue>
        <Title>결제 방법</Title>&nbsp;&nbsp;
        <input type='checkbox' />
        &nbsp;&nbsp;무통장 입금
      </CheckValue>
    </Lcontainer>

    <Rcontainer>
      <CheckValue>
        <input type='checkbox' />
        &nbsp;&nbsp;입금자명과 입금 금액을 확인하였습니다.
      </CheckValue>
      <ChargeBtn>충전하기</ChargeBtn>
    </Rcontainer>
  </Container>
);
const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 3rem 9rem 3rem 9rem;
`;
const Rcontainer = styled.div`
  width: 100%;
  margin-right: 11rem;
`;
const Lcontainer = styled.div`
  width: 100%;
  margin-left: 13rem;
`;
const CheckValue = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;
const InputTxt = styled(Input)`
  width: 20rem;
  height: 1.5rem;
`;
const ChargeBtn = styled(Button)`
  display: flex;
  margin-top: 1.7rem;
  font-size: 23px;
  padding: 0.7rem 7rem;
`;

export default PointChargeCheck;
