import React, { useEffect, useState } from 'react';
import BannerImage from 'components/atoms/BannerImage';
import GroundCard from 'components/organisms/GroundCard';
import banner from 'assets/image/banner.jpeg';
import styled from 'styled-components';
import * as Api from 'api/api';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleDown,
  FaSearch,
} from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { groundListState } from 'stores/groundStore';
import Spinner from 'components/atoms/Spinner';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [groundList, setGroundList] = useRecoilState(groundListState);
  const [page, setPage] = useState(1);

  const handleChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      if (searchValue === '') {
        alert('검색어를 입력해주세요!');
      }
      setGroundList({
        isLoading: true,
      });
      const searchResult = await Api.get(`grounds/?search=${searchValue}`);
      setGroundList({
        isLoading: false,
        length: searchResult.data.length,
        data: searchResult.data.grounds,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const result = await Api.get(`grounds?offset=${(page - 1) * 8}`);
      setGroundList({
        isLoading: false,
        length: result.data.length,
        data: result.data.grounds,
      });
    })();
  }, [page]);

  const pagesNum = Math.ceil(groundList.length / 8);

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
              value={searchValue}
              onChange={handleChangeSearchInput}
              onKeyDown={handleSearch}
            />
          </SearchBar>
        </FilterWrapper>
        {groundList.isLoading ? (
          <Spinner />
        ) : (
          <>
            <GroundList>
              {groundList.data?.map((ground) => (
                <GroundCard ground={ground} key={ground._id} />
              ))}
            </GroundList>
            {groundList.length !== 0 && (
              <PaginationWrapper>
                <FaAngleDoubleLeft />
                <FaAngleLeft />
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
                <FaAngleRight />
                <FaAngleDoubleRight />
              </PaginationWrapper>
            )}
          </>
        )}
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
  align-items: center;
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
  padding-left: 0.8rem;
`;

const GroundList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
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
  font-size: 1rem;
  padding: 12px;
  margin: 0 1em;
  border-radius: 50%;

  &[aria-current] {
    color: #ffffff;
    background: #3563e9;
    cursor: revert;
  }
`;

export default Home;
