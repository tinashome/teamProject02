import React from 'react';
import styled from 'styled-components';
import ChargeDetailTitle from 'components/organisms/ChargeDetailTitle';

const ChargeDetailInfo = () => (
  <Container>
    <ChargeDetailTitle />;
    <InfoDetail>
      <InfoText>
        <Title>주문번호 :</Title>
        <Info>주문번호 </Info>
      </InfoText>

      <InfoText>
        <Title>결제금액 : </Title>
        <Info>결제금액</Info>
      </InfoText>

      <InfoText>
        <Title>계좌주명(사업자) :</Title>
        <Info>풋살예약닷컴(주)</Info>
      </InfoText>

      <InfoText>
        <Title>고정 가상 계좌 :</Title>
        <Info>[국민은행] 104440-00-288818 </Info>
      </InfoText>

      <InfoText>
        <Title>결제 방식 :</Title>
        <Info>고정계좌 입금</Info>
      </InfoText>

      <InfoText>
        <Title>발급일시 :</Title>
        <Info>발급 날짜</Info>
      </InfoText>
    </InfoDetail>
  </Container>
);
const Container = styled.div`
  width: 80%;
`;

const InfoDetail = styled.div`
  width: 70%;
  height: 23rem;
  margin-left: 20rem;
  padding: 3rem;
  border: solid #bdbdbd;
`;
const InfoText = styled.div`
  display: flex;
  margin: 1rem;
  border: solid green;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  border: solid blue;
`;

const Info = styled.div`
  font-size: 20px;
  border: solid blue;
`;

export default ChargeDetailInfo;
