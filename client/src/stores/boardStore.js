import { atom } from 'recoil';

export const userBoardListState = atom({
  key: 'userBoardListState',
  default: {
    length: 0,
    data: [],
  },
});

export const adminBoardListState = atom({
  key: 'adminBoardListState',
  default: [],
});

export const boardPageState = atom({
  key: 'boardPageState',
  default: 1,
});
