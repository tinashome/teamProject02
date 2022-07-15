import React from 'react';
import BannerImage from 'components/atoms/BannerImage';
import GroundCard from 'components/organisms/GroundCard';
import banner from 'assets/image/banner.jpeg';
import styled from 'styled-components';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import groundListDummy from './groundListDummy';

const Home = () => (
  <>
    <BannerImage src={banner} />
    <Container>
      {/* <FilterWrapper>
        <button type='button'>모든 지역</button>
        <button type='button'>완료 제외</button>
        <input placeholder='구장 찾기' />
      </FilterWrapper> */}
      <GroundList>
        {groundListDummy.map((ground) => (
          <GroundCard ground={ground} />
        ))}
      </GroundList>
      <PaginationWrapper>
        <FaAngleDoubleLeft />
        <FaAngleLeft />
        <ButtonWrapper>
          <PageButton>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>4</PageButton>
          <PageButton>5</PageButton>
        </ButtonWrapper>
        <FaAngleRight />
        <FaAngleDoubleRight />
      </PaginationWrapper>
    </Container>
  </>
);

const Container = styled.div`
  padding: 2rem 10rem;
`;

// const FilterWrapper = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   padding: 1rem 0;
//   margin-bottom: 2rem;
// `;

const GroundList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  svg {
    margin: 0 0.5rem;
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  padding: 0 2rem;
`;

const PageButton = styled.button`
  font-size: 1.2rem;
  margin: 0 1em;
`;

export default Home;
