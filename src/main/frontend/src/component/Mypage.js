import HotPostList from './post/HotPostList';
import './Mypage.css';
import React, { useState, useEffect, useContext } from 'react';
import memberInfo from '../MemberInfo'; 

const Mypage = ({ generation }) => {
    const info = memberInfo.getMemberInfo();
    const [login, setlogin] = useState(info.login);

    const updateInfo = () => {
        memberInfo.updateMemberInfo({ login: false });
        setlogin(false);
          localStorage.setItem('accessToken', "");
          localStorage.setItem('refresh', "");
    };

    return (login ?
        <div className={'main' + generation + 'memberbox'}>
            <div className={'main' + generation + 'memberinbox'}>
                <div className={'main' + generation + 'membertitle'}><span>{info.name}</span> <span className={'main' + generation + 'membertitlegeneration'}>[1020]</span></div>
                <div className={'main' + generation + 'memberpoint'}>투표권 {info.balancegameticket}장</div>
                <div className='direction-row'><button className={'main' + generation + 'memberbutton'}>[마이페이지]</button>
                    <button className={'main' + generation + 'memberbutton'} onClick={updateInfo}>[로그아웃]</button></div>
                <HotPostList generation={generation} />
            </div>
        </div> : <></>
    );
};

export default Mypage;
