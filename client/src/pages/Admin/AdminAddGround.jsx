import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminUsers, adminCurrentPage } from 'stores/adminStore';
import * as Api from 'api/api';
import Pagenation from './AdminPagenation';

const AdminAddGround = () => (
  <form>
    <Wrapper>
      <TitleRow>필수 입력 정보</TitleRow>
      <Row>
        <TextContainers>
          <Text>경기장 이름</Text>
          <TextRed>*</TextRed>
        </TextContainers>
        <InputContainers>
          <Input />
        </InputContainers>
      </Row>
      <Row>
        <TextContainers>
          <Text>결제 포인트</Text>
          <TextRed>*</TextRed>
        </TextContainers>
        <InputContainers>
          <Input />
        </InputContainers>
      </Row>
      <Row>
        <TextContainers>
          <Text>경기장 주소</Text>
          <TextRed>*</TextRed>
        </TextContainers>
        <InputContainers>
          <Input />
          <AdressButton>주소찾기</AdressButton>
        </InputContainers>
      </Row>
    </Wrapper>
    <Wrapper>
      <TitleRow>선택 입력 정보</TitleRow>
      <Row>
        <TextContainers>
          <Text>경기장 크기</Text>
        </TextContainers>
        <InputContainers>
          <Input />
        </InputContainers>
      </Row>
      <Row>
        <TextContainers>
          <Text>구장 이미지</Text>
        </TextContainers>
        <InputContainers>
          <Input />
          <AddButton>+</AddButton>
        </InputContainers>
      </Row>
    </Wrapper>
    <Wrapper>
      <TitleRow>기타사항</TitleRow>
      <Row>
        <Checkbox type='checkbox' id='showerPlace' name='showerPlace' />{' '}
        <Label htmlFor='showerPlace'>샤워실</Label>
        <Checkbox type='checkbox' id='parking' name='parking' />{' '}
        <Label htmlFor='parking'>주차장</Label>
        <Checkbox type='checkbox' id='shoesRental' name='shoesRental' />{' '}
        <Label htmlFor='shoesRental'>운동복대여</Label>
        <Checkbox
          type='checkbox'
          id='sportswearRental'
          name='sportswearRental'
        />{' '}
        <Label htmlFor='sportswearRental'>풋살화대여</Label>
      </Row>
    </Wrapper>
    <Wrapper>
      <TitleRow>구장 특이사항</TitleRow>
      <Row>
        <TextContainers>
          <Text>풋살장 가는 길</Text>
        </TextContainers>
        <InputContainers>
          <Input />
        </InputContainers>
      </Row>
      <Row>
        <TextContainers>
          <Text>주차장 위치 안내</Text>
        </TextContainers>
        <InputContainers>
          <Input />
        </InputContainers>
      </Row>
      <Row>
        <TextContainers>
          <Text>흡연</Text>
        </TextContainers>
        <InputContainers>
          <Input />
        </InputContainers>
      </Row>
      <Row>
        <TextContainers>
          <Text>화장실</Text>
        </TextContainers>
        <InputContainers>
          <Input />
        </InputContainers>
      </Row>
      <Row>
        <Button type='submit'>등록하기</Button>
        <Button>뒤로가기</Button>
      </Row>
    </Wrapper>
  </form>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  margin-bottom: 50px;
  font-size: 24px;
  letter-spacing: -1px;
  gap: 15px;
`;

const TitleRow = styled.div`
  padding: 10px 30px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const TextContainers = styled.div`
  display: flex;
  width: 200px;
  margin: 0 10px;
  justify-content: flex-end;
`;

const Text = styled.p`
  display: flex;
  align-self: center;
`;

const TextRed = styled.p`
  display: flex;
  width: 7px;
  color: #dc5d5d;
  font-weight: 600;
`;
const InputContainers = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  margin: 0 10px;
  justify-content: space-between;
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  height: 45px;
  padding: 10px;
  border: 1px solid #919191;
  border-radius: 4px;
  font-size: 20px;
`;

const AdressButton = styled.button`
  display: flex;
  width: 100px;
  height: 35px;
  padding-bottom: 2px;
  margin-left: 10px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const AddButton = styled.button`
  display: flex;
  width: 50px;
  height: 40px;
  padding-bottom: 5px;
  margin-left: 10px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  font-size: 40px;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  padding: 5px 20px 10px 20px;
  margin: 130px 50px 50px 50px;
  border-radius: 5px;
  background: #3563e9;
  color: white;
  font-size: 35px;
  font-weight: 400;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const Checkbox = styled.input`
  display: flex;
  width: 24px;
  height: 24px;
  margin: auto 0 auto 10px;
`;

const Label = styled.label`
  display: flex;
  margin: auto 10px;
  padding-bottom: 5px;
  font-size: 20px;
`;
export default AdminAddGround;
