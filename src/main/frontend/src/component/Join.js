import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './Join.css';
import Errorpage from './Errorpage';
import Login from './Login';
import Loading from './Loading';

const Join = ({ successhandler }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfrim, setPasswordconfrim] = useState('');
  const [genertion, seGenertion] = useState('');
  const [nickname, setNickname] = useState('');
  const [isuniqueemail, setisuniqueemail] = useState('');
  const [isuniquenickname, setisuniquenickname] = useState('');
  const[isloading, setisloading] = useState(true);
  const [generation, setGeneration] = useState('');

  const accessToken = "";

  const navigate = useNavigate();

   useEffect(() => {
          const timer = setTimeout(() => {
              setisloading(false);
          }, 500);

          return () => clearTimeout(timer);
      }, []);


  const handleJoin = async () => {
    if (password != passwordconfrim) {
      alert('비밀번호가 틀립니다');
      return;
    }
    else if(!isuniqueemail){
      alert('이메일 중복확인을 해주세요!');
      return;
    }
    else if(!isuniquenickname){
      alert('닉네임 중복확인을 해주세요!');
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'members',
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
      );
      navigate('/main_1020/login');
        successhandler(5);
        if (response !== undefined) {

        }
    } catch (error) {
      //navigate('/error/' + error.message);
      alert(JSON.stringify(error.message));
      console.log(error.response.data);
    }
  };

  const handleUniqueEmail = async() => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + 'members/checkemail?email=' + id,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if(response.data){
        //alert("이미 존재하는 이메일입니다.");
        setisuniqueemail(false);
      }
      else{
        //alert("사용할 수 있는 이메일입니다.");
        setisuniqueemail(true);
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
      console.log(error.response.data);
    }
  };

  const handleUniqueName = async() => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + 'members/checkname?nickname=' + nickname,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if(response.data){
        //alert("이미 존재하는 닉네임입니다.");
        setisuniquenickname(false);
      }
      else{
        //alert("사용할 수 있는 닉네임입니다.");
        setisuniquenickname(true);
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
      console.log(error.response.data);
    }
  };

  return (
      <div className={`joinmainbox ${isloading ? 'loading' : ''}`}>
        {!isloading ? (
          <>
            <div className='joinbar'>
              <div className='joinline' />
              회원가입
              <div className='joinline' />
            </div>
            <div>
              <input className='joininputmiddle' type="text" placeholder='Email' value={id} onChange={(e) => setId(e.target.value)} />
              <button className="joinuniquebutton gradient" onClick={handleUniqueEmail}>중복확인</button>
            </div>
            {(isuniqueemail !== "" ) ? (isuniqueemail ? "사용할 수 있는 이메일입니다." : "중복된 이메일입니다.") : ""}
            <div>
              <input className='joininputmiddle' type="text" placeholder='닉네임' value={nickname} onChange={(e) => setNickname(e.target.value)} />
              <button className="joinuniquebutton gradient" onClick={handleUniqueName}>중복확인</button>
            </div>
            {(isuniquenickname !== "" ) ? (isuniquenickname ? "사용할 수 있는 닉네임입니다." : "중복된 닉네임입니다.") : ""}
            <div>
              <input className='joininput' type="password" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <input className='joininput' type="password" placeholder='비밀번호 확인' value={passwordconfrim} onChange={(e) => setPasswordconfrim(e.target.value)} />
            </div>
            {(passwordconfrim !== "" && password !== passwordconfrim )? "비밀번호가 일치하지 않습니다." : ""}
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
          </>
        ) : (
          <div className='loading-container'>
            <Loading generation={generation} />
          </div>
        )}
      </div>
    );
  };

export default Join;
