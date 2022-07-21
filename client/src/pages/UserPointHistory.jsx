import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Api from '../api/api';

const UserPointHistory = () => {
  const [pointHistory, setPointHistory] = useState([]);

  const getPoint = async () => {
    const result = await Api.get('points/user');
    setPointHistory(result.data);
  };

  const getCurrentDate = (data) => {
    const currentDate = new Date(data);

    const year = currentDate.getFullYear();
    const month = `0${currentDate.getMonth() + 1}`.slice(-2);
    const day = `0${currentDate.getDate()}`.slice(-2);

    const dateString = `${year}-${month}-${day}`;

    return dateString;
  };

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <Container>
      <Title>포인트 충전 내역</Title>
      <Wrapper>
        <PointHeader>
          <p>충전 날짜</p>
          <p>충전 금액</p>
          <p>승인 여부</p>
        </PointHeader>
        <Contents>
          {pointHistory.map((item) => (
            <Content key={item._id}>
              <PointInfo>
                <div>{getCurrentDate(item.createdAt)}</div>
                <div>{item.paymentAmount.toLocaleString()}P</div>
                {item.isCharged ? (
                  <Approval
                    style={{
                      padding: '0.3125rem 0.5rem',
                      border: 'none',
                      color: 'white',
                      background: '#3563e9',
                    }}
                  >
                    승인완료
                  </Approval>
                ) : (
                  <Approval>승인대기</Approval>
                )}
              </PointInfo>
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

const PointHeader = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.46px;
  border-bottom: 1px solid #9e9e9e;
  margin-bottom: 1.125rem;
  padding-bottom: 0.75rem;
  justify-content: space-between;

  & p:nth-child(1) {
    margin-left: 0.5rem;
  }

  & p:nth-child(2) {
    margin-left: 1.5rem;
  }
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

const PointInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.75rem;
`;

const Approval = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  padding: 0.25em 0.4375rem;
  border: 1px solid #3563e9;
  border-radius: 0.25rem;
  color: #3563e9;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.1875rem;
  text-align: center;
  letter-spacing: -0.03125rem;
`;

export default UserPointHistory;
