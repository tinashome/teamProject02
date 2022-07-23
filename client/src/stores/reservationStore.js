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

const selectCalendarDate = atom({
  key: 'selectDate',
  default: new Date(),
});
export { reservationDateInfo, selectBtnValue, selectDateValue, selectCalendarDate };
