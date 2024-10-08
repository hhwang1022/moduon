import './UpdateProfile.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import memberInfo from '../MemberInfo';
import Loading from './Loading';


const UpdateProfile = ({ successhandler = () => {} }) => {
  const [nickname, setnickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfrim, setPasswordaconfrim] = useState('');
  const [memberId, setmemberId] = useState('');
  const [profile, setProfile] = useState(null);
  const[isloading, setisloading] = useState(true);
  const [generation, setGeneration] = useState('');

 const accessToken = window.localStorage.getItem('accessToken');
 const navigate = useNavigate();

  useEffect(() => {
           const timer = setTimeout(() => {
               setisloading(false);
           }, 500);

           return () => clearTimeout(timer);
       }, []);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
         process.env.REACT_APP_API_URL + 'members/info',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      const data = response.data.data;
      setmemberId(data.memberId);
      setnickname(nickname);
      setPassword(password);
      setPasswordaconfrim(passwordconfrim);


      } catch (error) {
        alert('예기치 못한 오류가 발생했습니다.');
        }
      };
        fetchProfile();
      }, [accessToken]);

    const updateMember = async () => {
    if (password != passwordconfrim) {
             alert('비밀번호가 틀립니다!');
             return;
    };
    if(nickname === ""){
      alert('닉네임을 입력해주세요.')
      return;
    }
    if(nickname.length > 100){
      alert('닉네임은 최대 100자까지 입력 가능합니다.');
      return;
    }
    if(password === ""){
      alert('비밀번호을 입력해주세요.')
      return;
    }
    if(passwordconfrim === ""){
      alert('비밀번호 확인을 입력해주세요.')
      return;
    }
    try {
      const response = await axios.patch(
        process.env.REACT_APP_API_URL + 'members/',
        {
        memberId: memberId,
         nickname: nickname,
         password: password,

        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        successhandler(5);
        alert('회원정보가 변경되었습니다.');
        memberInfo.name = nickname;
        navigate('/');
         }

      } catch (error) {
            alert('회원정보 변경에 실패했습니다.' + error.message);
      }
    };

    useEffect(() => {
      const updateState = (info) => {
          setnickname(info.name);
      };

      memberInfo.subscribe(updateState);

      return () => {
          memberInfo.unsubscribe(updateState);
      };
  }, []);

  return (
  !isloading ?
    <div>
      <div className='UpdateProfilebar'>
        <div className='UpdateProfileline' />회원 정보 수정<div className='UpdateProfileline' />
      </div>

      <div className='UpdateProfilemainbox'>

        {/* 닉네임 필드 */}
        <div className='UpdateProfileDetails'>닉네임</div>
        <input className='UpdateProfileinput' type="text" placeholder='닉네임' value={nickname} onChange={(e) => setnickname(e.target.value)} />
        <div className='SpacingBetweenFields'></div>

        {/* password 필드 */}
        <div className='UpdateProfileDetails'>비밀번호</div>
        <input className='UpdateProfileinput' type="password" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className='SpacingBetweenFields'></div>

       {/* passwordconfrim 필드 */}
            <div className='UpdateProfileDetails'>비밀번호 확인</div>
            <input className='UpdateProfileinput' type="password" placeholder='비밀번호 확인' value={passwordconfrim} onChange={(e) => setPasswordaconfrim(e.target.value)} />
            <div className='SpacingBetweenFields'></div>


        {/* 취소, 수정 버튼 */}
       <div className='button-container'>
            <button className="cancellation" onClick={() => navigate('/')}>취소</button>
            <button className="Update" onClick={updateMember}>수정</button></div>
       </div>
    </div> : <div className='UpdateProfilebar'><Loading generation={generation}/> </div>
  );
};


export default UpdateProfile;
