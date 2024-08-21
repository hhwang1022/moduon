import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Login = ({successhandler}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  let accessToken = "";
  let refreshToken = "";

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/members/login',
        {
            username : id,
            password : password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
        {
          withCredentials:true
        }
      ).then( response => {
        alert('로그인 성공!');
        successhandler(4);
        
        if(response.headers['authorization'] !== undefined){
          accessToken = response.headers['authorization'].replace('Bearer ', '');
          refreshToken = response.headers['refresh'];
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refresh', refreshToken);
        }
      });
    } catch (error) {
      alert(error.message);
      //navigate('/error/' + error.message);
    }
  };

  return (<div className='joinmainbox'>
        <div>
          <input className='joininput' type="text" placeholder='Email' value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <input className='joininput' type="password" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
            <button className="joinbutton gradient" onClick={handleLogin}>로그인</button>
        </div>
  </div>);
};

export default Login;
