// 관리자페이지본문 메뉴1 회원탈퇴 AdminDeleteMember
/* eslint-disable no-console, no-alert  */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminUsers, adminCurrentPage } from 'stores/adminUserStore';
import * as Api from 'api/api';
import Pagenation from './AdminPagenation';

const AdminDeleteMember = () => {
  // 조회한유저목록을 저장하는 상태
  const [users, setUsers] = useRecoilState(adminUsers);
  // const [users, setUsers] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(null);
  const [lastPage, setLastPage] = useState(9);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setcurrentPage] = useRecoilState(adminCurrentPage);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState('');

  const getUsers = async () => {
    // 사용자목록조회 api요청
    // users?
    // name=이름
    // &email=이메일
    // &phoneNumber=연락처
    // &offset=시작번호
    // &count=조회할갯수
    try {
      const result = await Api.get(
        `users?offset=${currentPage * pageSize}&count=${pageSize}`,
      );
      const resultData = await result.data;
      setUsers(resultData.users);
      setTotalCount(resultData.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, modal]);

  useEffect(() => {
    setLastPage(Math.ceil(totalCount / pageSize) - 1);
  }, [totalCount]);

  const handleClick = async (event) => {
    // 회원정보삭제 api요청
    const deleteConfirm = window.confirm(
      `${event.target.name}의 계정 정보를 정말 삭제 하시겠습니까?`,
      console.log(event.target.id),
    );
    if (deleteConfirm) {
      try {
        const result = await Api.delete(`users/${event.target.id}`);
        setModal(`계정정보 삭제성공
        이름 : ${event.target.name}`);
        console.log(result);
        return;
      } catch (err) {
        setModal(
          `계정정보 삭제실패
            이름 : ${event.target.name}`,
        );
      }
    }
  };

  return (
    <>
      <ModalWrapper
        modal={modal}
        onClick={() => {
          setModal('');
          getUsers();
        }}
      >
        <ModalDiv>
          {modal}
          <ModalButton
            onClick={() => {
              setModal('');
              getUsers();
            }}
          >
            닫기
          </ModalButton>
        </ModalDiv>
      </ModalWrapper>
      <TitleRow>
        <Text width='200'>이메일</Text>
        <Text width='80'>이름</Text>
        <Text>연락처</Text>
        <Text width='100'>포인트</Text>
        <Text>삭제(탈퇴)</Text>
      </TitleRow>
      <Wrapper pageSize={pageSize}>
        {users &&
          users.map((e) => (
            <Row key={e._id}>
              <Text width='200'>{e.email}</Text>
              <Text width='80'>{e.name}</Text>
              <Text>{e.phoneNumber}</Text>
              <Text width='100'>{e.totalPoint.toLocaleString()}P</Text>
              <Text>
                <Button id={e._id} name={e.name} onClick={handleClick}>
                  회원삭제
                </Button>
              </Text>
            </Row>
          ))}
      </Wrapper>
      {users.length !== 0 && <Pagenation lastPage={lastPage} />}
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
  font-size: 30px;
  font-weight: 400;
  letter-spacing: -2px;
  `;

const ModalDiv = styled.div`
  display: ${(props) => (props.modal === '' ? 'none' : 'flex')}};
  position:absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 200px;
  margin-left: -150px;
  margin-top: -100px;
  padding: 20px;
  border-radius: 5px;
  background-color:#fff;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
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

export default AdminDeleteMember;
