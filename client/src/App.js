import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [userlist, setUserlist] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const callApi = async () => {
    const result = await axios.get('/api/userlist');
    console.log(result.data);
    setUserlist(result.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <h2>DB 통신 확인 POST</h2>
      <div>
        email:
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div>
        password:
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        onClick={async () => {
          const sendUserInfo = {
            email,
            password,
          };
          // 서버 전달
          const result = await axios.post('/api/register', sendUserInfo);
          setEmail('');
          setPassword('');

          //서버 받기
          const setUsers = await axios.get('/api/userlist');
          setUserlist(setUsers.data);
          console.log(result);
        }}
      >
        유저정보 가입
      </button>

      <h3>DB 통신 확인 GET</h3>
      <div>
        <ol>
          {userlist.map((user, i) => (
            <li key={`${user}-${i}`}>
              <p>{user.email}</p>
              <p>{user.password}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
