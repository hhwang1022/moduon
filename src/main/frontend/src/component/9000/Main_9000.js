import './Main_9000.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer_9000 from './Footer_9000';

import Bgmbar from '../Bgmbar';
import Mypage from '../Mypage';
import Currentvote_board from '../currentvote/Currentvote_board';
import Postboard from '../post/Postboard';
import Photoboard from '../photo/Photoboard';
import Balancegameborad from '../balancegame/Balancegameborad';


const Main_9000 = () => {

    const navigate = useNavigate();

    const postsmallicon = require('../../resource/9000_postsmallicon.png');
    const photosmallicon = require('../../resource/9000_photosmallicon.png');
    const balencesmallicon = require('../../resource/9000balencesmallicon.png');
    const postbigicon = require('../../resource/9000_postbigicon.png');
    const photobigicon = require('../../resource/9000_photobigicon.png');
    const balencebigicon = require('../../resource/9000balencebigicon.png');

    const [currentindex, setcurrentindex] = useState(3);

    let categorys = [
        {
            "smallsrc": postsmallicon,
            "bigsrc": postbigicon,
            "title": "게시판"
        },
        {
            "smallsrc": photosmallicon,
            "bigsrc": photobigicon,
            "title": "사진첩"
        },
        {
            "smallsrc": balencesmallicon,
            "bigsrc": balencebigicon,
            "title": "투표"
        }
    ];

    const Page = () => {
        if (currentindex === 0) {
            return (
                <Postboard generation={"9000"} />
            );
        }
        else if (currentindex === 1) {
            return (
                <Photoboard generation={"9000"} />
            );
        }
        else if (currentindex === 2) {
            return (
                <Balancegameborad generation={"9000"} />
            );
        }
        else {
            return(
                categorys.map((x, index) => {
                    return <span><button
                    onClick={() => {
                        handleMenuClick(index);
                    }}
                    ><img src={x.bigsrc}/></button><span>{x.title}</span></span> ;
                 })
            );     
        }
    };

    const handleMenuClick = (index) => {
        setcurrentindex(index);
        switch (index) {
            case 0:
                navigate('/main_9000/post');
                break;
            case 1:
                navigate('/main_9000/photo');
                break;
            case 2:
                navigate('/main_9000/balance/view');
                break;
            default:
                navigate('/main_9000/balance/view');
        }
    };

    return (<div className='main9000background'>
        <div className='main9000lefticon'>
            <button
            onClick={() => {
                handleMenuClick(0);
            }}><img src={require("../../resource/9000_icon1.png")}/></button>
            내 컴퓨터
            <button
            onClick={() => {
                handleMenuClick(1);
            }}><img src={require("../../resource/9000_icon2.png")}/></button>
            네트워크 환경
            <button
            onClick={() => {
                handleMenuClick(2);
            }}><img src={require("../../resource/9000_icon3.png")}/></button>
            인터넷
            <button><img src={require("../../resource/9000_icon4.png")}/></button>
            휴지통
            <button><img src={require("../../resource/9000_icon5.png")}/></button>
            받은 편지함
        </div>
        <div className='main9000righticon'>
            <img src={require("../../resource/9000_icon6.png")}></img>
            The <br />
            Microsoft<br />
            Network
        </div>
        <div className='main9000outwindow main9000dafaultwindow'>
            <div className='main9000windowtopbarbackground'>MODOO-ON
                <span className='main9000windowtopbarbuttonarea'>
                    <span className='main9000windowtopbarbutton main9000dafaultwindow'>_</span>
                    <span className='main9000windowtopbarbutton main9000dafaultwindow'>□</span>
                    <span className='main9000windowtopbarbutton main9000dafaultwindow'>X</span>
                </span>
            </div>
            <div className='main9000categorybar'>
                <button className='main9000categorybutton'
                    onClick={() => {
                        navigate('/main_8090/balance/view');
                    }}>80-90</button>
                <button className='main9000categorybutton'
                    onClick={() => {
                        navigate('/main_9000/balance/view');
                    }}>90-00</button>
                <button className='main9000categorybutton'
                    onClick={() => {
                        navigate('/main_0010/balance/view');
                    }}>00-10</button>
                <button className='main9000categorybutton'
                    onClick={() => {
                        navigate('/main_1020');
                    }}>10-20</button>
            </div>
            <div>
                <div className='main9000windowcontentbox'>
                    <Bgmbar generation={"9000"} />
                    {currentindex !== 3 ?
                        <div className='main9000cstegorytab'><img src={categorys[currentindex].smallsrc} width={76} height={71} />{categorys[currentindex].title}</div>
                        : <></>
                    }
                    <div className='main9000contentbox'>
                    <Routes>
                            <Route path="post/*" element={<Postboard generation={"9000"} />} />
                            <Route path="photo/*" element={<Photoboard generation={"9000"} />} />
                            <Route path="balance/*" element={<Balancegameborad generation={"9000"} />} />
                        </Routes>
                    </div>
                    <Mypage generation={"9000"} />
                </div>
            </div>
            <div className='main9000windowbottombarbackground'>PC통신에서 나눴던 첫 인터넷 채팅</div>
        </div>
        <Footer_9000></Footer_9000>
    </div>);
};

export default Main_9000;
