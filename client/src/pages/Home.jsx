import React, { useCallback, useEffect, useState } from 'react';
import BannerImage from 'components/atoms/BannerImage';
import GroundCard from 'components/organisms/GroundCard';
import banner from 'assets/image/banner.jpeg';
import styled from 'styled-components';
import * as Api from 'api/api';
import { useRecoilState } from 'recoil';
import { groundListState } from 'stores/groundStore';
import Spinner from 'components/atoms/Spinner';
import SearchBar from 'components/organisms/SearchBar';
import LocationFilter from 'components/organisms/LocationFilter';
import Pagination from 'components/organisms/Pagination';
import locationList from 'constants/locationList';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [location, setLocation] = useState('');
  const [page, setPage] = useState(1);
  const [groundList, setGroundList] = useRecoilState(groundListState);
  const totalPage = Math.ceil(groundList.length / 8);

  // 처음 화면 구성, Pagination, Location Filter 변경 시 실행
  useEffect(() => {
    (async () => {
      const result = await Api.get(
        `grounds?location=${location}&search=${searchValue}&offset=${
          (page - 1) * 8
        }`,
      );
      setGroundList({
        isLoading: false,
        length: result.data.length,
        data: result.data.grounds,
      });
    })();
  }, [page, location]);

  // Search
  const handleChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      if (searchValue === '') {
        setGroundList({
          isLoading: true,
        });
        const result = await Api.get(
          `grounds/?location=${location}&search=${searchValue}`,
        );
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
      const searchResult = await Api.get(
        `grounds/?location=${location}&search=${searchValue}`,
      );
      setGroundList({
        isLoading: false,
        length: searchResult.data.length,
        data: searchResult.data.grounds,
      });
    }
  };

  // Location Filter
  const [isOpenFilterModal, setisOpenFilterModal] = useState(false);
  const handleToggleFilterModal = useCallback(() => {
    setisOpenFilterModal((prev) => !prev);
  }, [isOpenFilterModal]);

  const getFilteredData = async (e) => {
    if (e.target.innerText === '모든 지역') {
      setLocation('');
    } else {
      setLocation(e.target.innerText);
    }
    handleToggleFilterModal();
    setGroundList({
      isLoading: true,
    });
    // useEffect Hook 실행
  };

  return (
    <>
      <BannerImage src={banner} />
      <Container>
        <FilterWrapper>
          <LocationFilter
            filterName={location || '모든 지역'}
            handleClick={handleToggleFilterModal}
          />
          {isOpenFilterModal && (
            <FilterModal>
              {locationList.map((districtName) => (
                <FilterButton
                  type='button'
                  key={districtName}
                  onClick={getFilteredData}
                >
                  {districtName}
                </FilterButton>
              ))}
            </FilterModal>
          )}
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
              <Pagination
                totalPage={10}
                limit={5}
                page={page}
                setPage={setPage}
              />
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
  position: relative;
  display: flex;
  margin-bottom: 0.5rem;
`;

const FilterModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  left: 1rem;
  top: 3rem;
  padding: 1.5rem 1rem;
  background-color: #495057;
  border-radius: 4px;
  z-index: 9;

  p {
    margin-bottom: 1rem;
  }
`;

const FilterButton = styled.button`
  width: 100%;
  padding: 4px 0;
  border-radius: 4px;
  color: #ffffff;

  & + & {
    margin-top: 0.5rem;
  }

  &:hover {
    background-color: #91a7ff;
  }
`;

const GroundList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  margin-bottom: 3rem;
`;

export default Home;
