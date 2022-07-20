import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <Container>
    <MenuContainer>
      <MenuWrapper>
        <MenuTitle>메뉴 바로가기</MenuTitle>
        <MenuList>
          <Menu>구장 리스트</Menu>
          <Menu>내 정보 관리</Menu>
          <Menu>내 예약 관리</Menu>
          <Menu>포인트 충전</Menu>
        </MenuList>
      </MenuWrapper>
      <MenuWrapper>
        <MenuTitle>지역별 구장</MenuTitle>
        <MenuList>
          <Menu>서울</Menu>
          <Menu>경기</Menu>
          <Menu>부산</Menu>
        </MenuList>
      </MenuWrapper>
    </MenuContainer>
    <DescriptionContainer>
      <Description>
        풋살 예약 닷컴 | 부산광역시 동구 초량3동 중앙대로
      </Description>
      <Description>admin@Team04.com</Description>
      <Description>
        @ Elice SW Track 2. Busan Team04 all right reserved.
      </Description>
      <Description>박찬흠 배창현 이수정 최수혁 최형욱</Description>
    </DescriptionContainer>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 150px;
  color: white;
  background: #3563e9;
`;

const MenuContainer = styled.div`
  display: flex;
`;

const MenuWrapper = styled.div`
  margin-right: 4rem;
`;

const MenuTitle = styled.span`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const MenuList = styled.ul``;

const Menu = styled.li`
  padding: 0.3rem 0;
  margin-left: 0.2rem;
  font-size: 0.9rem;
  opacity: 0.5;
  cursor: pointer;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

const Description = styled.span`
  font-size: 0.8rem;
  padding: 0.3rem 0;
  opacity: 0.5;
`;

export default Footer;
