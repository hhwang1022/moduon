import './MyProfile.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import memberInfo from '../MemberInfo';

const MyProfile = ({ onclicklistbtn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [balanceGameTicket, setBalanceGameTicket] = useState('');

  const accessToken = window.localStorage.getItem('accessToken');

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8080/members/info',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Assuming response.data contains the user info
      const data = response.data;
      setName(data.name);
      setEmail(data.email);
      setBalanceGameTicket(data.balancegameticket);

    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <div className='MyProfilebar'>
        <div className='MyProfileline' />마이페이지<div className='MyProfileline' />
      </div>

      <div className='MyProfilemainbox'>
        {/* 회원정보 수정 버튼 */}
        <button className="UpdateProfile" onClick={fetchProfile}>회원 정보 수정</button>
        <div className='SpacingBetween'></div>

        {/* 닉네임 필드 */}
        <div className='MyProfileDetails'>닉네임</div>
        <div className='MyProfile'>{name}</div>
        <div className='SpacingBetweenFields'></div>

        {/* Email 필드 */}
        <div className='MyProfileDetails'>Email</div>
        <div className='MyProfile'>{email}</div>
        <div className='SpacingBetweenFields'></div>

        {/* 보유 투표권 필드 */}
        <div className='MyProfileDetails'>보유 투표권</div>
        <div className='MyProfile'>{balanceGameTicket}</div>
        <div className='SpacingBetween'></div>

        {/* 회원탈퇴 버튼 */}
        <button className="DeleteAccount" onClick={() => alert('회원 탈퇴 버튼 클릭됨')}>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default MyProfile;
