import { atom } from 'recoil';

const pointSelected = atom({
  key: 'pointSelected',
  default: 0,
});

const chargeButton = atom({
  key: 'chargeButton',
  default: false,
});

const modalState = atom({
  key: 'modalState',
  default: false,
});


export { pointSelected, chargeButton, modalState };
