import { atom } from 'recoil';

export const groundPhotoListState = atom({
  key: 'groundPhotoListState',
  default: {
    length: 0,
    data: [],
  },
});

export const groundTextListState = atom({
  key: 'groundPhotoListState',
  default: {
    length: 0,
    data: [],
  },
});

export const groundListTypeState = atom({
  key: 'groundListTypeState',
  default: '그림',
});
