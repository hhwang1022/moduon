import Footer_1020 from './Footer_1020';
import './Main_1020.css';
import Main_1020_Game from './Main_1020_Game';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from "react-router-dom";
import Header_1020 from './Header_1020';
import Mypage from '../Mypage';
import Join from '../Join';
import Login from '../Login';
import Postboard from '../post/Postboard';
import Photoboard from '../photo/Photoboard';
import Balancegameborad from '../balancegame/Balancegameborad';
import Currentvote_board from '../currentvote/Currentvote_board';
import axios from 'axios';


const Main_1020 = () => {

    const [currentgameindex, setcurrentgameindex] = useState(1);
    const [leftindex, setleftindex] = useState(0);
    const [rightindex, setrightindex] = useState(2);

    const [motionposition, setmotionposition] = useState(100);
    const [motionmiddlescale, setmotionmiddlescale] = useState(1);
    const [motionleftscale, setmotionleftscale] = useState(0.5);
    const [motionrightscale, setmotionrightscale] = useState(0.5);

    const [currentindex, setcurrentindex] = useState(4);
    const [titleindex, settitleindex] = useState(4);

    const [generation, setGeneration] = useState("1020");
    const [balancedatas, setbalancedatas] = useState([]);

    let accessToken = window.localStorage.getItem('accessToken');


    useEffect(() => {
        setTimeout(function () {
            setmotionposition(0);
            setmotionleftscale(0.5);
            setmotionmiddlescale(1);
            setmotionrightscale(0.5);
        }, 100);
    }, [motionposition]);

    useEffect(() => {
        const fetchbalancedatas = async () => {
          try {

             const response = await axios.get(
              'http://127.0.0.1:8080/balancegames?' +
              'page=' + 1 + '&size=' + 10, {
                headers: { Authorization: `Bearer ${accessToken}` }
              });

            const data = response.data.data;
            setbalancedatas(data);

          } catch (error) {
            console.error("Error fetching balancedatas: ", error);
            setbalancedatas([]);
          }
        };

        fetchbalancedatas();
      }, [accessToken]);

    const Page = () => {
        if (currentindex === 0) {
            return (
                <Balancegameborad generation={"1020"} />
            );
        }
        else if (currentindex === 1) {
            return (
                <Photoboard generation={"1020"} />
            );
        }
        else if (currentindex === 2) {
            return (
                <Postboard generation={"1020"} />
            );
        }
        else if(currentindex === 3){
            return (
                <Join successhandler={setcurrentindex}/>
            );
        }
        else if(currentindex === 5){
            return (
                <Login successhandler={setcurrentindex}/>
            );
        }
        else {
            console.log("balancedatas : " + balancedatas);
        if(balancedatas.length > 0 ){
        return (
                        <div>
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1, x: motionposition, ease: "easeInOut" }}>
                                <div className='main1020'>
                                    <motion.span width={0} className='middlegame' initial={{ opacity: 0 }} animate={{ opacity: 1, ease: "easeInOut", scale: motionmiddlescale }}>
                                        <Main_1020_Game position={"middlegame"}
                                            balancedata={balancedatas[currentgameindex]}>
                                        </Main_1020_Game>
                                    </motion.span>
                                    <motion.span className='leftgame' initial={{ opacity: 0 }} animate={{ opacity: 1, ease: "easeInOut", scale: motionleftscale }}>
                                        <Main_1020_Game
                                            balancedata={balancedatas[leftindex]}
                                            onClickEvent={() => {
                                                if (leftindex <= 0) {
                                                    setleftindex(balancedatas.length - 1);
                                                }
                                                else {
                                                    setleftindex(leftindex - 1);
                                                }

                                                if (rightindex <= 0) {
                                                    setrightindex(balancedatas.length - 1);
                                                }
                                                else {
                                                    setrightindex(rightindex - 1);
                                                }

                                                if (currentgameindex <= 0) {
                                                    setcurrentgameindex(balancedatas.length - 1);
                                                }
                                                else {
                                                    setcurrentgameindex(currentgameindex - 1);
                                                }

                                                setmotionleftscale(0.7);
                                                setmotionmiddlescale(0.8);
                                                setmotionrightscale(0.7);
                                                setmotionposition(-100);
                                            }}
                                        >
                                        </Main_1020_Game>
                                    </motion.span>
                                    <motion.span className='rightgame' width={0} initial={{ opacity: 0 }} animate={{ opacity: 1, ease: "easeInOut", scale: motionrightscale }}>
                                        <Main_1020_Game
                                            balancedata={balancedatas[rightindex]}
                                            onClickEvent={() => {
                                                if (leftindex >= balancedatas.length - 1) {
                                                    setleftindex(0);
                                                }
                                                else {
                                                    setleftindex(leftindex + 1);
                                                }

                                                if (rightindex >= balancedatas.length - 1) {
                                                    setrightindex(0);
                                                }
                                                else {
                                                    setrightindex(rightindex + 1);
                                                }

                                                if (currentgameindex >= balancedatas.length - 1) {
                                                    setcurrentgameindex(0);
                                                }
                                                else {
                                                    setcurrentgameindex(currentgameindex + 1);
                                                }

                                                setmotionleftscale(0.7);
                                                setmotionmiddlescale(0.8);
                                                setmotionrightscale(0.7);
                                                setmotionposition(-100);
                                            }}
                                        >
                                        </Main_1020_Game>
                                    </motion.span>
                                </div>
                            </motion.span>
                            <div>
                                <div className="header">
                                    <div className="left">
                                        <img className="padding" src="https://cdn-icons-png.flaticon.com/512/25/25424.png" width={30} height={30} />
                                        <img className="padding" src="https://cdn-icons-png.flaticon.com/512/109/109594.png" width={30} height={30} />
                                        <img className="padding" src="https://cdn-icons-png.flaticon.com/512/13/13267.png" width={30} height={30} />
                                    </div>
                                    <div className='middle'>
                                        <div className='balencegame_scroll_btncontent'>
                                            {balancedatas.map((x, index) => {
                                                if (index !== currentgameindex) {
                                                    return <div className="balencegame_scroll_btn_unactive"></div>
                                                }
                                                else {
                                                    return <div className="balencegame_scroll_btn_active"></div>
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
        }
        else{
        return <div/>
        }

        }
    };

//    let balancedatas = [
//        {
//            title1: "고양이",
//            img1: "https://modooon.s3.ap-northeast-2.amazonaws.com/imageserver/86a38d41-d521-4225-97bf-a3a25258ee50KakaoTalk_20240616_222752602_02.png",
//            title2: "강아지",
//            img2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxxNnf17cG-3BXPCxIUSrh9n0rUAF29gVV0ZkOlmePnl5zteaLIPwS_4eeU5km2egE_h4&usqp=CAU",
//            category: "7080"
//        },
//        {
//            title1: "햄스터",
//            img1: "https://image.dongascience.com/Photo/2019/12/fb4f7da04758d289a466f81478f5f488.jpg",
//            title2: "친칠라",
//            img2: "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/4arX/image/3GMv_E7XKKy5km4x78r8AkgJZ3w.jpg",
//            category: "8090"
//        },
//        {
//            title1: "앵무새",
//            img1: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ara_ararauna_Luc_Viatour.jpg/300px-Ara_ararauna_Luc_Viatour.jpg",
//            title2: "까마귀",
//            img2: "https://www.sputnik.kr/article_img/202405/article_1716688674.jpg",
//            category: "9000"
//        },
//        {
//            title1: "랫서팬더",
//            img1: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Ailurus_fulgens_RoterPanda_LesserPanda.jpg/300px-Ailurus_fulgens_RoterPanda_LesserPanda.jpg",
//            title2: "팬더",
//            img2: "https://monthly.chosun.com/reporter/upload/lob050913_1-1.jpg",
//            category: "0010"
//        }
//    ]

    return (<div>
        <Header_1020 setcurrentindex={setcurrentindex} titleindex={titleindex}></Header_1020>
        <div className={'main1020' + (currentindex === 1 ? " main1020photo" : "")}>
            <Page />
           {currentindex !== 4 ? <Mypage generation={"1020"}></Mypage> : <></> }
        </div>
    </div>);
};

export default Main_1020;