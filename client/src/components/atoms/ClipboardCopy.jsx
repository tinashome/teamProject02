import React from 'react';
import styled from 'styled-components';

export default function ClipboardCopy() {
  const doCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('클립보드에 복사되었습니다.');
  };

  return (
    <CopyBtn type='button' onClick={() => doCopy('104440-00-288818')}>
      계좌복사
    </CopyBtn>
  );
}

const CopyBtn = styled.button`
  padding: 0.3rem 0.5rem;
  border: solid #f1f3f5;
  border-radius: 5px;
  background: #adb5bd;
  color: black;
  font-size: 0.7rem;
  margin-left:0.5rem;
  margin-bottom:0.3rem;
  &:hover {
    opacity: 0.7;
  }
`;
