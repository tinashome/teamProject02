import { atom } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
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
