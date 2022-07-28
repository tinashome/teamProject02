import Pagination from 'components/organisms/Pagination';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Api from '../api/api';

const UserPointHistory = () => {
  const [pointHistory, setPointHistory] = useState([]);
  const [page, setPage] = useState(1);
  const listPerPage = 10;
  const totalPage = Math.ceil(pointHistory.length / listPerPage);
  const offset = (page - 1) * listPerPage;

  const getPoint = async () => {
    try {
      const result = await Api.get(`points/user?count=Infinity`);
      setPointHistory(result.data);
    } catch (err) {
      console.log(err);
    }
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
          {pointHistory.slice(offset, offset + listPerPage).map((item) => (
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
      <Pagination
        totalPage={totalPage}
        limit={5}
        page={page}
        setPage={setPage}
      />
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
  padding: 1.875rem 3.125rem 0 3.125rem;
  margin-top: 1.875rem;
  color: #000000;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5rem;
  margin-bottom: 1.125rem;
  padding-bottom: 0.75rem;
  border-bottom: 0.0625rem solid #9e9e9e;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  letter-spacing: 0.02875rem;

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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8125rem;
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
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
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.1875rem;
  text-align: center;
  letter-spacing: -0.03125rem;
`;

export default UserPointHistory;
