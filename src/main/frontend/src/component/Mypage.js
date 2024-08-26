import HotPostList from './post/HotPostList';
import './Mypage.css';
import React, { useState, useEffect, useContext } from 'react';
//회원정보를 싱글톤으로 사용
import memberInfo from '../MemberInfo';
import Login from './Login';
import MyProfile from './MyProfile'
import { useNavigate } from 'react-router-dom';

const Mypage = ({ generation }) => {
    //info
    const [info, setInfo] = useState(memberInfo.getMemberInfo()); 
    //로그인 상태를 넣어서 로그인창을 보여줄지 정보를 보여줄지를 결정함
    const [login, setlogin] = useState(info.login);

    const navigate = useNavigate();

    useEffect(() => {
        // Subscribe to memberInfo updates
        const handleInfoUpdate = (updatedInfo) => {
            setInfo(updatedInfo);
        };

        memberInfo.subscribe(handleInfoUpdate);

        // Cleanup subscription on component unmount
        return () => {
            memberInfo.unsubscribe(handleInfoUpdate);
        };
    }, []);

    //회원정보 업데이트가 필요할 때 사용
    const updateInfo = () => {
        memberInfo.updateMemberInfo({ 
            //여기에 바뀌어야하는 값을 넣는다//회원정보 수정, 공유할 때 등,...
            login: false });
        setlogin(false);
        localStorage.setItem('accessToken', "");
        localStorage.setItem('refresh', "");
        
    };

    const onClickMyProfile = () => {
            navigate('/myprofile');
    };


    return (
        <div className={'main' + generation + 'memberbox'}>
            <div className={'main' + generation + 'memberinbox'}>
                {login ?
                //info.변수로 사용
                    (<div><div className={'main' + generation + 'membertitle'}><span>{info.admin ? "[ADMIN]" : ""}{info.name}</span>
                        <span className={'main' + generation + 'membertitlegeneration'}>[{info.generation}]</span></div>
                        <div className={'main' + generation + 'memberpoint'}>투표권 {info.balancegameticket}장</div>
                        {info.admin ? <div className={'main' + generation + 'memberpoint'}><button  className={'hotpostlist' + generation + 'title'} onClick={() => navigate('/main_' + generation +'/balance/write')}>투표글 등록</button></div> : <></>}
                        <div className='direction-row'><button className={'main' + generation + 'memberbutton'}onClick={() => navigate('/main_1020/myprofile')}>[마이페이지]</button>
                            <button className={'main' + generation + 'memberbutton'} onClick={updateInfo}>[로그아웃]</button></div></div>)
                    : <Login issmall={true} successhandler={() => setlogin(true)} generation={generation}/>}

                <HotPostList generation={generation} />
            </div>
        </div>
    );
};

export default Mypage;
