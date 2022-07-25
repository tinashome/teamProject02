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

// UTC 시간을 한국시간으로 변환, 포맷 : YYYY-MM-DD
export const getCurrentDate = (data) => {
  const currentDate = new Date(data);

  const year = currentDate.getFullYear();
  const month = `0${currentDate.getMonth() + 1}`.slice(-2);
  const day = `0${currentDate.getDate()}`.slice(-2);

  const dateString = `${year}-${month}-${day}`;

  return dateString;
};
