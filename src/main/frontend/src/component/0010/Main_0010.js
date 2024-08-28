import './Main_0010.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Menubar_0010 from './Menubar_0010';
import Mypage from '../Mypage';
import Bgmbar from '../Bgmbar';
import Postboard from '../post/Postboard';
import Photoboard from '../photo/Photoboard';
import Balancegameborad from '../balancegame/Balancegameborad';
import Loading from '../Loading';

const Main_0010 = () => {

  const navigate = useNavigate();
  const generation = "0010";
  const [currentindex, setcurrentindex] = useState(0);
  const [isloading, setisloading] = useState(true);
  const [randomMessage, setRandomMessage] = useState('');

    const messages = {
    0: [
            '일촌평에 남긴 소소한 마음의 표현',
            '브라우저의 진화, Internet Explorer',
            'UCC의 초기 단계',
            '핸드폰 벨소리 다운로드',
            '디지털 뮤직 비디오의 인기도',
            '싸이월드 미니홈피와 방명록',
            '미니홈피의 스킨 꾸미기',
            '팬픽과 온라인 커뮤니티',
            '스마트폰과 모바일 앱의 확산',
            '디지털 음악과 mp3 파일',
            '미키마우스 MP3와 아이팟과 아이튠즈',
            '휴대폰의 다양한 디자인',
            '전자사전으로 보던 인터넷소설',
            '디지몬 어드벤처의 전설적인 디지몬과의 모험',
            '엽기토끼와 졸라맨, 그 시절의 인터넷 문화와 개그'
       ],
       1: [
            '일촌평에 남긴 소소한 마음의 표현',
            '브라우저의 진화, Internet Explorer',
            'UCC의 초기 단계',
            '핸드폰 벨소리 다운로드',
            '디지털 뮤직 비디오의 인기도',
            '싸이월드 미니홈피와 방명록',
            '미니홈피의 스킨 꾸미기',
            '팬픽과 온라인 커뮤니티',
            '스마트폰과 모바일 앱의 확산',
            '디지털 음악과 mp3 파일',
            '미키마우스 MP3와 아이팟과 아이튠즈',
            '휴대폰의 다양한 디자인',
            '전자사전으로 보던 인터넷소설',
            '디지몬 어드벤처의 전설적인 디지몬과의 모험',
            '엽기토끼와 졸라맨, 그 시절의 인터넷 문화와 개그'
       ],

       2: [
            '일촌평에 남긴 소소한 마음의 표현',
             '브라우저의 진화, Internet Explorer',
             'UCC의 초기 단계',
             '핸드폰 벨소리 다운로드',
             '디지털 뮤직 비디오의 인기도',
             '싸이월드 미니홈피와 방명록',
             '미니홈피의 스킨 꾸미기',
             '팬픽과 온라인 커뮤니티',
             '스마트폰과 모바일 앱의 확산',
             '디지털 음악과 mp3 파일',
             '미키마우스 MP3와 아이팟과 아이튠즈',
             '휴대폰의 다양한 디자인',
             '전자사전으로 보던 인터넷소설',
             '디지몬 어드벤처의 전설적인 디지몬과의 모험',
             '엽기토끼와 졸라맨, 그 시절의 인터넷 문화와 개그'
             ]
  };


    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * messages[currentindex].length);
      setRandomMessage(messages[currentindex][randomIndex]);
    }, [currentindex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisloading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = (index) => {
    setcurrentindex(index);

    switch (index) {
      case 0:
        navigate('/main_0010/post');
        break;
      case 1:
        navigate('/main_0010/photo');
        break;
      case 2:
        setisloading(false);
        navigate('/main_0010/balance/view');
        break;
      default:
        navigate('/main_0010/balance/view');
    }
  };

  return (
    !isloading ?
      <div className='main0010background'>
        <div className='main0010outbox'>
          <div className='main0010category'><button onClick={() => navigate('/main_1020')}>ModuON</button></div>
          <div className='main1020categorybuttonarea'>
            <button className='main1020categorybutton main0010category'
              onClick={() => navigate('/main_8090/balance/view')}>
              8090
            </button>
            <button className='main1020categorybutton main0010category'
              onClick={() => navigate('/main_9000/balance/view')}>
              9000
            </button>
            <button className='main1020categorybutton main0010category'
              onClick={() => navigate('/main_0010/balance/view')}>
              0010
            </button>
          </div>
          <div className='main0010dotbox'>
            <Menubar_0010 onClickHandler={handleMenuClick} />
            <div className='main0010inbox'>
              <Bgmbar generation={"0010"} />
              <div className='main0010contentbox'>
                <Routes>
                  <Route path="post/*" element={<Postboard generation={"0010"} />} />
                  <Route path="photo/*" element={<Photoboard generation={"0010"} />} />
                  <Route path="balance/*" element={<Balancegameborad generation={"0010"} />} />
                </Routes>
              </div>
              <Mypage generation={"0010"} />
              <div className='main0010footer'>{randomMessage}</div>
            </div>
          </div>
        </div>
      </div> : <div className='main0010background'><Loading generation={generation} /> </div>
  );
};

export default Main_0010;
