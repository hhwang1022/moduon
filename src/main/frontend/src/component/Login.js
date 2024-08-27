import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import memberInfo from '../MemberInfo';
import Loading from './Loading';

const Login = ({ successhandler, issmall, generation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const[isloading, setisloading] = useState(!issmall);
  const [genertion, seGenertion] = useState('');
  const [error, setError] = useState('');

  let accessToken = "";
  let refreshToken = "";

  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옴

   useEffect(() => {
          const timer = setTimeout(() => {
              setisloading(false);
          }, 500);

          return () => clearTimeout(timer);
      }, [issmall]);


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
      setError("아이디 또는 비밀번호가 잘못 되었습니다.");
    }
  };

  const handleInfo = async () => {
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
        email :updateinfo.email,
        login: true,
      });

      if (!issmall) {
        successhandler(4);
      }
      else {
        successhandler();
        setError('');
      }

    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

   return (
      !isloading ? (
        <div className={'joinmainbox' + (issmall ? '_' : '')}>
          {!issmall && (
            <div className='UpdateProfilebar'>
              <div className='UpdateProfileline' />로그인<div className='UpdateProfileline' />
            </div>
          )}
          <div>
            <input className={'joininput' + (issmall ? '_' + generation : '')} type="text" placeholder='Email' value={id}
                   onChange={(e) => setId(e.target.value)} onKeyDown={handleKeyDown}/>
          </div>
          <div>
            <input className={'joininput' + (issmall ? '_' + generation : '')} type="password" placeholder='비밀번호' value={password}
                   onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
          </div>
          <div>
            <button className={'joinbutton' + (issmall ? '_' + generation + (generation === '1020' ? ' gradient' : '') : ' gradient')} onClick={handleLogin}>로그인</button>
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={'joinmainbox' + (issmall ? '_' : '')}>
          <Loading />
        </div>
      )
    );
  };

  export default Login;
