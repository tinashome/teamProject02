import { atom } from 'recoil';

const reservationDateInfo = atom({
  key: 'reservationDateInfo',
  default: [],
});

const selectBtnValue = atom({
  key: 'selectBtnValue',
  default: '',
});

const selectDateValue = atom({
  key: 'selectDateValue',
  default: '',
});

export { reservationDateInfo, selectBtnValue, selectDateValue };
