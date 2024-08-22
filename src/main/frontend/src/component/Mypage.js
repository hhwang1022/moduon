import HotPostList from './post/HotPostList';
import './Mypage.css';
import React, { useState, useEffect, useContext } from 'react';
import memberInfo from '../MemberInfo';
import Login from './Login';

const Mypage = ({ generation }) => {
    const info = memberInfo.getMemberInfo();
    const [login, setlogin] = useState(info.login);

    const updateInfo = () => {
        memberInfo.updateMemberInfo({ login: false });
        setlogin(false);
        localStorage.setItem('accessToken', "");
        localStorage.setItem('refresh', "");
    };

    return (
        <div className={'main' + generation + 'memberbox'}>
            <div className={'main' + generation + 'memberinbox'}>
                {login ?
                    (<div><div className={'main' + generation + 'membertitle'}><span>{info.name}</span>
                        <span className={'main' + generation + 'membertitlegeneration'}>[1020]</span></div>
                        <div className={'main' + generation + 'memberpoint'}>투표권 {info.balancegameticket}장</div>
                        <div className='direction-row'><button className={'main' + generation + 'memberbutton'}>[마이페이지]</button>
                            <button className={'main' + generation + 'memberbutton'} onClick={updateInfo}>[로그아웃]</button></div></div>)
                    : <Login issmall={true} successhandler={() => setlogin(true)}/>}

                <HotPostList generation={generation} />
            </div>
        </div>
    );

    // return (login ?
    //     <div className={'main' + generation + 'memberbox'}>
    //         <div className={'main' + generation + 'memberinbox'}>
    //             <div className={'main' + generation + 'membertitle'}><span>{info.name}</span> <span className={'main' + generation + 'membertitlegeneration'}>[1020]</span></div>
    //             <div className={'main' + generation + 'memberpoint'}>투표권 {info.balancegameticket}장</div>
    //             <div className='direction-row'><button className={'main' + generation + 'memberbutton'}>[마이페이지]</button>
    //                 <button className={'main' + generation + 'memberbutton'} onClick={updateInfo}>[로그아웃]</button></div>
    //             <HotPostList generation={generation} />
    //         </div>
    //     </div> : <Login/>
    // );
};

export default Mypage;
