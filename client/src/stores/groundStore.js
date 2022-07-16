import { atom } from 'recoil';

export const groundListState = atom({
  key: 'groundListState',
  default: {
    isLoading: false,
    // isLoading: true일 시, 처음 페이지에 접근하거나 새로 고침 시 Spinner가 보임
    // isLoading: true,
    length: 0,
    // data: [
    //   {
    //     groundName: '',
    //     paymentPoint: 0,
    //     groundImg: [''],
    //     groundAddress: {
    //       postalCode: '',
    //       address1: '',
    //       address2: '',
    //     },
    //   },
    // ],
  },
});

export default groundListState;
