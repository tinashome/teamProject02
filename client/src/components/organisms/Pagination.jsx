import React, { useState } from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import styled from 'styled-components';

const Pagination = ({ pagesNum, page, setPage }) => (
  <PaginationWrapper>
    <FaAngleDoubleLeft onClick={() => setPage(1)} disabled={page === 1} />
    <FaAngleLeft onClick={() => setPage(page - 1)} disabled={page === 1} />
    <ButtonWrapper>
      {Array(pagesNum)
        .fill()
        .map((_, i) => (
          <PageButton
            // eslint-disable-next-line react/no-array-index-key
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
      disabled={page === pagesNum}
    />
    <FaAngleDoubleRight
      onClick={() => setPage(pagesNum)}
      disabled={page === pagesNum}
    />
  </PaginationWrapper>
);

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
