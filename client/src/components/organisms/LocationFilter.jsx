import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import styled from 'styled-components';

const LocationFilter = ({ filterName, handleClick }) => (
  <Container onClick={handleClick}>
    <FilterName>{filterName}</FilterName>
    <FaAngleDown />
  </Container>
);

const Container = styled.button`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  button {
    margin-right: 0.5rem;
  }
`;

const FilterName = styled.p`
  margin-right: 0.5rem;
`;

export default LocationFilter;
