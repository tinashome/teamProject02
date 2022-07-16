import React from 'react';
import { TbSoccerField } from 'react-icons/tb';
import { MdOutlineShower } from 'react-icons/md';
import { AiFillCar } from 'react-icons/ai';
import { GiClothes, GiRunningShoe } from 'react-icons/gi';

const IconDataList = [
  {
    id: 1,
    icon: <TbSoccerField />,
    iconName: "21X15(m)", 
  },
  {
    id: 2,
    icon: <MdOutlineShower />,
    iconName: "샤워실"
  },
  {
    id: 3,
    icon: <AiFillCar />,
    iconName: "무료주차"

  },
  {
    id: 4,
    icon: <GiClothes />,
    iconName:"운동복 대여"
  },
  {
    id: 5,
    icon: <GiRunningShoe />,
    iconName: "풋살화 대여"
  },
];

export default IconDataList;
