import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const accessToken = "";

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/v1/members/login',
        {
            username : id,
            password : password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert('로그인 성공!');
      if(response !== undefined)
      {

      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  return (<div>
        <div>
            <label htmlFor="qnaTitle">이메일</label>
            <input className='logininput' type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
            <label htmlFor="qnaTitle">비밀번호</label>
            <input className='logininput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
            <button className="btn-1 custom-btn" onClick={handleLogin}>로그인</button>
        </div>
  </div>);
};

export default Login;
