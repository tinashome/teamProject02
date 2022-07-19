import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: {
    userId: '',
    name: '',
    role: '',
    isOAuth: '',
    isAdmin: false,
  },
});

export default userState;
