// 관리자페이지본문 메뉴3 경기장수정 AdminEditGround
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
// eslint-disable-next-line no-unused-vars
import { adminUsers, adminCurrentPage } from 'stores/adminUserStore';
import * as Api from 'api/api';
import Pagenation from './AdminPagenation';

const AdminDeleteGround = () => {
  // 조회한유저목록을 저장하는 상태
  // const [grounds, setGrounds] = useRecoilState(adminUsers);
  const [grounds, setGrounds] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setcurrentPage] = useRecoilState(adminCurrentPage);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState('');

  const getGrounds = async () => {
    // 경기장목록조회 api요청
    // grounds?
    // location=지역
    // &search=검색어
    // &offset=시작번호
    // &count=조회할갯수
    try {
      const result = await Api.get(
        `grounds?offset=${currentPage * pageSize}&count=${pageSize}`,
      );
      const resultData = await result.data;
      setGrounds(resultData.grounds);
      setTotalCount(resultData.length);
      // console.log(totalCount);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getGrounds();
  }, [currentPage, modal]);

  useEffect(() => {
    setLastPage(Math.ceil(totalCount / pageSize) - 1);
  }, [totalCount]);

  const handleClick = async (event) => {
    // 경기장정보삭제 api요청
    // eslint-disable-next-line no-alert
    const deleteConfirm = window.confirm(
      `${event.target.name}의 경기장 정보를 정말 삭제 하시겠습니까?`,
    );
    if (deleteConfirm) {
      try {
        const result = await Api.delete(`grounds/${event.target.id}`);
        setModal({
          success: true,
          groundName: event.target.name,
        });
        console.log(result);
        return;
      } catch (err) {
        setModal({ success: false, groundName: event.target.name });
      }
    }
  };

  return (
    <>
      <ModalWrapper
        modal={modal}
        onClick={() => {
          setModal('');
          getGrounds();
        }}
      >
        <ModalDiv>
          {`${modal.groundName}\n\n삭제에 ${
            modal.success ? '성공' : '실패'
          } 하였습니다.\n`}
          <ModalButton
            onClick={() => {
              setModal('');
              getGrounds();
            }}
          >
            닫기
          </ModalButton>
        </ModalDiv>
      </ModalWrapper>
      <TitleRow>
        <Text width='200'>경기장명</Text>
        <Text width='200'>위치</Text>
        <Text width='80'>포인트</Text>
        <Text>삭제</Text>
      </TitleRow>
      {/* <Wrapper> */}
      <Wrapper pageSize={pageSize}>
        {grounds &&
          grounds.map((e) => (
            <Row key={e._id}>
              <TextWide width='200' title={e.groundName}>
                {e.groundName.length >= 10
                  ? `${e.groundName.slice(0, 10)}...`
                  : e.groundName}
              </TextWide>
              <TextWide width='200'>{e.groundAddress.address1}</TextWide>
              <Text width='80' style={{ justifyContent: 'flex-end' }}>
                {e.paymentPoint.toLocaleString()}P
              </Text>
              <Text>
                <Button id={e._id} name={e.groundName} onClick={handleClick}>
                  경기장삭제
                </Button>
              </Text>
            </Row>
          ))}
      </Wrapper>
      {/* {grounds.length !== 0 && <Pagenation lastPage={lastPage} />} */}
      <Pagenation lastPage={lastPage} />
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
  // height: ${(props) => `${45 * props.pageSize}px`};
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

const TextWide = styled(Text)`
  white-space: nowrap;
  justify-content: flex-start;
  overflow: hidden;
`;

const Button = styled.button`
  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  font-size: 16px;
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal === '' ? 'none' : 'flex')}};
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
  `;

const ModalDiv = styled.div`
  display: ${(props) => (props.modal === '' ? 'none' : 'flex')}};
  flex-direction: column;
  position:absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 250px;
  margin-left: -175px;
  margin-top: -125px;
  // padding: 30px 10px;
  border: solid 10px #3563e9;
  border-radius: 3px;
  background-color:#fff;
  font-size:24px;
  justify-content: center;
  text-align:center;
  align-items: center;
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

export default AdminDeleteGround;
