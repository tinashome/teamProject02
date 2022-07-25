import React, { useEffect } from 'react';
import * as Api from 'api/api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { boardListState, boardPageState } from 'stores/boardStore';
import Pagination from 'components/organisms/Pagination';
import Button from 'components/atoms/Button';

const mockData = [
  {
    id: 1,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 2,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 3,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 4,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 1,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 5,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 6,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 7,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 8,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 9,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 10,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
  {
    id: 11,
    title: '예시용 데이터입니다',
    author: 'test',
    createdAt: '2022.07.25',
  },
];

const Board = () => {
  const [boardList, setBoardList] = useRecoilState(boardListState);
  const [page, setPage] = useRecoilState(boardPageState);
  const listPerPage = 15;
  const totalPage = Math.ceil(boardList.length / listPerPage);

  return (
    <>
      <Container>
        <Title>자유 게시판</Title>
        <BoardHeader>
          <p>번호</p>
          <p>제목</p>
          <p>작성자</p>
          <p>작성일</p>
        </BoardHeader>
        {mockData.map((data) => (
          <BoardInfo key={data.id}>
            <div>{data.id}</div>
            <Link to={`${data.id}`}>
              <div>{data.title}</div>
            </Link>
            <div>{data.author}</div>
            <div>{data.createdAt}</div>
          </BoardInfo>
        ))}
      </Container>
      <Footer>
        <Pagination totalPage={5} limit={5} page={page} setPage={setPage} />
        <Link to='/write'>
          <StyledButton>글 작성</StyledButton>
        </Link>
      </Footer>
    </>
  );
};

const Container = styled.div`
  width: 70%;
  border-radius: 4px;
  margin: 2rem auto;
`;

const Title = styled.div`
  color: #ffffff;
  background: #3563e9;
  padding: 2rem;
  border-radius: 40px 40px 40px 0px;
  margin: 2rem 0 1rem 0;
  font-size: 23px;
`;

const BoardHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 15% 15%;
  padding: 1rem;
  border-bottom: 1px solid #343a40;

  p {
    font-size: 23px;
    font-weight: 600;
    margin: 0 auto;
  }
`;

const BoardInfo = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 15% 15%;
  padding: 1rem;
  margin: 0 auto;
  &:not(:last-child) {
    border-bottom: 1px solid #e9ecef;
  }

  a,
  div {
    width: 100%;
    text-align: center;
  }

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:nth-child(2) {
      /* text-align: left; */
    }
  }

  a {
    &:hover {
      color: #3563e9;
      opacity: 0.7;
    }
  }
`;

const Footer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  /* border: 1px solid red; */
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 17%;
  bottom: 10%;
`;

export default Board;
