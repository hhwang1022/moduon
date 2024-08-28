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
    const [randomMessage, setRandomMessage] = useState('');

    const messages = {
    0: [
            '삐삐의 숫자 암호로 전하던 마음',
            '인터넷 초창기 시절, 그리운 대화방',
            '디지털 시대의 첫 발걸음, 채팅의 추억',
            '온라인에서 시작된 우리의 첫 대화',
            '그때 그 시절, PC통신에서 나눈 대화',
            '비디오 가게에서 빌리던 최신 영화들',
            '하드디스크 용량이 1GB를 넘으면 미래를 느끼던 시절',
            'X세대로 불리며 새로운 문화의 주인공이었던 그때',
            '천리안과 하이텔의 초기 인터넷 탐험',
            '컴퓨터 학원에서 배우던 처음의 윈도우 95',
            '라디오 DJ에게 사연을 보내던 순수한 추억',
            '플로피 디스크에 저장하던 중요한 파일들',
            '컴퓨터 전원이 꺼질 때마다 느꼈던 아찔한 순간들',
            '오락실 대신 집에서 플레이하던 네오지오 게임들',
            '3.5인치 플로피 디스크에 들어가는 용량이 겨우 1.44MB였던 사실'
       ],
    1: [
            '삐삐의 숫자 암호로 전하던 마음',
            '인터넷 초창기 시절, 그리운 대화방',
            '디지털 시대의 첫 발걸음, 채팅의 추억',
            '온라인에서 시작된 우리의 첫 대화',
            '그때 그 시절, PC통신에서 나눈 대화',
            '비디오 가게에서 빌리던 최신 영화들',
            '하드디스크 용량이 1GB를 넘으면 미래를 느끼던 시절',
            'X세대로 불리며 새로운 문화의 주인공이었던 그때',
            '천리안과 하이텔의 초기 인터넷 탐험',
            '컴퓨터 학원에서 배우던 처음의 윈도우 95',
            '라디오 DJ에게 사연을 보내던 순수한 추억',
            '플로피 디스크에 저장하던 중요한 파일들',
            '컴퓨터 전원이 꺼질 때마다 느꼈던 아찔한 순간들',
            '오락실 대신 집에서 플레이하던 네오지오 게임들',
            '3.5인치 플로피 디스크에 들어가는 용량이 겨우 1.44MB였던 사실'
       ],
    2: [
            '삐삐의 숫자 암호로 전하던 마음',
            '인터넷 초창기 시절, 그리운 대화방',
            '디지털 시대의 첫 발걸음, 채팅의 추억',
            '온라인에서 시작된 우리의 첫 대화',
            '그때 그 시절, PC통신에서 나눈 대화',
            '비디오 가게에서 빌리던 최신 영화들',
            '하드디스크 용량이 1GB를 넘으면 미래를 느끼던 시절',
            'X세대로 불리며 새로운 문화의 주인공이었던 그때',
            '천리안과 하이텔의 초기 인터넷 탐험',
            '컴퓨터 학원에서 배우던 처음의 윈도우 95',
            '라디오 DJ에게 사연을 보내던 순수한 추억',
            '플로피 디스크에 저장하던 중요한 파일들',
            '컴퓨터 전원이 꺼질 때마다 느꼈던 아찔한 순간들',
            '오락실 대신 집에서 플레이하던 네오지오 게임들',
            '3.5인치 플로피 디스크에 들어가는 용량이 겨우 1.44MB였던 사실'
       ]
    };

  useEffect(() => {
      if (messages[currentindex]) {
          const randomIndex = Math.floor(Math.random() * messages[currentindex].length);
          setRandomMessage(messages[currentindex][randomIndex]);
      } else {
          setRandomMessage('메시지가 없습니다.');
      }
  }, [currentindex]);

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
             
        </div>
        <div className='main9000outwindow main9000defaultwindow'>
            <div className='main9000windowtopbarbackground'><button onClick={() => {
                        navigate('/main_1020');
                    }}>ModuON</button>
                <span className='main9000windowtopbarbuttonarea'>
                    <span className='main9000windowtopbarbutton main9000defaultwindow'>_</span>
                    <span className='main9000windowtopbarbutton main9000defaultwindow'>□</span>
                    <span className='main9000windowtopbarbutton main9000defaultwindow'>X</span>
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
                <div className='main9000windowbottombarbackground'>{randomMessage}</div>
            </div>
        <div className='main9000righticon'>
            <img src={require("../../resource/9000_icon1.png")}  height={86} width={86}></img>
            <span className='main9000icontext'>휴지통</span>
        </div>
        <Footer_9000></Footer_9000>
        </div>
         : <div className='main9000background'><Loading generation={generation}/> </div>
    );
};

export default Main_9000;
