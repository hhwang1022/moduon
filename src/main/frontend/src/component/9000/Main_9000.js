import './Main_9000.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Footer_9000 from './Footer_9000';

import Bgmbar from '../Bgmbar';
import Mypage from '../Mypage';
import Postlist from '../post/Postlist';
import Photolist from '../photo/Photolist';
import Balancegamelist from '../balancegame/Balancegamelist';
import Currentvote_board from '../currentvote/Currentvote_board';
import Postboard from '../post/Postboard';


const Main_9000 = () => {

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

    const navigate = useNavigate();

    const Page = () => {
        if (currentindex === 0) {
            return (
                <Postboard generation={"9000"} />
            );
        }
        else if (currentindex === 1) {
            return (
                <Photolist generation={"9000"} />
            );
        }
        else if (currentindex === 2) {
            return (
                <Currentvote_board generation={"9000"} />
            );
        }
        else {
            return(
                categorys.map((x, index) => {
                    return <span><button
                    onClick={() => {
                        setcurrentindex(index);
                    }}
                    ><img src={x.bigsrc}/></button><span>{x.title}</span></span> ;
                 })
            );     
        }
    };

    let balancedatas = [
        {
            title1: "고양이",
            img1: "https://i.pinimg.com/236x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg",
            title2: "강아지",
            img2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxxNnf17cG-3BXPCxIUSrh9n0rUAF29gVV0ZkOlmePnl5zteaLIPwS_4eeU5km2egE_h4&usqp=CAU",
            category: "7080"
        },
        {
            title1: "햄스터",
            img1: "https://image.dongascience.com/Photo/2019/12/fb4f7da04758d289a466f81478f5f488.jpg",
            title2: "친칠라",
            img2: "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/4arX/image/3GMv_E7XKKy5km4x78r8AkgJZ3w.jpg",
            category: "8090"
        },
        {
            title1: "앵무새",
            img1: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ara_ararauna_Luc_Viatour.jpg/300px-Ara_ararauna_Luc_Viatour.jpg",
            title2: "까마귀",
            img2: "https://www.sputnik.kr/article_img/202405/article_1716688674.jpg",
            category: "9000"
        },
        {
            title1: "랫서팬더",
            img1: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Ailurus_fulgens_RoterPanda_LesserPanda.jpg/300px-Ailurus_fulgens_RoterPanda_LesserPanda.jpg",
            title2: "팬더",
            img2: "https://monthly.chosun.com/reporter/upload/lob050913_1-1.jpg",
            category: "0010"
        }
    ]

    return (<div className='main9000background'>
        <div className='main9000lefticon'>
            <button
            onClick={() => {
                setcurrentindex(0);
            }}><img src={require("../../resource/9000_icon1.png")}/></button>
            내 컴퓨터
            <button
            onClick={() => {
                setcurrentindex(1);
            }}><img src={require("../../resource/9000_icon2.png")}/></button>
            네트워크 환경
            <button
            onClick={() => {
                setcurrentindex(2);
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
                        navigate('/main_8090');
                    }}>80-90</button>
                <button className='main9000categorybutton'
                    onClick={() => {
                        navigate('/main_9000');
                    }}>90-00</button>
                <button className='main9000categorybutton'
                    onClick={() => {
                        navigate('/main_0010');
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
                        <Page />
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
