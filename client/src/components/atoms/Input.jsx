import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

export default Input;
