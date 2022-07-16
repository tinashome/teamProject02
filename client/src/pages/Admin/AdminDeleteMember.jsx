import React, { useEffect } from 'react';
import styled from 'styled-components';
import userDataMock from 'pages/Admin/userDataMock';
import { adminUsers } from 'stores/store';
import { useRecoilState } from 'recoil';
import axios from 'axios';

// 관리자페이지본문 메뉴1 회원탈퇴 AdminDeleteMember

const Url = 'https://futsal-api-elice.herokuapp.com/api/user/users';
// 'https://cors-anywhere.herokuapp.com/https://futsal-api-elice.herokuapp.com/api/user/users';

const AdminDeleteMember = () => {
  const [users, setUsers] = useRecoilState(adminUsers);
  // const [users, setUsers] = useState('');
  const signin = () => {
    axios
      .post('https://futsal-api-elice.herokuapp.com/api/auth/signin', {
        email: 'admin@gmail.com',
        password: '1234',
      })
      .then((res) => localStorage.setItem('token', res.data.token));
  };
  // signin();
  const accessToken = localStorage.getItem('token');
  useEffect(() => {
    axios
      .get(Url, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // setUsers(userDataMock);
  const handleClick = (event) => {
    //   console.log(event.target);
    //   const bodyData = {
    //     name: event.target.name,
    //     email: event.target.id,
    //     password: '1234',
    //     phoneNumber: event.target.value,
    //   };
    // console.log(bodyData);
    // axios
    //   .post('https://futsal-api-elice.herokuapp.com/api/auth/signup', bodyData)
    //   .then((res) => console.log(res))
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
            <Button
              id={e._id}
              // name={e.name}
              // type={e.nickName}
              // value={e.phoneNumber}
              onClick={handleClick}
            >
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
