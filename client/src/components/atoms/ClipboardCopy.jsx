import React from 'react';
import styled from 'styled-components';

export default function ClipboardCopy() {
  const doCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    // 흐름 3.
    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    // 흐름 4.
    document.execCommand('copy');
    // 흐름 5.
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
  border-radius: 7px;
  background: #adb5bd;
  color: black;
  font-size: 0.8rem;
  margin-left:0.5rem;
  &:hover {
    opacity: 0.7;
  }
`;
