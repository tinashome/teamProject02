import { atom } from 'recoil';

export const groundListState = atom({
  key: 'groundListState',
  default: [
    {
      groundName: '',
      paymentPoint: 0,
      groundImg: [''],
      groundAddress: {
        postalCode: '',
        address1: '',
        address2: '',
      },
    },
  ],
});

export const groundLengthState = atom({
  key: 'groundLengthState',
  default: 1,
});
