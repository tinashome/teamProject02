import { atom } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors) key값으로 state를 찾는다. => 고유한 값이 있어야만 한다는 정도만
  default: '', // default value (aka initial value)
});

// 관리페이지 메뉴선택하는 상태
const adminContentState = atom({
  key: 'sideMenu',
  default: [],
});

// 관리페이지 유저목록 api요청결과값을 저장하는 상태
const adminUsers = atom({
  key: 'adminUsers',
  default: [],
});
export { textState, adminContentState, adminUsers };
