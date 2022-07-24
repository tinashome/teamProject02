import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft } from '@react-icons/all-files/fa/FaAngleDoubleLeft';
import { FaAngleDoubleRight } from '@react-icons/all-files/fa/FaAngleDoubleRight';
import { FaAngleLeft } from '@react-icons/all-files/fa/FaAngleLeft';
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight';

import styled from 'styled-components';
import { sliceArrayByLimit } from 'util/useful-functions';

const Pagination = ({ totalPage, limit, page, setPage }) => {
  // 총 페이지 갯수에 따라 Pagination 갯수 정하기, limit 단위로 페이지 리스트 넘기기
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  useEffect(() => {
    if (page === totalPage) {
      setCurrentPageArray(totalPageArray.at(-1));
    }

    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  if (totalPage === 0) return null;

  return (
    <PaginationWrapper>
      <FaAngleDoubleLeft onClick={() => setPage(1)} disabled={page === 1} />
      <FaAngleLeft onClick={() => setPage(page - 1)} disabled={page === 1} />
      <ButtonWrapper>
        {currentPageArray?.map((i) => (
          <PageButton
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : null}
          >
            {i + 1}
          </PageButton>
        ))}
      </ButtonWrapper>
      <FaAngleRight
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
      />
      <FaAngleDoubleRight
        onClick={() => setPage(totalPage)}
        disabled={page === totalPage}
      />
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  svg {
    margin: 0 1rem;
    cursor: pointer;

    &[disabled] {
      pointer-events: none;
      cursor: revert;
    }
  }
`;

const ButtonWrapper = styled.div`
  padding: 0 1rem;
`;

const PageButton = styled.button`
  width: 50px;
  height: 50px;
  font-size: 1rem;
  padding: 12px;
  margin: 0 0.5em;
  border-radius: 100px;

  &[aria-current] {
    color: #ffffff;
    background: #3563e9;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
