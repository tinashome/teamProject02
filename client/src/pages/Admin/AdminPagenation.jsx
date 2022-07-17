import React, { useState } from 'react';
import styled from 'styled-components';

const Pagenation = ({ currrentPage, setCurrrentPage, lastPage }) => {
  const [pageList, setPageList] = useState(0);
  const handleClick = (e) => {
    if (e.target.value === 'first') {
      setCurrrentPage(0);
    } else if (e.target.value === 'last') {
      setCurrrentPage(lastPage);
    } else if (e.target.value === 'prev') {
      if (currrentPage * 1 > 0) {
        setCurrrentPage(currrentPage * 1 - 1);
      } else if (currrentPage * 1 === pageList * 1 && currrentPage * 1 !== 0)
        setPageList(pageList - 1);
    } else if (e.target.value === 'next') {
      if (currrentPage * 1 < lastPage) {
        if (
          currrentPage * 1 === pageList * 1 + 7 &&
          currrentPage * 1 !== lastPage - 1
        ) {
          setPageList(pageList + 1);
        } else {
          setCurrrentPage(currrentPage * 1 + 1);
        }
      }
    } else {
      setCurrrentPage(e.target.value);
    }
  };

  return (
    <Wrapper>
      <PageRow>
        <Page
          value='first'
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          &lt;&lt;
        </Page>
        <Page
          value='prev'
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          &lt;
        </Page>
        <Page
          value={pageList * 1}
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 1}
        </Page>
        <Page
          value={pageList * 1 + 1}
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 2}
        </Page>
        <Page
          value={pageList * 1 + 2}
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 3}
        </Page>
        <Page
          value={pageList * 1 + 3}
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 4}
        </Page>
        <Page
          value={pageList * 1 + 4}
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 5}
        </Page>
        <Page
          value={pageList * 1 + 5}
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 6}
        </Page>
        <Page
          value={pageList * 1 + 6}
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 7}
        </Page>
        <Page
          value={pageList * 1 + 7}
          currrentPage={currrentPage}
          onClick={handleClick}
          lastPage={lastPage}
        >
          {pageList * 1 + 8}
        </Page>
        <Page value='next' currrentPage={currrentPage} onClick={handleClick}>
          &gt;
        </Page>
        <Page value='last' currrentPage={currrentPage} onClick={handleClick}>
          &gt;&gt;
        </Page>
      </PageRow>
    </Wrapper>
  );
};

const Page = styled.button`
  display: ${(props) =>
    props.value * 1 <= props.lastPage * 1 ||
    props.value === 'prev' ||
    props.value === 'next' ||
    props.value === 'first' ||
    props.value === 'last'
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
    props.value * 1 === props.currrentPage * 1 ? '#fff' : '#000'};
  background-color: ${(props) =>
    props.value * 1 === props.currrentPage * 1 && '#3563e9'};
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
