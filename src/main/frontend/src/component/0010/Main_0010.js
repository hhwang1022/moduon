import './Main_0010.css';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Menubar_0010 from './Menubar_0010';
import Mypage from '../Mypage';
import Bgmbar from '../Bgmbar';
import Postboard from '../post/Postboard';
import Photoboard from '../photo/Photoboard';
import Balancegameborad from '../balancegame/Balancegameborad';

const Main_0010 = () => {
  const navigate = useNavigate();
  const [currentindex, setcurrentindex] = useState(0);

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
        navigate('/main_0010/balance');
        break;
      default:
        navigate('/main_0010/balance');
    }
  };

  return (
    <div className='main0010background'>
      <div className='main0010outbox'>
        <div className='main0010category'>MODUON</div>
        <div className='main1020categorybuttonarea'>
          <button className='main1020categorybutton main0010category'
            onClick={() => navigate('/main_8090/balance')}>
            8090
          </button>
          <button className='main1020categorybutton main0010category'
            onClick={() => navigate('/main_9000/balance')}>
            9000
          </button>
          <button className='main1020categorybutton main0010category'
            onClick={() => navigate('/main_0010/balance')}>
            0010
          </button>
          <button className='main1020categorybutton main0010category'
            onClick={() => navigate('/main_1020')}>
            1020
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
    </div>
  );
};

export default Main_0010;
