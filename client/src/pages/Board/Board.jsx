import React, { useEffect } from 'react';
import * as Api from 'api/api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  userBoardListState,
  adminBoardListState,
  boardPageState,
} from 'stores/boardStore';
import Pagination from 'components/organisms/Pagination';
import Button from 'components/atoms/Button';
import { getCurrentDate, isExistToken } from 'util/useful-functions';

const Board = () => {
  const [noticeBoards, setNoticesBoards] = useRecoilState(adminBoardListState);
  const [userBoards, setUserBoards] = useRecoilState(userBoardListState);
  const [page, setPage] = useRecoilState(boardPageState);
  const listPerPage = 15;
  const totalPage = Math.ceil(userBoards.length / listPerPage);

  useEffect(() => {
    (async () => {
      try {
        const noticeBoardsResult = await Api.get(
          `boards?&isNotified=true&count=${100}`,
        );
        setNoticesBoards(noticeBoardsResult.data.boards);
      } catch (err) {
        alert(err.response.data.reason);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const userBoardsResult = await Api.get(
          `boards?&role=basic-user&offset=${
            (page - 1) * listPerPage
          }&count=${listPerPage}`,
        );
        setUserBoards({
          length: userBoardsResult.data.length,
          data: userBoardsResult.data.boards,
        });
      } catch (err) {
        alert(err.response.data.reason);
      }
    })();
  }, [page]);

  return (
    <>
      <Container>
        <Title>자유 게시판</Title>
        <BoardHeader>
          <p />
          <p>제목</p>
          <p>작성자</p>
          <p>작성일</p>
        </BoardHeader>
        {page === 1 &&
          noticeBoards?.map((board) => (
            <BoardInfo key={board._id}>
              <Tag color={board.role === 'admin' ? '#ff6b6b' : '#4c6ef5'}>
                {board.role === 'admin' ? '📢 공지사항 ' : '자유'}
              </Tag>
              <Link to={`${board._id}`}>
                <div>{board.title}</div>
              </Link>
              <div>{board.userName}</div>
              <div>{getCurrentDate(board.createdAt)}</div>
            </BoardInfo>
          ))}
        {userBoards.data?.map((board) => (
          <BoardInfo key={board._id}>
            <Tag color={board.role === 'admin' ? '#ff6b6b' : '#4c6ef5'}>
              {board.role === 'admin' ? '📢 공지사항 ' : '자유'}
            </Tag>
            <Link to={`${board._id}`}>
              <div>{board.title}</div>
            </Link>
            <div>{board.userName}</div>
            <div>{getCurrentDate(board.createdAt)}</div>
          </BoardInfo>
        ))}
      </Container>
      <Footer>
        <Pagination
          totalPage={totalPage}
          limit={5}
          page={page}
          setPage={setPage}
        />
        {!!userBoards.length && isExistToken() && (
          <Link to='/write'>
            <StyledButton>글 작성</StyledButton>
          </Link>
        )}
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
  grid-template-columns: 20% 40% 20% 20%;
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
  grid-template-columns: 20% 40% 20% 20%;
  padding: 1rem;
  margin: 0 auto;
  line-height: normal;

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
  }

  a {
    div {
      text-align: left;
    }
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Tag = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${(props) => props.color};
`;

const Footer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 17%;
  bottom: 10%;
`;

export default Board;
