// 관리자페이지본문 메뉴 경기장목록,삭제 구현 AdminGroundList

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminContentState, adminCurrentPage } from 'stores/adminUserStore';
import * as Api from 'api/api';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import Pagenation from './AdminPagenation';

const AdminRentalList = () => {
  // 조회한예약목록을 저장하는 상태
  const [rentals, setRentals] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setcurrentPage] = useRecoilState(adminCurrentPage);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useRecoilState(adminContentState);
  // 예약시간상세확인용 상태 id값이면 리스트를 open
  const [openTimes, setOpenTimes] = useState(null);

  const getRentals = async () => {
    // 예약목록조회 api요청
    // rentals?isBooked=결제TF&userName=이름&groundName=경기장명&offset=시작번호&count=조회할갯수
    try {
      const result = await Api.get(
        `rentals?offset=${currentPage * pageSize}&count=${pageSize}`,
      );
      const resultData = await result.data;
      setRentals(resultData.rentals);
      setTotalCount(resultData.length);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  // 주문생성시간 타임존을 보정하고 mm-dd형식으로 반환하는 함수
  const getCurrentDate = (data) => {
    const currentDate = new Date(data);
    const month = `0${currentDate.getMonth() + 1}`.slice(-2);
    const day = `0${currentDate.getDate()}`.slice(-2);
    const dateString = `${month}-${day}`;
    return dateString;
  };

  // 예약 날짜의 mmdd형식을 mm-dd로 바꾸는 함수
  const dateAddDash = (date) => {
    const month = date.slice(0, 2);
    const day = date.slice(2, 4);
    return `${month}-${day}`;
  };

  // 예약취소 클릭시
  const handleDelete = async (event) => {
    const { id } = event.target;
    const userName = event.target.name;
    const reservationDate = event.target.value;

    // eslint-disable-next-line no-alert
    const deleteConfirm = window.confirm(
      `${userName}의 ${reservationDate}예약을 정말 취소 하시겠습니까?`,
    );
    if (deleteConfirm) {
      try {
        await Api.delete(`rentals/${id}`);
        setModal({ success: true, userName, reservationDate, time: 3 });
        setTimeout(() => {
          setModal(null);
        }, 3000);
        return;
      } catch (err) {
        setModal({ success: false, userName, reservationDate });
      }
    }
  };

  useEffect(() => {
    setcurrentPage(0);
  }, []);

  useEffect(() => {
    getRentals();
    setOpenTimes(null);
  }, [currentPage, modal]);

  useEffect(() => {
    setLastPage(Math.ceil(totalCount / pageSize) - 1);
  }, [totalCount]);

  return (
    <>
      <ModalWrapper
        modal={modal}
        onClick={() => {
          setModal(null);
          getRentals();
        }}
      >
        <ModalDiv>
          {modal &&
            `날짜: ${modal.reservationDate}\n예약자:${
              modal.userName
            }\n\n예약취소에 ${modal.success ? '성공' : '실패'} 하였습니다.\n`}
          {modal &&
            modal.success &&
            `이 메세지는 ${modal.time}초후에 사라집니다.`}

          <ModalButton
            onClick={() => {
              setModal(null);
              getRentals();
            }}
          >
            닫기
          </ModalButton>
        </ModalDiv>
      </ModalWrapper>

      <TitleRow>
        <Text>작성일</Text>
        <Text>이름</Text>
        <Text width='170'>경기장명</Text>
        <Text>날짜</Text>
        <Text width='120' style={{ justifyContent: 'flex-end' }}>
          예약시간
        </Text>
        <Text width='40' />
        <Text>취소</Text>
      </TitleRow>

      <Wrapper pageSize={pageSize}>
        {rentals &&
          rentals.map((e) => (
            <Row key={e._id}>
              <Text>{getCurrentDate(e.createdAt)}</Text>
              <Text>{!!e.userId && e.userId.name}</Text>
              <TextWide width='170'>{e.groundName}</TextWide>
              <Text>
                {`${e.reservationDate && dateAddDash(e.reservationDate)}`}
              </Text>

              <TextList width='120'>
                <TextList id={e._id} open={openTimes} width='120'>
                  {e.reservationTime && e.reservationTime.sort()[0]}
                  {e.reservationTime[1] && (
                    <>
                      <OpenIcon
                        id={e._id}
                        open={openTimes}
                        onClick={() => {
                          setOpenTimes(e._id);
                        }}
                      />
                      <CloseIcon
                        id={e._id}
                        open={openTimes}
                        onClick={() => {
                          if (openTimes) {
                            setOpenTimes(null);
                          }
                        }}
                      />
                    </>
                  )}
                </TextList>
                <TextListOpen id={e._id} open={openTimes}>
                  {e.reservationTime && e.reservationTime.join('\n')}
                  {/* {e.reservationTime.slice(1).join('\n')} */}
                </TextListOpen>
              </TextList>

              <Text
                width='40'
                style={{ justifyContent: 'flex-end', paddingRight: '20px' }}
              >
                {e.reservationTime && e.reservationTime.length}h
              </Text>

              <Text width='80'>
                <Button
                  id={e._id}
                  name={!!e.userId && e.userId.name}
                  value={`${
                    e.reservationDate && dateAddDash(e.reservationDate)
                  }`}
                  onClick={handleDelete}
                >
                  취소
                </Button>
              </Text>
            </Row>
          ))}
        <Row style={{ borderTop: '2px solid black', borderBottom: 'none' }} />
      </Wrapper>
      {rentals.length !== 0 && <Pagenation lastPage={lastPage} />}
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
  height: ${(props) => `${45 * props.pageSize}px`};
  align-self: end;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #bdbdbd;
  justify-content: space-between;
`;

const Text = styled.div`
  display: flex;
  width: ${(props) => props.width ?? '80'}px;
  height: 24px;
  letter-spacing: 0.5px;
  align-items: center;
  justify-content: center;
`;

const TextWide = styled(Text)`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 24px;
`;

const TextList = styled(TextWide)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  white-space: normal;
  line-height: 24px;
  user-select: none;
`;
const TextListOpen = styled(TextList)`
  display: ${(props) => (props.id === props.open ? 'flex' : 'none')};
  width: 100px;
  height: auto;
  position: absolute;
  background-color: #fff;
  white-space: wrap;
  user-select: none;
  outline: solid 2px #3563e9;
  border-radius: 5px;
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
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
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

const OpenIcon = styled(IoIosArrowDown)`
  display: ${(props) => (props.id === props.open ? 'none' : 'flex')};
  font-size: 20px;
  margin-top: 3px;
  cursor: pointer;
`;
const CloseIcon = styled(IoIosArrowUp)`
  display: ${(props) => (props.id === props.open ? 'flex' : 'none')};
  font-size: 20px;
  // background-color: #dc5d5d;
  // border-radius: 50%;
  margin-top: 3px;
  cursor: pointer;
`;

export default AdminRentalList;
