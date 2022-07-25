import styled from 'styled-components';

const ModalDiv = styled.div`
  display: ${(props) => (props.modal === '' ? 'none' : 'flex')}};
  position:absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 200px;
  margin-left: -150px;
  margin-top: -100px;
  padding: 20px;
  border-radius: 5px;
  background-color:#fff;
  justify-content: center;
  text-align: center;
  align-items: center;
  white-space: pre-line;
  flex-direction: column;
`;

export default ModalDiv;
