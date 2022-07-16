import React, { useEffect } from 'react';
import styled from 'styled-components';
import { adminUsers } from 'stores/store';
import { useRecoilState } from 'recoil';
import axios from 'axios';

// 관리자페이지본문 메뉴1 회원탈퇴 AdminDeleteMember

const Url = 'https://futsal-api-elice.herokuapp.com/api/user/users';

const AdminDeleteMember = () => {
  const [users, setUsers] = useRecoilState(adminUsers);

  const handleClick = (event) => {
    // 회원정보삭제 api요청
    // alert넣기
    axios.delete(
      `https://futsal-api-elice.herokuapp.com/api/user/users/${event.id}`,
    );
  };

  return (
    <>
      <TitleRow>
        <Text>이메일</Text>
        <Text>이름</Text>
        <Text>닉네임</Text>
        <Text>연락처</Text>
        <Text>삭제(탈퇴)</Text>
      </TitleRow>
      {users.map((e) => (
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        <Row key={e._id}>
          <Text>{e.email}</Text>
          <Text>{e.name}</Text>
          <Text>{e.nickName}</Text>
          <Text>{e.phoneNumber}</Text>
          <Text>
            <Button id={e._id} onClick={handleClick}>
              회원삭제
            </Button>
          </Text>
        </Row>
      ))}
    </>
  );
};

const TitleRow = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 2px solid black;
  font-weight: 600;
  font-size: 20px;
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
  width: 150px;
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

export default AdminDeleteMember;
