import './Main_8090.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Footer_8090 from './Footer_8090';
import Mypage from '../Mypage';
import Bgmbar from '../Bgmbar';
import TopBanner from '../TopBanner';
import Postboard from '../post/Postboard';
import Photoboard from '../photo/Photoboard';
import Balancegameborad from '../balancegame/Balancegameborad';
import Loading from '../Loading';

const Main_8090 = () => {
    const navigate = useNavigate();
    const generation = "8090";
    const [currentindex, setcurrentindex] = useState(0);
    const[isloading, setisloading] = useState(true);
    const [randomMessage, setRandomMessage] = useState('');

    const location = useLocation();
    const messages = {
    0 : [
                'MS-DOS, 명령어의 시대',
                '2400bps 모뎀, 인터넷의 첫걸음',
                'IBM PC 호환기가 대세였던 시절',
                '마우스? 그게 뭐야? 키보드로 충분했지',
                '그대형 CRT 모니터와 함께했던 컴퓨터 책상',
                '한글 입력이 쉽지 않았던 시절',
                'PC에 사운드 카드를 처음 달아봤을 때의 충격',
                '배경 화면 없이 검정 바탕에 하얀 글씨',
                'MS-DOS 게임을 하기 위해 기억나는 디스크 스왑',
                '디스크 복사 방지를 뚫으려는 친구들의 노력',
                '카세트와 앨범으로 음악을 수집하던 시절',
                '아날로그 TV에서의 색상 조정과 그에 대한 경험',
                '80년대 초반의 패션과 그에 따른 독특한 스타일',
                '가정용 비디오 카메라의 첫 출시와 그로 인한 흥미',
                '디지털 시계와 그에 대한 친구들의 호기심'
         ],
    1 : [
                'MS-DOS, 명령어의 시대',
                '2400bps 모뎀, 인터넷의 첫걸음',
                'IBM PC 호환기가 대세였던 시절',
                '마우스? 그게 뭐야? 키보드로 충분했지',
                '그대형 CRT 모니터와 함께했던 컴퓨터 책상',
                '한글 입력이 쉽지 않았던 시절',
                'PC에 사운드 카드를 처음 달아봤을 때의 충격',
                '배경 화면 없이 검정 바탕에 하얀 글씨',
                'MS-DOS 게임을 하기 위해 기억나는 디스크 스왑',
                '디스크 복사 방지를 뚫으려는 친구들의 노력',
                '카세트와 앨범으로 음악을 수집하던 시절',
                '아날로그 TV에서의 색상 조정과 그에 대한 경험',
                '80년대 초반의 패션과 그에 따른 독특한 스타일',
                '가정용 비디오 카메라의 첫 출시와 그로 인한 흥미',
                '디지털 시계와 그에 대한 친구들의 호기심'
         ],
    2 : [
                'MS-DOS, 명령어의 시대',
                '2400bps 모뎀, 인터넷의 첫걸음',
                'IBM PC 호환기가 대세였던 시절',
                '마우스? 그게 뭐야? 키보드로 충분했지',
                '그대형 CRT 모니터와 함께했던 컴퓨터 책상',
                '한글 입력이 쉽지 않았던 시절',
                'PC에 사운드 카드를 처음 달아봤을 때의 충격',
                '배경 화면 없이 검정 바탕에 하얀 글씨',
                'MS-DOS 게임을 하기 위해 기억나는 디스크 스왑',
                '디스크 복사 방지를 뚫으려는 친구들의 노력',
                '카세트와 앨범으로 음악을 수집하던 시절',
                '아날로그 TV에서의 색상 조정과 그에 대한 경험',
                '80년대 초반의 패션과 그에 따른 독특한 스타일',
                '가정용 비디오 카메라의 첫 출시와 그로 인한 흥미',
                '디지털 시계와 그에 대한 친구들의 호기심'
         ]
    };


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
            "title": "일반 게시판"
        },
        {
            "title": "사진첩"
        },
        {
            "title": "금주 투표"
        }
    ];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * messages[currentindex].length);
        setRandomMessage(messages[currentindex][randomIndex]);
    }, [currentindex]);

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
     !isloading ?
        <div className='main8090outwindow main8090defaultwindow'>
            <div className='main8090windowtopbarbackground'><button onClick={() => {
                        navigate('/main_1020');
                    }}>ModuON</button>
                <span className='main8090windowtopbarbuttonarea'>
                    <span className='main8090windowtopbarbutton main8090defaultwindow'>_</span>
                    <span className='main8090windowtopbarbutton main8090defaultwindow'>□</span>
                    <span className='main8090windowtopbarbutton main8090defaultwindow'>X</span>
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
            </div>

            <div className='main8090topbanner'> {randomMessage}

            </div>
            <div className='main8090windowcontentoutbox'>
                <div className='main8090margin'></div>
                <div className='main8090windowcontentbox'>
                    <div className='main8090windowcontentboxline'>
                        {categorys.map((x, index) => {
                            return <button key={index} className={currentindex === index ? 'main8090selectmenubutton' : 'main8090menubutton'} onClick={() => handleMenuClick(index)}>{"\u00a0\u00a0\u00a0\u00a0" + x.title}</button>;
                        })}
                    </div>
                    <div className='main8090windowcontentinbox'>
                        <Routes>
                            <Route path="post/*" element={<Postboard generation={"8090"} />} />
                            <Route path="photo/*" element={<Photoboard generation={"8090"} />} />
                            <Route path="balance/*" element={<Balancegameborad generation={"8090"} />} />
                        </Routes>
                    </div>
                </div>
                <div className='main8090memberbox'>
                    <Bgmbar generation={"8090"} />
                    <Mypage generation={"8090"} />
                </div>
            </div>

            <div className='main8090windowbottombarbackground'>{"* Tip) 매일 출석해서 투표권을 얻어보세요! *"}</div>
            <Footer_8090></Footer_8090>
        </div> : <div className='main8090outwindow main8090defaultwindow'><Loading generation={generation}/> </div>
    );
};

export default Main_8090;
