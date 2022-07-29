import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminCurrentPage } from 'stores/adminUserStore';

const Pagenation = ({ lastPage }) => {
  const [pageList, setPageList] = useState(0);
  const [currentPage, setCurentPage] = useRecoilState(adminCurrentPage);
  const handleClick = (e) => {
    if (e.target.value === 'first') {
      setCurentPage(0);
      setPageList(0);
    } else if (e.target.value === 'last') {
      setCurentPage(lastPage);
      setPageList(lastPage - 8);
    } else if (e.target.value === 'prev') {
      if (currentPage * 1 > 0) {
        if (pageList === currentPage) {
          setPageList(pageList - 1);
        }
        setCurentPage(currentPage - 1);
      } else if (currentPage * 1 <= pageList * 1 && currentPage * 1 !== 0)
        setPageList((el) => el - 1);
    } else if (e.target.value === 'next') {
      if (currentPage * 1 < lastPage) {
        if (
          currentPage * 1 === pageList * 1 + 8 &&
          currentPage * 1 !== lastPage
        ) {
          setPageList(pageList + 1);
        }
        setCurentPage(currentPage * 1 + 1);
      }
    } else {
      setCurentPage(e.target.value);
    }
  };
  useEffect(() => {
    setCurentPage(0);
    setPageList(0);
  }, []);

  return (
    <Wrapper>
      <PageRow>
        <Page
          value='first'
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
          disabled={currentPage * 1 === 0 && 'disabled'}
        >
          &lt;&lt;
        </Page>
        <Page
          value='prev'
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
          disabled={currentPage * 1 === 0 && 'disabled'}
        >
          &lt;
        </Page>
        <Page
          value={pageList * 1}
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 1}
        </Page>
        <Page
          value={pageList * 1 + 1}
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 2}
        </Page>
        <Page
          value={pageList * 1 + 2}
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 3}
        </Page>
        <Page
          value={pageList * 1 + 3}
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 4}
        </Page>
        <Page
          value={pageList * 1 + 4}
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 5}
        </Page>
        <Page
          value={pageList * 1 + 5}
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 6}
        </Page>
        <Page
          value={pageList * 1 + 6}
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 7}
        </Page>
        <Page
          value={pageList * 1 + 7}
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 8}
        </Page>
        <Page
          value={pageList * 1 + 8}
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 9}
        </Page>
        <Page
          value='next'
          currentPage={currentPage}
          onClick={handleClick}
          disabled={currentPage * 1 === lastPage && 'trdisabledue'}
        >
          &gt;
        </Page>
        <Page
          value='last'
          currentPage={currentPage}
          onClick={handleClick}
          disabled={currentPage === lastPage && 'disabled'}
        >
          &gt;&gt;
        </Page>
      </PageRow>
    </Wrapper>
  );
};

const Page = styled.button`
  display: ${(props) =>
    (props.value * 1 < 0 && props.value) || props.value * 1 > props.lastPage * 1
      ? 'none'
      : 'flex'};
  width: 30px;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.value * 1 === props.currentPage * 1 ? '#fff' : '#000'};
  background-color: ${(props) =>
    props.value * 1 === props.currentPage * 1 && '#3563e9'};
  color: ${(props) => props.disabled && '#919191'};
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 10px;
  justify-content: center;
`;
const PageRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default Pagenation;
