import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import SearchBar from 'components/organisms/SearchBar';
import LocationFilter from 'components/organisms/LocationFilter';
import locationList from 'constants/locationList';
import GroundSlide from 'components/organisms/GroundSlide';
import GroundPhotoList from 'components/organisms/GroundPhotoList';
import GroundTextList from 'components/organisms/GroundTextList';

const Home = () => {
  const [location, setLocation] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Toggle List Type
  const [isPhotoList, setIsPhotoList] = useState(true);
  const [listType, setListType] = useState('글');
  const handleToggleListType = useCallback(() => {
    setIsPhotoList((prev) => !prev);
    if (listType === '글') setListType('그림');
    else setListType('글');
  }, [isPhotoList]);

  // Search
  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      setSearchInput(e.target.value);
    }
  };

  // Location Filter
  const [isOpenFilterModal, setisOpenFilterModal] = useState(false);
  const handleToggleFilterModal = useCallback(() => {
    setisOpenFilterModal((prev) => !prev);
  }, [isOpenFilterModal]);

  const getFilteredData = async (e) => {
    if (e.target.innerText === '모든 지역') setLocation('');
    else setLocation(e.target.innerText);
    handleToggleFilterModal();
  };

  return (
    <>
      <GroundSlide />
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
          <SearchBar placeholder='구장 찾기' onKeyDown={handleSearch} />
          <ListTypeButton type='button' onClick={handleToggleListType}>
            {listType === '글' ? '글로 보기' : '그림으로 보기'}
          </ListTypeButton>
        </FilterWrapper>
        {isPhotoList ? (
          <GroundPhotoList location={location} searchInput={searchInput} />
        ) : (
          <GroundTextList location={location} searchInput={searchInput} />
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
  margin: 0 1rem 0.5rem 1rem;
`;

const FilterModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
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

const ListTypeButton = styled.button`
  margin-left: auto;
`;

export default Home;
