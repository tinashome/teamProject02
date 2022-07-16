import { atom } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors) key값으로 state를 찾는다. => 고유한 값이 있어야만 한다는 정도만
  default: '', // default value (aka initial value)
});

const adminContentState = atom({
  key: 'sideMenu',
  default: [],
});
export { textState, adminContentState };
