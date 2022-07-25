import { atom } from 'recoil';

const pointSelected = atom({
  key: 'pointSelected',
  default: 0,
});

const modalState = atom({
  key: 'modalState',
  default: false,
});

const orderNumber = atom({
  key: 'orderNumber',
  default: '',
});

const issuedDate = atom({
  key: 'issuedDate',
  default: '',
});

export { pointSelected, modalState, orderNumber, issuedDate };
