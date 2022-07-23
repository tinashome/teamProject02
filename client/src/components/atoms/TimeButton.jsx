import React from 'react';
import { useRecoilState } from 'recoil';
import { selectBtnValue } from 'stores/reservationStore';
import styled from 'styled-components';

const TimeButton = styled.button`
  width: 210px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  background: #bac8ff;
  border: solid #bdbdbd;
  border-radius: 3px;
  margin: 3px;
  &:hover {
    opacity: 0.7;
  }
`;

const TimeBtn = ({ renderTime, startTime, endTime, reservationInfo }) => {
  const [selectBtn, setSelectBtn] = useRecoilState(selectBtnValue);
  // renderTime, startTime, endTime Slice 작업 필요 type도 number로 변경
  const startTimeSlice = Number(renderTime?.slice(0, 2));
  const endTimeSlice = Number(renderTime?.slice(6, 8));
  const startTimeFormat = Number(startTime?.slice(0, 2));
  const endTimeFormat = Number(endTime?.slice(0, 2));

  const isAble =
    startTimeSlice < startTimeFormat ||
    endTimeSlice > endTimeFormat ||
    reservationInfo.includes(renderTime);

  return (
    <TimeButton value={renderTime} disabled={isAble} onClick={(e) => setSelectBtn(e.target.value)}>
      {renderTime}
    </TimeButton>
  );
};

export default TimeButton;
export { TimeBtn };
