import axios from 'axios';

// .env에서 백엔드 포트번호를 설정해야 함.
// const backendPort = process.env.REACT_APP_BACKEND_PORT || 5000;
// const baseUrl = `http://${window.location.hostname}:${backendPort}`;
const baseUrl = `https://futsal-api-elice.herokuapp.com/api/`;

async function get(endpoint) {
  console.log(`%cGET 요청 ${baseUrl + endpoint}`, 'color: #a25cd1;');

  return axios.get(baseUrl + endpoint, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  console.log(`%cPOST 요청: ${baseUrl + endpoint}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');

  return axios.post(baseUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

async function patch(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  console.log(`%cPATCH 요청: ${baseUrl + endpoint}`, 'color: #059c4b;');
  console.log(`%cPATCH 요청 데이터: ${bodyData}`, 'color: #059c4b;');

  return axios.patch(baseUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint) {
  console.log(`DELETE 요청 ${baseUrl + endpoint}`);

  return axios.delete(baseUrl + endpoint, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

async function postImg(endpoint, formdata) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  // const bodyData = JSON.stringify(data);

  console.log(`%cPOST 요청: ${baseUrl + endpoint}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${formdata}`, 'color: #296aba;');

  return axios.post(baseUrl + endpoint, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, postImg, patch, del as delete };
