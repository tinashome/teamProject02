import React from 'react';
import styled from 'styled-components';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';

const SearchBar = ({ placeholder, value, onChange, onKeyDown }) => (
  <Container>
    <FaSearch />
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  </Container>
);

const Container = styled.div`
  width: 18rem;
  display: flex;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 24px;
  padding: 12px 16px;
  margin-right: 8rem;
  transition: border ease 0.5s;
  &:focus-within {
    border: 1px solid #3563e9;
  }
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

export default SearchBar;
