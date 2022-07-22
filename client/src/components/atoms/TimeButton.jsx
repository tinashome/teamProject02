import React from 'react';
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

const TimeBtn = ({ renderTime, startTime, endTime }) => {
  // renderTime, startTime, endTime Slice 작업 필요 type도 number로 변경
  const startTimeSlice = Number(renderTime?.slice(0, 2));
  const endTimeSlice = Number(renderTime?.slice(6, 8));
  const startTimeFormat = Number(startTime?.slice(0, 2));
  const endTimeFormat = Number(endTime?.slice(0, 2));
  // reservationTime.includes(renderTime) => 날짜마다 예약 일자 날짜도 넣기

  const isAble =
    startTimeSlice < startTimeFormat || endTimeSlice > endTimeFormat;
  return (
    <TimeButton value={renderTime} disabled={isAble}>
      {renderTime}
    </TimeButton>
  );
};

export default TimeButton;
export { TimeBtn };
