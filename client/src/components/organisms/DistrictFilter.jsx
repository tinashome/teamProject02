import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import styled from 'styled-components';

const DistrictFilter = ({ filterName }) => (
  <Container>
    <FilterName>{filterName}</FilterName>
    <FaAngleDown />
  </Container>
);

const Container = styled.button`
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

export default DistrictFilter;
