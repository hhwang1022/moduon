import './Main_9000.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Footer_9000 from './Footer_9000';
import Bgmbar from '../Bgmbar';
import Mypage from '../Mypage';
import Postboard from '../post/Postboard';
import Photoboard from '../photo/Photoboard';
import Balancegameborad from '../balancegame/Balancegameborad';
import Loading from '../Loading';

const Main_9000 = () => {

    const navigate = useNavigate();
    const generation = "9000";
    const postbigicon = require('../../resource/9000_postbigicon.png');
    const photobigicon = require('../../resource/9000_photobigicon.png');
    const balencebigicon = require('../../resource/9000balencebigicon.png');

    const location = useLocation();

    const [currentindex, setcurrentindex] = useState(3);
    const[isloading, setisloading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setisloading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (location.pathname.indexOf('/post') > 0) {
          setcurrentindex(0);
        }
        else if(location.pathname.indexOf('/photo') > 0){
          setcurrentindex(1);
        }
        else{
          setcurrentindex(2);
        }
      }, [location.pathname]);

    let categorys = [
        {
            "bigsrc": postbigicon,
            "title": "게시판"
        },
        {
            "bigsrc": photobigicon,
            "title": "사진첩"
        },
        {
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
            setisloading(false);
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

    return (
    !isloading ?
    <div className='main9000background'>
        <div className='main9000lefticon'>
            <button
            onClick={() => {
                handleMenuClick(0);
            }}><img src={require("../../resource/9000_postbigicon.png")} className={currentindex === 0 ? 'main9000leftselecticon' : ''} height={86} width={86}/></button>
            <span className={currentindex === 0 ? 'main9000iconselecttext' : 'main9000icontext'}>일반 게시판</span>
            <button
            onClick={() => {
                handleMenuClick(1);
            }}><img src={require("../../resource/9000_photobigicon.png")} className={currentindex === 1 ? 'main9000leftselecticon' : ''} height={86} width={86}/></button>
            <span className={currentindex === 1 ? 'main9000iconselecttext' : 'main9000icontext'}>사진 게시판</span>
            <button
            onClick={() => {
                handleMenuClick(2);
            }}><img src={require("../../resource/9000balencebigicon.png")} className={currentindex === 2 ? 'main9000leftselecticon' : ''} height={86} width={86}/></button>
            <span className={currentindex === 2 ? 'main9000iconselecttext' : 'main9000icontext'}>투표</span>
             {/* <button><img src={require("../../resource/9000_icon4.png")}/></button>
            휴지통
           <button><img src={require("../../resource/9000_icon5.png")}/></button>
            받은 편지함 */}
        </div>
        <div className='main9000righticon'>
            <img src={require("../../resource/9000_icon1.png")}  height={86} width={86}></img>
            <span className='main9000icontext'>휴지통</span>
        </div>
        <div className='main9000outwindow main9000dafaultwindow'>
            <div className='main9000windowtopbarbackground'><button onClick={() => {
                        navigate('/main_1020');
                    }}>MODOO-ON</button>
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
            </div>
            <div>
                <div className='main9000windowcontentbox'>
                    <Bgmbar generation={"9000"} />
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
    </div> : <div className='main9000background'><Loading generation={generation}/> </div>
    );
};

export default Main_9000;
