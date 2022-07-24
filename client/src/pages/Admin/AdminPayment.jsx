import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
// eslint-disable-next-line no-unused-vars
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
  const handleClick = async (event) => {
    const { id } = event.target;
    const { name } = event.target;
    const { value } = event.target;
    const bodyData = { isCharged: true };
    // eslint-disable-next-line no-alert
    const chargeConfirm = window.confirm(
      `예금주: ${name} \n 충전금액: ${value} \n 승인하겠습니까?`,
    );
    if (chargeConfirm) {
      try {
        await Api.patch(`points/${id}`, bodyData);
        setModal({ success: true, userName: name, time: 3 });
        setTimeout(() => {
          setModal(null);
        }, 3000);
      } catch (err) {
        setModal({ success: false, userName: name });
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
            ` ${modal.userName}님이 신청하신 포인트 충전승인이 ${
              modal.success ? '성공' : '실패'
            } 하였습니다.\n(예금주: ${modal.userName})\n\n`}
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
        <Text width='80'>이름</Text>
        <Text width='200'>이메일</Text>
        <Text width='100'>주문일자</Text>
        <Text width='100'>주문P</Text>
        <Text width='80'>예금주</Text>
        <Text width='100'>승인</Text>
      </TitleRow>
      <Wrapper pageSize={pageSize}>
        {charge &&
          charge.map((e) => (
            <Row key={e._id}>
              <Text width='80'>{e.user.name}</Text>
              <Text width='200'>{e.user.email}</Text>
              <Text width='100'>{getCurrentDate(e.createdAt)}</Text>
              <Text
                width='100'
                style={{ justifyContent: 'flex-end', paddingRight: '5px' }}
              >
                {/* {e.paymentAmount && e.paymentAmount.toLocaleString()}P */}
                {e.paymentAmount && addCommas(e.paymentAmount)}P
              </Text>
              <Text width='80'>{e.user.name}</Text>
              <Text width='100'>
                <Button
                  id={e._id}
                  name={e.user.name}
                  value={e.paymentAmount}
                  onClick={handleClick}
                  disabled={e.isCharged}
                >
                  {e.isCharged ? '충전완료' : '충전승인'}
                </Button>
              </Text>
            </Row>
          ))}
        <Row style={{ borderTop: '2px solid black', borderBottom: 'none' }} />
      </Wrapper>
      {charge.length !== 0 && <Pagenation lastPage={lastPage} />}
    </>
  );
};

const TitleRow = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 2px solid black;
  font-weight: 600;
  font-size: 20px;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => `${45 * props.pageSize}px`};
  align-self: end;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-bottom: 1px solid #bdbdbd;
  justify-content: space-between;
`;

const Text = styled.p`
  display: flex;
  width: ${(props) => props.width ?? '150'}px;
  height: 24px;
  letter-spacing: 0.5px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? '#D9D9D9' : '#3563e9')};
  color: ${(props) => (props.disabled ? '#919191' : '#fff')};
  font-size: 16px;
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')}};
  position: fixed;
  z-index: 1000;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -2px;
  align-content: center;
  `;

const ModalDiv = styled.div`
  // display: ${(props) => (props.modal ? 'flex' : 'none')}};
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
