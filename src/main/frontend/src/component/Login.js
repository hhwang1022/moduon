import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import memberInfo from '../MemberInfo';

const Login = ({ successhandler, issmall, generation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  let accessToken = "";
  let refreshToken = "";

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'members/login',
        {
          username: id,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
        {
          withCredentials: true
        }
      );
      if (response.headers['authorization'] !== undefined) {
        accessToken = response.headers['authorization'].replace('Bearer ', '');
        refreshToken = response.headers['refresh'];
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refresh', refreshToken);

        handleInfo();
      }

    } catch (error) {
      console.log(error);
      alert(error.message);
      //navigate('/error/' + error.message);
    }
  };

  const handleInfo = async () => {
    console.log(accessToken);
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + 'members/info',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true
        }
      );
      const updateinfo = response.data.data;

      memberInfo.updateMemberInfo({
        name: updateinfo.nickname,
        balancegameticket: updateinfo.votingRights,
        generation: updateinfo.memberGeneration,
        admin: updateinfo.roles,
        login: true,
      });

      if (!issmall) {
        successhandler(4);
      }
      else {
        successhandler();
      }

      navigate('/main_1020');

    } catch (error) {
      alert(JSON.stringify(error.message));
      console.log(error.response.data);
      //navigate('/error/' + error.message);
    }
  };

  return (<div className={'joinmainbox' + (issmall ? '_' : '')}>
    {issmall ? <></> :
      <div className='UpdateProfilebar'>
        <div className='UpdateProfileline' />로그인<div className='UpdateProfileline' />
      </div>}

    <div>
      <input className={'joininput' + (issmall ? '_' + generation : '')} type="text" placeholder='Email' value={id} onChange={(e) => setId(e.target.value)} />
    </div>
    <div>
      <input className={'joininput' + (issmall ? '_' + generation : '')} type="password" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <div>
      <button className={'joinbutton' + (issmall ? '_' + generation + (generation == '1020' ? ' gradient' : '') : ' gradient')} onClick={handleLogin}>로그인</button>
    </div>
  </div>);
};

export default Login;
