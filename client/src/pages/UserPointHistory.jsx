import Pagination from 'components/organisms/Pagination';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineQuestionCircle } from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import ModalWrapper from '../components/atoms/AdminModalWrapper';
import ModalDiv from '../components/atoms/AdminModalDiv';
import ClipboardCopy from '../components/atoms/ClipboardCopy';
import Button from '../components/atoms/Button';
import * as Api from '../api/api';

const UserPointHistory = () => {
  const [pointHistory, setPointHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
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

  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <Container>
      <Title>
        포인트 충전 내역
        <ChargeInfoBtn>
          <button
            type='button'
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            <AiOutlineQuestionCircle />
            <span>입금계좌</span>
          </button>
        </ChargeInfoBtn>
      </Title>
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
      {modalOpen && (
        <ModalWrapper onClick={modalClose}>
          <PointModalDiv onClick={(e) => e.stopPropagation()}>
            <AiOutlineClose onClick={modalClose} />
            <MainTitle>입금계좌 정보</MainTitle>
            <InfoDetail>
              <SubTitle>계좌주명 (사업자)&nbsp;: </SubTitle>
              <Info>풋살예약닷컴(주)</Info>
            </InfoDetail>
            <InfoDetail>
              <SubTitle>고정 가상 계좌&nbsp;: </SubTitle>
              <Info>[국민은행] 104440-00-288818</Info>
              <ClipboardCopy />
            </InfoDetail>
            <CheckBtn onClick={modalClose}> 확인</CheckBtn>
          </PointModalDiv>
        </ModalWrapper>
      )}
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
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 3rem;
  padding: 1.875rem 3.125rem 0 3.125rem;
  margin-top: 1.875rem;
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.0625rem;
`;

const ChargeInfoBtn = styled.div`
  position: absolute;
  right: 3.125rem;
  opacity: 0.7;
  button {
    display: flex;
    align-items: center;
    padding-top: 1.25rem;
    font-size: 1.25rem;
  }
  span {
    margin: 0 0.3rem;
    padding-bottom: 0.1875rem;
  }
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

const MainTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 1rem 4rem 0;
`;

const InfoDetail = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: 6rem;
  margin-bottom: auto;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Info = styled.div`
  font-size: 1.2rem;
  margin: 0.2rem 0 0.7rem 0.5rem;
`;

const CheckBtn = styled(Button)`
  margin-top: 2rem;
`;

export default UserPointHistory;
