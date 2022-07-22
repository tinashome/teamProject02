import { atom } from 'recoil';

// const adminContentState = atom({
//   key: 'adminContentState',
//   default: [],
// });

const timeValue = atom({
  key: 'timeValue',
  default: [
    {
      id: 1,
      value: '07:00~08:00',
      reservation: false,
    },
    {
      id: 2,
      value: '08:00~09:00',
      reservation: false,
    },
    {
      id: 3,
      value: '09:00~10:00',
      reservation: false,
    },
    {
      id: 4,
      value: '10:00~11:00',
      reservation: false,
    },
    {
      id: 5,
      value: '11:00~12:00',
      reservation: false,
    },
    {
      id: 6,
      value: '12:00~13:00',
      reservation: false,
    },
    {
      id: 7,
      value: '13:00~14:00',
      reservation: false,
    },
    {
      id: 8,
      value: '14:00~15:00',
      reservation: false,
    },
    {
      id: 9,
      value: '15:00~16:00',
      reservation: false,
    },
    {
      id: 10,
      value: '16:00~17:00',
      reservation: false,
    },
    {
      id: 11,
      value: '17:00~18:00',
      reservation: false,
    },
    {
      id: 12,
      value: '18:00~19:00',
      reservation: false,
    },
    {
      id: 13,
      value: '19:00~20:00',
      reservation: false,
    },
    {
      id: 14,
      value: '20:00~21:00',
      reservation: false,
    },
    {
      id: 15,
      value: '21:00~22:00',
      reservation: false,
    },
  ],
});
export default timeValue;
