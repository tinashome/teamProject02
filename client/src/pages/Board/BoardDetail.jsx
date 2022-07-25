import React from 'react';
import styled from 'styled-components';

const BoardDetail = () => (
  <Container>
    <Wrapper>
      <Title>레벨 시스템 개선!</Title>
      <Date>2022.07.25</Date>
    </Wrapper>
    <Description>
      더 정확한 레벨을 위해 레벨 시스템을 개선했어요. <br /> <br />
      • 기존에는 어떤 레벨을 받아도 그대로 적용되어 억울하게 레벨이 낮아지는
      일들이 있었어요. 이제 신뢰할 수 없는 레벨은 자동으로 탐지하고 제거해요.
      <br />• 최근 5회에서 최근 10회로 레벨 산정 범위가 넓어져요. <br />• 10회
      이상 레벨이 기록되면 내 레벨 옆에 인증 뱃지가 달려요. 레벨 인증 뱃지를
      받은 플래버의 레벨은 더욱 신뢰할 수 있어요. <br />
      <br />
      2022년 7월 6일부터 새로운 레벨 시스템이 적용되어 내 레벨이 바뀔 수 있어요.
      더 정확해진 레벨을 만나보세요! <br />
      <br />
      *내 레벨은 마이 페이지에서 확인해 주세요.
    </Description>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  margin: 5% auto;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
  margin-bottom: 2rem;
`;

const Title = styled.p`
  padding: 0 0 1rem 0.5rem;
  font-size: 26px;
  font-weight: 600;
`;

const Date = styled.span`
  position: absolute;
  right: 10px;
  bottom: 20%;
  opacity: 0.5;
`;

const Description = styled.p`
  padding-left: 0.5rem;
  word-spacing: 0.5px;
  line-height: 1.5;
  font-size: 18px;
`;

export default BoardDetail;
