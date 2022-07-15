import React from 'react';
import BannerImage from 'components/atoms/BannerImage';
import banner from 'assets/image/banner.jpeg';
import styled from 'styled-components';

import GroundCard from 'components/organisms/GroundCard';
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

export default Home;
