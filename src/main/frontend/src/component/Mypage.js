import HotPostList from './post/HotPostList';
import './Mypage.css';
import React, { useState, useEffect, useContext } from 'react';
//회원정보를 싱글톤으로 사용
import memberInfo from '../MemberInfo';
import Login from './Login';
import MyProfile from './MyProfile'

const Mypage = ({ generation }) => {
    //info
    const info = memberInfo.getMemberInfo();
    //로그인 상태를 넣어서 로그인창을 보여줄지 정보를 보여줄지를 결정함
    const [login, setlogin] = useState(info.login);

    //회원정보 업데이트가 필요할 때 사용
    const updateInfo = () => {
        memberInfo.updateMemberInfo({ 
            //여기에 바뀌어야하는 값을 넣는다//회원정보 수정, 공유할 때 등,...
            login: false });
        setlogin(false);
        localStorage.setItem('accessToken', "");
        localStorage.setItem('refresh', "");
    };


    return (
        <div className={'main' + generation + 'memberbox'}>
            <div className={'main' + generation + 'memberinbox'}>
                {login ?
                //info.변수로 사용
                    (<div><div className={'main' + generation + 'membertitle'}><span>{info.name}</span>
                        <span className={'main' + generation + 'membertitlegeneration'}>[1020]</span></div>
                        <div className={'main' + generation + 'memberpoint'}>투표권 {info.balancegameticket}장</div>
                        <div className='direction-row'><button className={'main' + generation + 'memberbutton'}>[마이페이지]</button>
                            <button className={'main' + generation + 'memberbutton'} onClick={updateInfo}>[로그아웃]</button></div></div>)
                    : <Login issmall={true} successhandler={() => setlogin(true)} generation={generation}/>}

                <HotPostList generation={generation} />
            </div>
        </div>
    );
};

export default Mypage;
