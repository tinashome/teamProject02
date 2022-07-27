import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  } 100% {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal === '' ? 'none' : 'flex')};
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 30px;
  font-weight: 400;
  letter-spacing: -2px;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export default ModalWrapper;
