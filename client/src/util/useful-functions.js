// 토큰이 있는지 확인
export const isExistToken = () => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};

// 토큰 가져오기
export const getToken = () => localStorage.getItem('token');

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// 휴대폰 번호 하이픈 추가
export const addHyphen = (n) =>
  n.toString().replace(/\B(?=(\d{4})+(?!\d))/g, '-');
