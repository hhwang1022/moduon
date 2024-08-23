import './Main_8090.css';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer_8090 from './Footer_8090';
import Mypage from '../Mypage';
import Bgmbar from '../Bgmbar';
import TopBanner from '../TopBanner';
import Postboard from '../post/Postboard';
import Photoboard from '../photo/Photoboard';
import Balancegameborad from '../balancegame/Balancegameborad';

const Main_8090 = () => {
    const navigate = useNavigate();
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

    const handleMenuClick = (index) => {
        setcurrentindex(index);
        switch (index) {
            case 0:
                navigate('/main_8090/post');
                break;
            case 1:
                navigate('/main_8090/photo');
                break;
            case 2:
                navigate('/main_8090/balance/view');
                break;
            default:
                navigate('/main_8090/balance/view');
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
                        navigate('/main_8090/balance/view');
                    }}>80-90</button>
                <button className='main8090categorybutton'
                    onClick={() => {
                        navigate('/main_9000/balance/view');
                    }}>90-00</button>
                <button className='main8090categorybutton'
                    onClick={() => {
                        navigate('/main_0010/balance/view');
                    }}>00-10</button>
                <button className='main8090categorybutton'
                    onClick={() => {
                        navigate('/main_1020');
                    }}>10-20</button>
            </div>

            <div className='main8090topbanner'> 80년대로 여러분들을 초대합니다.
                <TopBanner generation={"8090"} />
            </div>
            <div className='main8090windowcontentoutbox'>
                <div className='main8090margin'></div>
                <div className='main8090windowcontentbox'>
                    <div className='main8090windowcontentboxline'>
                        {categorys.map((x, index) => {
                            return <button onClick={() => handleMenuClick(index)}>{"\u00a0\u00a0\u00a0\u00a0" + x.title}</button>;
                        })}
                    </div>
                    <div className='main8090windowcontentinbox'>
                        <Routes>
                            <Route path="post/*" element={<Postboard generation={"8090"} />} />
                            <Route path="photo/*" element={<Photoboard generation={"8090"} />} />
                            <Route path="balance/*" element={<Balancegameborad generation={"8090"} />} />
                        </Routes>
                    </div>
                    <div className='main8090windowcontentboxline' /></div>
                <div className='main8090memberbox'>
                    <Bgmbar generation={"8090"} />
                    <Mypage generation={"8090"} />
                </div>
            </div>

            <div className='main8090windowbottombarbackground'>{"* Tip) 매일 출석해서 투표권을 얻어보세요! *"}</div>
            <Footer_8090></Footer_8090>
        </div>
    );
};

export default Main_8090;
