import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './Join.css';
import Errorpage from './Errorpage';
import Login from './Login';

const Join = ({ successhandler }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfrim, setPasswordconfrim] = useState('');
  const [genertion, seGenertion] = useState('');
  const [nickname, setNickname] = useState('');

  const accessToken = "";

  const navigate = useNavigate();

  const handleJoin = async () => {
    if (password != passwordconfrim) {
      alert('비밀번호가 틀립니다fff!');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/members',
        {
          email: id,
          password: password,
          nickname: nickname,
          generation: genertion
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then(function (response) {
        navigate('/main_1020/login');
        successhandler(5);
        if (response !== undefined) {

        }
      });
    } catch (error) {
      //navigate('/error/' + error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className='joinbar'><div className='joinline' />또는<div className='joinline' /></div>
      <div className='joinmainbox'>
        <div>
          <input className='joininput' type="text" placeholder='Email' value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <input className='joininput' type="text" placeholder='닉네임' value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div>
          <input className='joininput' type="password" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <input className='joininput' type="password" placeholder='비밀번호 확인' value={passwordconfrim} onChange={(e) => setPasswordconfrim(e.target.value)} />
        </div>
        <div>
          <select className={'joingenerationselect'} onChange={(e) => {
            seGenertion(e.target.value);
          }}>
            <option className={"joingenerationselectoption"} disabled hidden selected>세대 선택</option>
            <option className={"joingenerationselectoption"} value="GENERATION_8090">8090</option>
            <option className={"joingenerationselectoption"} value="GENERATION_9000">9000</option>
            <option className={"joingenerationselectoption"} value="GENERATION_0010">0010</option>
            <option className={"joingenerationselectoption"} value="GENERATION_1020">1020</option>
          </select>
        </div>
        {"모든 세대의 글은 조회가 가능하나, 댓글과 게시글 작성 및 투표는 "}<br />
        {"선택한 세대와 앞 뒤로 1세대만 추가로 가능합니다. "}<br />
        {"예시) 9000을 선택하지면 8090~0010만 작성 및 투표가 가능합니다."}
        <div>
          <button className="joinbutton gradient" onClick={handleJoin}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default Join;
