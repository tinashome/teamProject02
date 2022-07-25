import { atom } from 'recoil';

export const groundPhotoListState = atom({
  key: 'groundPhotoListState',
  default: {
    length: 0,
    data: [],
  },
});

export const groundTextListState = atom({
  key: 'groundTextListState',
  default: {
    length: 0,
    data: [],
  },
});

export const groundListTypeState = atom({
  key: 'groundListTypeState',
  default: 'photo',
});

export const locationState = atom({
  key: 'locationState',
  default: '',
});

export const searchInputState = atom({
  key: 'searchInputState',
  default: '',
});

export const pageState = atom({
  key: 'pageState',
  default: 1,
});
