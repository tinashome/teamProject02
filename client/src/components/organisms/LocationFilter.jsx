import React from 'react';
import { FaAngleDown } from '@react-icons/all-files/fa/FaAngleDown';
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
  padding: 0.5rem 1rem;
  margin-right: 2rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  button {
    margin-right: 0.5rem;
  }
`;

const FilterName = styled.p`
  margin-right: 0.5rem;
  font-size: 16px;
`;

export default LocationFilter;
