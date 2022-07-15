import React, { useState } from 'react';
import BannerImage from 'components/atoms/BannerImage';
import GroundCard from 'components/organisms/GroundCard';
import banner from 'assets/image/banner.jpeg';
import styled from 'styled-components';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleDown,
  FaSearch,
} from 'react-icons/fa';
import groundListDummy from './groundListDummy';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <>
      <BannerImage src={banner} />
      <Container>
        <FilterWrapper>
          <AreaFilter>
            <FilterName>모든 지역</FilterName>
            <FaAngleDown />
          </AreaFilter>
          <SearchBar>
            <FaSearch />
            <StyledInput
              placeholder='구장 찾기'
              value={searchInput}
              onChange={handleChangeSearchInput}
            />
          </SearchBar>
        </FilterWrapper>
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
};

const Container = styled.div`
  padding: 1.5rem 10rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const AreaFilter = styled.button`
  display: flex;
  align-items: center;
  margin: 0 2rem;
  button {
    margin-right: 0.5rem;
  }
`;

const FilterName = styled.p`
  margin-right: 0.5rem;
`;

const SearchBar = styled.div`
  width: 18rem;
  display: flex;
  border: 1px solid #ced4da;
  border-radius: 24px;
  padding: 12px 16px;
  margin-right: 8rem;
  svg {
    opacity: 0.5;
  }
`;

const StyledInput = styled.input`
  width: 90%;
  border: none;
  outline: none;
  padding-left: 1rem;
`;

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
