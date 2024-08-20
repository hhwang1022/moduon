import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Join = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfrim, setPasswordconfrim] = useState('');
  const [genertion, seGenertion] = useState('');
  const [nickname, setNickname] = useState('');

  const accessToken = "";

  const handleJoin = async () => {
    if(password != passwordconfrim){
        alert('비밀번호가 틀립니다!');
        return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/members',
        {
            email : id,
            password : password,
            nickname : nickname,
            generation : genertion
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert('가입 성공!');
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
            <label htmlFor="qnaTitle">비밀번호 확인</label>
            <input className='logininput' type="password" value={passwordconfrim} onChange={(e) => setPasswordconfrim(e.target.value)} />
        </div>
        <div>
            <label htmlFor="qnaTitle">닉네임</label>
            <input className='logininput' type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div>
            <label htmlFor="qnaTitle">세대</label>
            <input className='logininput' type="text" value={genertion} onChange={(e) => seGenertion(e.target.value)} />
        </div>
        <div>
            <button className="btn-1 custom-btn" onClick={handleJoin}>회원가입</button>
        </div>
  </div>);
};

export default Join;
