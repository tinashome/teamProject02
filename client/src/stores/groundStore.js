import { atom } from 'recoil';

export const groundPhotoListState = atom({
  key: 'groundPhotoListState',
  default: {
    isLoading: false,
    length: 0,
    data: [],
  },
});

export const groundTextListState = atom({
  key: 'groundTextListState',
  default: {
    isLoading: false,
    length: 0,
    data: [],
  },
});

export const groundListTypeState = atom({
  key: 'groundListTypeState',
  default: 'photo',
});
