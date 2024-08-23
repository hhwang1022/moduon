import './UpdateProfile.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import memberInfo from '../MemberInfo';


const UpdateProfile = ({ successhandler = () => {} }) => {
  const [nickname, setnickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfrim, setPasswordaconfrim] = useState('');
  const [memberId, setmemberId] = useState('');
  const [profile, setProfile] = useState(null);

 const accessToken = window.localStorage.getItem('accessToken');
 const navigate = useNavigate();

  useEffect(() => {
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
      const data = response.data.data;
      console.log(response);
      setmemberId(data.memberId);
      setnickname(nickname);
      setPassword(password);
      setPasswordaconfrim(passwordconfrim);


      } catch (error) {
         alert(error.message);
        }
      };
        fetchProfile();
      }, [accessToken]);

    const updateMember = async () => {
    if (password != passwordconfrim) {
             alert('비밀번호가 틀립니다!');
             return;
     };

    try {
      const response = await axios.patch(
        'http://127.0.0.1:8080/members/',
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
      console.log('successhandler:', successhandler);


      if (response.status === 200) {
        successhandler(5);
        alert('회원정보가 변경되었습니다.');
         }

      } catch (error) {
            console.error("Error updating profile: ", error);
            alert('회원정보 변경에 실패했습니다.' + error.message);
      }
    };

  return (
    <div>
      <div className='UpdateProfilebar'>
        <div className='UpdateProfileline' />회원정보 수정<div className='UpdateProfileline' />
      </div>

      <div className='UpdateProfilemainbox'>

        {/* 닉네임 필드 */}
        <div className='UpdateProfileDetails'>닉네임</div>
        <input className='UpdateProfileinput' type="text" placeholder='닉네임' value={nickname} onChange={(e) => setnickname(e.target.value)} />
        <div className='SpacingBetweenFields'></div>

        {/* password 필드 */}
        <div className='UpdateProfileDetails'>비밀번호</div>
        <input className='UpdateProfileinput' type="text" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className='SpacingBetweenFields'></div>

       {/* passwordconfrim 필드 */}
            <div className='UpdateProfileDetails'>비밀번호 확인</div>
            <input className='UpdateProfileinput' type="text" placeholder='비밀번호 확인' value={passwordconfrim} onChange={(e) => setPasswordaconfrim(e.target.value)} />
            <div className='SpacingBetweenFields'></div>


        {/* 취소, 수정 버튼 */}
       <div className='button-container'>
            <button className="cancellation" onClick={() => navigate('/')}>취소</button>
            <button className="Update" onClick={updateMember}>수정</button></div>
       </div>
    </div>
  );
};


export default UpdateProfile;