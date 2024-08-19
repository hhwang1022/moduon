import './Main_8090.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route,  useNavigate, useParams } from "react-router-dom";
import Postlist from '../post/Postlist';
import Footer_8090 from './Footer_8090';
import Mypage from '../Mypage';
import Bgmbar from '../Bgmbar';
import TopBanner from '../TopBanner';


const Main_8090 = () => {

    const [currentindex, setcurrentindex] = useState(0);


    let categorys = [
        {
            "title": "일반 게시판"
        },
        {
            "title": "사진첩"
        },
        {
            "title": "금주 투표"
        }
    ];

    const navigate = useNavigate();

    const Page = () => {
        if(currentindex === 0){
            return (
                <Postlist generation={"8090"} />
            );
        }
        else if(currentindex === 1){
            return (
                <Postlist generation={"8090"} />
            );
        }
        else{
            return (
                <Postlist generation={"8090"} />
            );
        }
      };

    return (
        <div className='main8090outwindow main8090dafaultwindow'>
            <div className='main8090windowtopbarbackground'>MODOO-ON
                <span className='main8090windowtopbarbuttonarea'>
                    <span className='main8090windowtopbarbutton main8090dafaultwindow'>_</span>
                    <span className='main8090windowtopbarbutton main8090dafaultwindow'>□</span>
                    <span className='main8090windowtopbarbutton main8090dafaultwindow'>X</span>
                </span>
            </div>
            <div className='main8090categorybar'>
                <button className='main8090categorybutton pressed'
                    onClick={() => {
                        navigate('/main_8090');
                    }}>80-90</button>
                <button className='main8090categorybutton'
                    onClick={() => {
                        navigate('/main_9000');
                    }}>90-00</button>
                <button className='main8090categorybutton'
                    onClick={() => {
                        navigate('/main_0010');
                    }}>00-10</button>
                <button className='main8090categorybutton'
                    onClick={() => {
                        navigate('/main_1020');
                    }}>10-20</button>
            </div>

            <div className='main8090topbanner'> 80년대로 여러분들을 초대합니다.
                <TopBanner generation={"8090"}/>
            </div>
            <div className='main8090windowcontentoutbox'>
                <div className='main8090margin'></div>
                <div className='main8090windowcontentbox'>
                    <div className='main8090windowcontentboxline'></div>
                    <div className='main8090windowcontentinbox'>
                        <Page/>
                    {/* <Postlist generation={"8090"}/> */}
                    </div>
                    <div className='main8090windowcontentboxline'/></div>
                <div className='main8090memberbox'>
                    <Bgmbar generation={"8090"}/>
                    <Mypage generation={"8090"}/>
                </div>
                <div className='main8090margin'></div>
            </div>

            <div className='main8090windowbottombarbackground'>{"* Tip) 매일 출석해서 투표권을 얻어보세요! *"}</div>
            <Footer_8090></Footer_8090>
        </div>
    );
};

export default Main_8090;
