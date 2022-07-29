import React from 'react';
import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Postcode = ({ setPostCode, setFindAddressRequired }) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    const postalCode = data.zonecode;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setPostCode([postalCode, fullAddress]);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
    setFindAddressRequired(false);
  };

  return (
    <AdressButton type='button' onClick={handleClick}>
      주소찾기
    </AdressButton>
  );
};

const AdressButton = styled.button`
  display: flex;
  width: 120px;
  height: 30px;
  padding: 3px;
  margin-left: 10px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  font-size: 14px;
  justify-content: center;
`;

export default Postcode;
