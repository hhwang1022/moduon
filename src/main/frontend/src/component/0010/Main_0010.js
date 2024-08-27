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
              <div className='main0010footer'>일촌평에 남긴 소소한 마음의 표현</div>
            </div>
          </div>
        </div>
      </div> : <div className='main0010background'><Loading generation={generation} /> </div>
  );
};

export default Main_0010;
