import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminCurrentPage } from 'stores/adminStore';

const Pagenation = ({ lastPage }) => {
  const [pageList, setPageList] = useState(0);
  const [currentPage, setCurentPage] = useRecoilState(adminCurrentPage);
  const handleClick = (e) => {
    if (e.target.value === 'first') {
      setCurentPage(0);
    } else if (e.target.value === 'last') {
      setCurentPage(lastPage);
    } else if (e.target.value === 'prev') {
      if (currentPage * 1 > 0) {
        setCurentPage(currentPage * 1 - 1);
      } else if (currentPage * 1 === pageList * 1 && currentPage * 1 !== 0)
        setPageList(pageList - 1);
    } else if (e.target.value === 'next') {
      if (currentPage * 1 < lastPage) {
        if (
          currentPage * 1 === pageList * 1 + 7 &&
          currentPage * 1 !== lastPage - 1
        ) {
          setPageList(pageList + 1);
        } else {
          setCurentPage(currentPage * 1 + 1);
        }
      }
    } else {
      setCurentPage(e.target.value);
    }
  };

  return (
    <Wrapper>
      <PageRow>
        <Page
          value='first'
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          &lt;&lt;
        </Page>
        <Page
          value='prev'
          currentPage={currentPage}
          onClick={handleClick}
          lastPage={lastPage}
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
        <Page value='next' currentPage={currentPage} onClick={handleClick}>
          &gt;
        </Page>
        <Page value='last' currentPage={currentPage} onClick={handleClick}>
          &gt;&gt;
        </Page>
      </PageRow>
    </Wrapper>
  );
};

const Page = styled.button`
  display: ${(props) =>
    props.value * 1 <= props.lastPage * 1 ||
    ['prev', 'next', 'first', 'last'].includes(props.value)
      ? 'flex'
      : 'none'};
  width: 35px;
  height: 35px;
  margin: 0 5px;
  font-size: 25px;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.value * 1 === props.currentPage * 1 ? '#fff' : '#000'};
  background-color: ${(props) =>
    props.value * 1 === props.currentPage * 1 && '#3563e9'};
  border-radius: 50%;
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 50px;
  align-self: end;
  justify-content: center;
`;
const PageRow = styled.div`
  display: flex;
  padding: 10px;
  font-size: 25px;
  font-weight: 400;
`;

export default Pagenation;
