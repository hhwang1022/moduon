import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './MyProfile.css';
import Errorpage from './Errorpage';
import Login from './Login';

const MyProfile = ({ successhandler }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfrim, setPasswordconfrim] = useState('');
  const [genertion, seGenertion] = useState('');
  const [nickname, setNickname] = useState('');

  const accessToken = "";

  const navigate = useNavigate();

  const handleMyProfile = async () => {
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
        successhandler(5);
        if (response !== undefined) {

        }
      });
    } catch (error) {
      //navigate('/error/' + error.message);
      alert(error.message);
    }
  };

  /*const [id, setId] = useState(""); // REPLACE with RESPONSE value
  const [nickname, setNickname] = useState(""); // REPLACE with RESPONSE value
  const [password, setPassword] = useState(""); // REPLACE with RESPONSE value

  // Handle RESPONSE here and set states accordingly
  useEffect(() => {
    // Example of setting values based on RESPONSE
    // Replace these with actual RESPONSE handling logic
    const response = {
      id: "sampleId",
      nickname: "sampleNickname",
      password: "samplePassword",
    };
    setId(response.id);
    setNickname(response.nickname);
    setPassword(response.password);
  }, []); // or add dependencies if needed
*/

 return (
   <div>
     <div className='MyProfilebar'>
       <div className='MyProfileline' />마이페이지<div className='MyProfileline' />
     </div>

     <div className='MyProfilemainbox'>

       {/* 회원정보 수정 버튼 */}
       <button className="UpdateProfile" onClick={handleMyProfile}>회원 정보 수정</button>
       <div className='SpacingBetween'></div>
       {/* 닉네임 필드 */}
       <div className='MyProfileDetails'>닉네임</div>
       <div>
         <input className='MyProfileinput' type="text" placeholder='닉네임' value={id} readOnly />
       </div>
       <div className='SpacingBetweenFields'></div>
       {/* Email 필드 */}
       <div className='MyProfileDetails'>Email</div>
       <div>
         <input className='MyProfileinput' type="text" placeholder='Email' value={nickname} readOnly />
       </div>
       <div className='SpacingBetweenFields'></div>
       {/* 보유 투표권 필드 */}
       <div className='MyProfileDetails'>보유 투표권</div>
       <div>
         <input className='MyProfileinput' type="text" placeholder='보유 투표권' value={password} readOnly />
       </div>
       <div className='SpacingBetween'></div>
       {/* 회원탈퇴 버튼 */}
       <button className="DeleteAccount" onClick={handleMyProfile}>회원 탈퇴</button>
     </div>
   </div>
 );
 };


export default MyProfile;
