import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    userId: '',
    email: '',
    name: '',
    role: '',
    isOAuth: '',
  },
});

export const userPointState = atom({
  key: 'userPointState',
  default: {
    isChange: false,
    totalPoint: 0,
  },
});
