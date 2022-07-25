import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimeBtn = ({
  renderTime,
  startTime,
  endTime,
  reservationDate,
  reservationDateInfo,
  reservationTime,
  setReservationTime,
}) => {
  const [isSelect, setIsSelect] = useState(false);
  // renderTime, startTime, endTime Slice 작업 필요 type도 number로 변경
  const startTimeSlice = Number(renderTime?.slice(0, 2));
  const endTimeSlice = Number(renderTime?.slice(6, 8));
  const startTimeFormat = Number(startTime?.slice(0, 2));
  const endTimeFormat = Number(endTime?.slice(0, 2));

  useEffect(() => {
    setIsSelect(false);
    setReservationTime([]);
  }, [reservationDate]);

  // 2차원 배열 1차원으로 만들기
  let arr = [];
  reservationDateInfo.forEach((element) => {
    arr = [...arr, ...element];
  });

  const isAble =
    startTimeSlice < startTimeFormat ||
    endTimeSlice > endTimeFormat ||
    arr.includes(renderTime);

  const handleClick = (e) => {
    setIsSelect(!isSelect);
    if (isSelect === false) {
      setReservationTime([...reservationTime, e.target.value]);
    } else if (isSelect === true) {
      const removeElement = reservationTime.filter(
        (element) => element !== e.target.value,
      );
      setReservationTime(removeElement);
    }
  };

  return (
    <TimeButton
      key={renderTime}
      value={renderTime}
      disabled={isAble}
      onClick={(e) => {
        handleClick(e);
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
