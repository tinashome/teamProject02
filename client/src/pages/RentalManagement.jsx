import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import userState from 'stores/userStore';
import styled from 'styled-components';
import * as Api from '../api/api';

const RentalManagement = () => {
  const [rental, setRental] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  const rentalInformation = async () => {
    try {
      const result = await Api.get('rentals/user');
      setRental(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const userInformation = async () => {
    try {
      const result = await Api.get('users/user');
      setUser((prev) => ({ ...prev, ...result.data }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    rentalInformation();
    userInformation();
  }, []);

  const handleClick = async (rentalId) => {
    if (window.confirm('예약을 정말 취소하시겠습니까?')) {
      try {
        const result = await Api.delete(`rentals/${rentalId}`);
        if (result.status === 204) {
          alert('예약이 취소 되었습니다.');
          rentalInformation();
          userInformation();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container>
      <Title>예약 조회</Title>
      {user.totalPoint && (
        <Point>{`내 포인트 : ${user.totalPoint.toLocaleString()}P`}</Point>
      )}
      <Wrapper>
        <Contents>
          {rental.map((item) => (
            <Content key={item._id}>
              <RentalDate>
                {item.reservationDate.split('/').join('-')}
              </RentalDate>
              <RentalInfo>
                <GroundName>
                  {item.groundName.length >= 14
                    ? `${item.groundName.slice(0, 13)}...`
                    : item.groundName}
                </GroundName>
                <Time>{item.reservationTime}</Time>
                <Button onClick={() => handleClick(item._id)}>예약취소</Button>
              </RentalInfo>
            </Content>
          ))}
        </Contents>
      </Wrapper>
    </Container>
  );
};

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
  padding: 1.875rem 3.125rem 0;
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.8125rem;
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

const Point = styled.div`
  text-align: end;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.8125rem;
`;

export default RentalManagement;
