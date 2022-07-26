import { atom } from 'recoil';

export const boardListState = atom({
  key: 'boardListState',
  default: {
    length: 0,
    data: [],
  },
});

export const boardPageState = atom({
  key: 'boardPageState',
  default: 1,
});
