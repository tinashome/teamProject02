import React, { useState } from 'react';
import styled from 'styled-components';

const TimeBtn = ({
  renderTime,
  startTime,
  endTime,
  reservationDateInfo,
  setReservationTime,
}) => {
  const [isSelect, setIsSelect] = useState(false);

  // renderTime, startTime, endTime Slice 작업 필요 type도 number로 변경
  const startTimeSlice = Number(renderTime?.slice(0, 2));
  const endTimeSlice = Number(renderTime?.slice(6, 8));
  const startTimeFormat = Number(startTime?.slice(0, 2));
  const endTimeFormat = Number(endTime?.slice(0, 2));

  const isAble =
    startTimeSlice < startTimeFormat ||
    endTimeSlice > endTimeFormat ||
    reservationDateInfo?.includes(renderTime);

  return (
    <TimeButton
      key={renderTime}
      value={renderTime}
      disabled={isAble}
      onClick={(e) => {
        setReservationTime(e.target.value);
        setIsSelect(!isSelect);
      }}
      isSelect={isSelect}
    >
      {renderTime}
    </TimeButton>
  );
};

const TimeButton = styled.button`
  width: 210px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  background-color: ${(props) => (props.isSelect ? '#bdbdbd' : '#bac8ff')};
  border: solid #bdbdbd;
  border-radius: 3px;
  margin: 3px;
  :hover:enabled {
    opacity: 0.7;
  }
  :disabled {
    cursor: not-allowed;
  }
`;
export default TimeButton;
export { TimeBtn };
