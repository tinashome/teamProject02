import { atom } from 'recoil';

// 관리페이지 경기장목록조회 api요청결과값을 저장하는 상태
const adminIsmobile = atom({
  key: 'adminIsmobile',
  default: false,
});

export default adminIsmobile;
