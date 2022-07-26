import React from 'react';

import { GiSoccerField } from '@react-icons/all-files/gi/GiSoccerField';
import { FaShower } from '@react-icons/all-files/fa/FaShower';
import { AiFillCar } from '@react-icons/all-files/ai/AiFillCar';
import { GiClothes } from '@react-icons/all-files/gi/GiClothes';
import { GiRunningShoe } from '@react-icons/all-files/gi/GiRunningShoe';

const IconDataList = [
  {
    id: 1,
    icon: <GiSoccerField />,
    iconName: '경기장크기',
  },
  {
    id: 2,
    icon: <FaShower />,
    iconName: '샤워실',
  },
  {
    id: 3,
    icon: <AiFillCar />,
    iconName: '무료주차',
  },
  {
    id: 4,
    icon: <GiClothes />,
    iconName: '운동복 대여',
  },
  {
    id: 5,
    icon: <GiRunningShoe />,
    iconName: '풋살화 대여',
  },
];

export default IconDataList;
