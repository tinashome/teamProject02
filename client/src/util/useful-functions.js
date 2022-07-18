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

// 페이지네이션 할 때, 특정 숫자까지의 배열을 만들고 limit 기준으로 자른 배열 만들기
export const sliceArrayByLimit = (totalPage, limit) => {
  const totalPageArray = Array(totalPage)
    .fill()
    .map((_, i) => i);
  return Array(Math.ceil(totalPage / limit))
    .fill()
    .map(() => totalPageArray.splice(0, limit));
};
