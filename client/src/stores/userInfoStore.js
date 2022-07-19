import { atom } from 'recoil';

const userInfo = atom({
  key: 'userInfo',
  default: {},
});

export default userInfo;
