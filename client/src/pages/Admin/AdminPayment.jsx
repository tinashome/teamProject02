import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminCurrentPage } from 'stores/adminUserStore';
import * as Api from 'api/api';
import { addCommas, getCurrentDate } from 'util/useful-functions';
import Pagenation from './AdminPagenation';

const AdminPayment = () => {
  const [charge, setCharge] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(null);
  const [lastPage, setLastPage] = useState(9);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setcurrentPage] = useRecoilState(adminCurrentPage);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState(null);

  const getCharge = async () => {
    // 충전신청목록조회 api요청
    // points?isCharged=승인여부&name=이름email=이메일&offset=시작위치&count=검색할갯수
    try {
      const result = await Api.get(
        `points?offset=${currentPage * pageSize}&count=${pageSize}`,
      );
      const resultData = await result.data;
      setCharge(resultData.points);
      setTotalCount(resultData.length);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getCharge();
  }, [currentPage, modal]);

  useEffect(() => {
    setLastPage(Math.ceil(totalCount / pageSize) - 1);
  }, [totalCount]);

  // 충전승인 클릭시
  const handleClick = async (event, payName) => {
    const { id } = event.target;
    const { name } = event.target;
    const { value } = event.target;
    const bodyData = { isCharged: true };
    // eslint-disable-next-line no-alert
    const chargeConfirm = window.confirm(
      `예금주: ${payName} \n 충전금액: ${addCommas(value)} \n 승인하겠습니까?`,
    );
    if (chargeConfirm) {
      try {
        await Api.patch(`points/${id}`, bodyData);
        setModal({ success: true, name, payName, time: 3 });
        setTimeout(() => {
          setModal(null);
        }, 3000);
      } catch (err) {
        setModal({ success: false, name, payName });
      }
    }
  };

  return (
    <>
      <ModalWrapper
        modal={modal}
        onClick={() => {
          setModal(null);
          getCharge();
        }}
      >
        <ModalDiv modal={modal}>
          {modal &&
            `${modal.success ? '승인성공' : '승인실패'}\n\n이름 : ${
              modal.name
            }(예금주: ${modal.payName || modal.name})\n\n`}
          {modal &&
            modal.success &&
            `이 메세지는 ${modal.time}초후에 사라집니다.`}
          <ModalButton
            onClick={() => {
              setModal(null);
              getCharge();
            }}
          >
            닫기
          </ModalButton>
        </ModalDiv>
      </ModalWrapper>
      <TitleRow>
        <InColumn>
          <InRow>
            <Text width='80'>이름</Text>
            <Text width='200'>이메일</Text>
          </InRow>
          <InRow>
            <Text width='80'>예금주</Text>
            <Text width='100'>주문일자</Text>
            <Text width='80'>주문P</Text>
          </InRow>
        </InColumn>
        <Text width='100'>승인</Text>
      </TitleRow>
      <Wrapper pageSize={pageSize}>
        {charge &&
          charge.map((e) => (
            <Row key={e._id}>
              <InColumn>
                <InRow>
                  <Text width='80'>{e.user.name}</Text>
                  <Text width='200'>{e.user.email}</Text>
                </InRow>
                <InRow>
                  <Text width='80'>{e.payName}</Text>
                  <Text width='100'>{getCurrentDate(e.createdAt)}</Text>
                  <Text width='80' style={{ justifyContent: 'flex-end' }}>
                    {e.paymentAmount && addCommas(e.paymentAmount)} P
                  </Text>
                </InRow>
              </InColumn>
              <Text width='100'>
                <Button
                  id={e._id}
                  name={e.user.name}
                  value={e.paymentAmount}
                  onClick={(event) => handleClick(event, e.payName)}
                  disabled={e.isCharged}
                >
                  {e.isCharged ? '충전완료' : '충전승인'}
                </Button>
              </Text>
            </Row>
          ))}
        <Row style={{ borderTop: '1px solid #bdbdbd', borderBottom: 'none' }} />
        {charge.length !== 0 && <Pagenation lastPage={lastPage} />}
      </Wrapper>
    </>
  );
};

const TitleRow = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 16px;
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #adb5bd;
  justify-content: space-evenly;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-size: 14px;
  letter-spacing: -1px;
  justify-content: space-between;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  line-height: 20px;
  border-bottom: 1px solid #bdbdbd;
  justify-content: space-evenly;
  align-items: center;
`;

const Text = styled.p`
  display: flex;
  width: ${(props) => props.width ?? '150'}px;
  height: 24px;
  letter-spacing: 0.5px;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
`;
const InRow = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-around;
  justify-content: space-between;
`;
const InColumn = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? '#D9D9D9' : '#3563e9')};
  color: ${(props) => (props.disabled ? '#919191' : '#fff')};
  font-size: 14px;
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')};
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -2px;
  align-content: center;
`;

const ModalDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 250px;
  margin-left: -175px;
  margin-top: -125px;
  padding: 30px 10px;
  border: solid 10px #3563e9;
  border-radius: 3px;
  background-color: #fff;
  font-size: 24px;
  text-align: center;
  white-space: pre-wrap;
  flex-direction: column;
  align-content: center;
`;

const ModalButton = styled.button`
  width: 80px;
  height: 50px;
  padding: 5px 10px;
  margin-top: 20px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  text-align: center;
  font-size: 25px;
`;
export default AdminPayment;
