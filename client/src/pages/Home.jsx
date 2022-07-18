import React, { useEffect, useState } from 'react';
import BannerImage from 'components/atoms/BannerImage';
import GroundCard from 'components/organisms/GroundCard';
import banner from 'assets/image/banner.jpeg';
import styled from 'styled-components';
import * as Api from 'api/api';
import { useRecoilState } from 'recoil';
import { groundListState } from 'stores/groundStore';
import Spinner from 'components/atoms/Spinner';
import SearchBar from 'components/organisms/SearchBar';
import DistrictFilter from 'components/organisms/DistrictFilter';
import Pagination from 'components/organisms/Pagination';

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
        setGroundList({
          isLoading: true,
        });
        const result = await Api.get(`grounds`);
        setGroundList({
          isLoading: false,
          length: result.data.length,
          data: result.data.grounds,
        });
        return;
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
          <DistrictFilter filterName='모든 지역' />
          <SearchBar
            placeholder='구장 찾기'
            value={searchValue}
            onChange={handleChangeSearchInput}
            onKeyDown={handleSearch}
          />
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
              <Pagination pagesNum={pagesNum} page={page} setPage={setPage} />
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

const GroundList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  margin-bottom: 3rem;
`;

export default Home;
