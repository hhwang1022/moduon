import './MyProfile.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import memberInfo from '../MemberInfo';
import updateProfile from './UpdateProfile';
import DeleteAccountModal from './DeleteAccountModal';
import Loading from './Loading';

const MyProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [balanceGameTicket, setBalanceGameTicket] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [memberId, setmemberId] = useState('');
  const [login, setlogin] = useState(true);
  const[isloading, setisloading] = useState(true);
  const [generation, setGeneration] = useState('');


  const accessToken = window.localStorage.getItem('accessToken');

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
      setName(data.nickname);
      setEmail(data.email);
      setBalanceGameTicket(data.votingRights);
      setmemberId(data.memberId);

    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };
  fetchProfile();
  }, [accessToken]);

  const handleUpdateProfileClick = () => {
      navigate('/updateprofile');
    };

  const handleDeleteAccountClick = () => {
    setIsModalOpen(true);
  };

   const closeModal = () => {
      setIsModalOpen(false);
    };

   const handleConfirmDelete = async () => {
    try {
       const response = await axios.delete(
       process.env.REACT_APP_API_URL + 'members/',
      {
         headers: {
         'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
       },
      });
     closeModal();
     localStorage.removeItem('accessToken');
     localStorage.removeItem('refresh');
     memberInfo.updateMemberInfo({ login: false });
     navigate('/')
   } catch (error) {
     }
   };


  return (
  !isloading ?
    <div>
      <div className='MyProfilebar'>
        <div className='MyProfileline' />마이페이지<div className='MyProfileline' />
      </div>

      <div className='MyProfilemainbox'>
        {/* 회원정보 수정 버튼 */}
        <button className="joinbutton gradient" onClick={handleUpdateProfileClick}>회원 정보 수정</button>
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
        <button className="joinbutton gradient" onClick={handleDeleteAccountClick}>회원 탈퇴</button>
      </div>

       {/* 모달 렌더링 */}
          {isModalOpen && (
           <DeleteAccountModal
            onClose={closeModal}
            onConfirm={handleConfirmDelete}/>
            )}
    </div> : <div className='MyProfilebar'><Loading generation={generation}/> </div>
  );
};

export default MyProfile;
