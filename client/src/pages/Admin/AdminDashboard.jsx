// 관리자페이지 메뉴0 대쉬보드 AdminDashboard
// 대쉬보드는 관리자페이지의 첫페이지이며 각종정보를 요약하여 표시할 예정입니다.
// 현재는 개발도중 필요한 기능들이 표시됩니다.

/* eslint-disable no-console */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminContentState } from 'stores/adminUserStore';
import * as Api from 'api/api';
import groundImgSrc from 'mockData/groundImgSrc';
import groundImgSrcTest from 'mockData/groundImgSrcTest';

const AdminDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useRecoilState(adminContentState);
  const [slice, setSlice] = useState(10);
  const [amount, setAmount] = useState(10);
  const newUsers = [];
  const groundData = [];
  // eslint-disable-next-line no-unused-vars
  const newGround = groundData.map((e, i) => ({
    // groundImg: [].push(groundImgSrc[i % groundImgSrc.length]),
    ...e,
  }));
  // eslint-disable-next-line no-unused-vars
  const newGrounds = newGround.map((e, i) =>
    e.groundImg.push(groundImgSrc[`${i % 10}`]),
  );
  console.log(newGround);
  // setContent(['경기장 삭제', <AdminDeleteGround />]);

  // 로그인함수
  const signin = async (email, password) => {
    try {
      const result = await Api.post('auth/signin', { email, password });
      const { token } = result.data;
      localStorage.setItem('token', token);
    } catch (err) {
      console.log(err);
    }
  };

  // 회원가입함수(테스트계정 일괄가입시 사용)
  const signup = (usersss) => {
    const { name, email, phoneNumber } = usersss;
    Api.post('auth/signup', {
      name,
      email,
      password: '1234',
      phoneNumber,
    }).then((res) => {
      console.log(res.data);
    });
  };

  // 경기장 등록함수(테스트경기장 일괄 등록시 사용)
  const addGround = async (ground) => {
    try {
      const result = await Api.post(`grounds`, ground);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      관리자 페이지 대쉬보드
      <ImgBoxContainers>
        <ImgBox style={{ width: '700px' }}>
          {[...groundImgSrc, ...groundImgSrcTest].map((e, i) => (
            // <LoadedImage e={e} i={i} />
            // eslint-disable-next-line react/no-array-index-key
            <Img key={i} src={e} alt={`img${i}`} />
          ))}
        </ImgBox>
      </ImgBoxContainers>
      <br />
      <br />
      <Button
        onClick={() => {
          signin('user@gmail.com', '12341234');
        }}
      >
        사용자로그인
      </Button>
      <Button
        onClick={() => {
          signup(newUsers.map((e) => signup(e)));
        }}
      >{`테스트계정 ${newUsers.length}개 일괄생성`}</Button>
      <Button
        onClick={() => {
          newGround.slice(slice, slice + amount).map((e) => addGround(e));
        }}
      >
        {`테스트경기장 ${amount}개 일괄생성`}
      </Button>
      <input
        style={{ width: '100px', fontSize: 30 }}
        oncChange={(e) => {
          setSlice(e.target.value);
        }}
      />
      번부터
      <input
        style={{ width: '100px', fontSize: 30 }}
        oncChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      개 생성
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 30px;
`;
const Button = styled.button`
  padding: 5px 20px;
  margin: 20px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  font-size: 20px;
`;

const ImgBoxContainers = styled.div`
  display: flex;
`;

const ImgBox = styled.div`
  display: flex;
  width: 270px;
  flex-wrap: wrap;
`;
const Img = styled.img`
  display: flex;
  width: 89px;
  height: 89px;
`;

export default AdminDashboard;
