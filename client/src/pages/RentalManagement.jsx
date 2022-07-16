import React from 'react';
import styled from 'styled-components';

const RentalManagement = () => (
  <Container>
    <Title>예약 조회</Title>
    <Wrapper>
      <Contents>
        <Content>
          <RentalDate>2022-07-14</RentalDate>
          <RentalInfo>
            <GroundName>삼락생태공원 - 잔디구장</GroundName>
            <Time>14:00~15:00</Time>
            <Button>예약취소</Button>
          </RentalInfo>
        </Content>
        <Content>
          <RentalDate>2022-07-14</RentalDate>
          <RentalInfo>
            <GroundName>삼락생태공원 - 잔디구장</GroundName>
            <Time>14:00~15:00</Time>
            <Button>예약취소</Button>
          </RentalInfo>
        </Content>
        <Content>
          <RentalDate>2022-07-14</RentalDate>
          <RentalInfo>
            <GroundName>삼락생태공원 - 잔디구장</GroundName>
            <Time>14:00~15:00</Time>
            <Button>예약취소</Button>
          </RentalInfo>
        </Content>
        <Content>
          <RentalDate>2022-07-14</RentalDate>
          <RentalInfo>
            <GroundName>삼락생태공원 - 잔디구장</GroundName>
            <Time>14:00~15:00</Time>
            <Button>예약취소</Button>
          </RentalInfo>
        </Content>
        <Content>
          <RentalDate>2022-07-14</RentalDate>
          <RentalInfo>
            <GroundName>삼락생태공원 - 잔디구장</GroundName>
            <Time>14:00~15:00</Time>
            <Button>예약취소</Button>
          </RentalInfo>
        </Content>
        <Content>
          <RentalDate>2022-07-14</RentalDate>
          <RentalInfo>
            <GroundName>삼락생태공원 - 잔디구장</GroundName>
            <Time>14:00~15:00</Time>
            <Button>예약취소</Button>
          </RentalInfo>
        </Content>
      </Contents>
    </Wrapper>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  line-height: 3rem;
  padding: 1.875rem 3.125rem;
  margin-top: 1.875rem;
  color: #000000;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.0625rem;
`;

const Wrapper = styled.div`
  height: 100%;
  margin: 0.9375rem 3rem;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & input {
    width: 50%;
    padding: 0.875rem 1rem;
    margin: 0.5rem 5rem 0.5rem 1rem;
    border: 0.0625rem solid #ced4da;
    border-radius: 0.25rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
`;

const RentalInfo = styled.div`
  display: flex;
  margin-bottom: 1.75rem;
`;

const RentalDate = styled.div`
  margin-bottom: 0.75rem;
`;

const GroundName = styled.div``;

const Time = styled.div`
  display: flex;
  margin-left: auto;
`;

const Button = styled.button`
  display: flex;
  margin-left: 3.5rem;
  padding: 0.3125rem 0.5rem;
  border-radius: 0.25rem;
  color: white;
  background: #3563e9;
  font-size: 1.125rem;

  &:hover {
    opacity: 0.7;
  }
`;

export default RentalManagement;
