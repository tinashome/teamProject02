import React from 'react';
import styled from 'styled-components';

const SideMenu = () => (
  <Container>
    <Title>개인정보 변경</Title>
    <Wrapper>
      <Contents>
        <Content>
          이름{' '}
          <input
            disabled='ture'
            placeholder='이름'
            style={{ backgroundColor: '#e9e9e9' }}
          />
        </Content>
        <Content>
          이메일{' '}
          <input
            disabled='ture'
            placeholder='이메일'
            style={{ backgroundColor: '#e9e9e9' }}
          />
        </Content>
        <Content>
          전화번호 <input />
        </Content>
      </Contents>
      <ButtonBox>
        <button type='button'>변경하기</button>
        <button type='button'>돌아가기</button>
      </ButtonBox>
    </Wrapper>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  line-height: 3rem;
  padding: 1.875rem 3.125rem;
  margin-top: 1.875rem;
  color: #000000;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.0625rem;
`;

const Wrapper = styled.div`
  height: 100%;
  margin: 0.9375rem 6.25rem;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  height: 65%;

  & input {
    width: 60%;
    padding: 0.875rem 1rem;
    margin: 0.5rem 5rem 0.5rem 1rem;
    border: 0.0625rem solid #ced4da;
    border-radius: 0.25rem;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;

  & button {
    padding: 0.75rem 1rem;
    margin: 0.5rem 2rem;
    border-radius: 0.25rem;
    color: white;
    background: #3563e9;
    font-size: 1.125rem;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  line-height: 1.8125rem;
  color: #000000;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: -0.0625rem;
  text-align: right;
`;

export default SideMenu;
