import './Main_1020.css';
import Main_1020_Game from './Main_1020_Game';
import React, { useState } from 'react';
import { motion } from 'framer-motion';


const Main_balancegame = ({balancedatas}) => {

    const [currentgameindex, setcurrentgameindex] = useState(1);
    const [leftindex, setleftindex] = useState(0);
    const [rightindex, setrightindex] = useState(2);
    const [rotation, setRotation] = useState(0);

    const [motionposition, setmotionposition] = useState(0);
    const [motionpositionleft, setmotionpositionLeft] = useState(0);
    const [motionpositionright, setmotionpositionRight] = useState(0);
    const [motionmiddlescale, setmotionmiddlescale] = useState(0.9);
    const [motionleftscale, setmotionleftscale] = useState(0.5);
    const [motionrightscale, setmotionrightscale] = useState(0.5);

    const handleRightClick = () => {
        // setRotation을 콜백 함수로 사용하여 최신 상태 값을 가져옴
        setRotation((prevRotation) => {
            const newRotation = prevRotation % 3 - 1;

            if (newRotation === -3) {
                setcurrentgameindex(1);
                setleftindex(0);
                setrightindex(2);
            } else if (newRotation === -2) {
                setcurrentgameindex(0);
                setleftindex(2);
                setrightindex(1);
            } else if (newRotation === -1) {
                setcurrentgameindex(2);
                setleftindex(1);
                setrightindex(0);
            } 

            // 애니메이션 설정
            setmotionposition(-100);
            setmotionmiddlescale(0.9);
            setmotionpositionRight(-50);
            setmotionrightscale(0.5);
            setmotionpositionLeft(-50);
            setmotionleftscale(0.5);

            setTimeout(() => {
                setmotionposition(0);
                setmotionmiddlescale(0.9);
                setmotionpositionRight(0);
                setmotionrightscale(0.5);
                setmotionpositionLeft(0);
                setmotionleftscale(0.5);
            }, 50);

            return newRotation; // 새로운 rotation 값을 반환
        });
    };

    const handleLeftClick = () => {
        // setRotation을 콜백 함수로 사용하여 최신 상태 값을 가져옴
        setRotation((prevRotation) => {
            const newRotation = prevRotation % 3 - 1;
          
            if (newRotation === -3) {
                setcurrentgameindex(1);
                setleftindex(0);
                setrightindex(2);
            } else if (newRotation === -2) {
                setcurrentgameindex(2);
                setleftindex(1);
                setrightindex(0);
            } else if (newRotation === -1) {
                setcurrentgameindex(0);
                setleftindex(2);
                setrightindex(1);
            } 

            // 애니메이션 설정
            setmotionposition(100);
            setmotionmiddlescale(0.9);
            setmotionpositionRight(50);
            setmotionrightscale(0.5);
            setmotionpositionLeft(50);
            setmotionleftscale(0.5);

            setTimeout(() => {
                setmotionposition(0);
                setmotionmiddlescale(0.9);
                setmotionpositionRight(0);
                setmotionrightscale(0.5);
                setmotionpositionLeft(0);
                setmotionleftscale(0.5);
            }, 100);

            return newRotation; // 새로운 rotation 값을 반환
        });
    };

    return ( ((balancedatas.data !== undefined && balancedatas.data.length > 0) ?
        <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, ease: "easeInOut" }}>
            <div className='main1020'>
                <motion.div width={0} className='middlegame' initial={{ opacity: 0 }} animate={{ opacity: 1, ease: "easeInOut", scale: motionmiddlescale, x: motionposition}}>
                    <Main_1020_Game position={"middlegame"}
                        balancedata={balancedatas.data[currentgameindex]}>
                    </Main_1020_Game>
                </motion.div>
                <motion.div className='leftgame' initial={{ opacity: 0 }} animate={{ opacity: 1, ease: "easeInOut", scale: motionleftscale, x: motionpositionleft }}>
                    <Main_1020_Game
                        balancedata={balancedatas.data[leftindex]}
                        onClickEvent={handleLeftClick}
                    >
                    </Main_1020_Game>
                </motion.div>
                <motion.div className='rightgame' width={0} initial={{ opacity: 0 }} animate={{ opacity: 1, ease: "easeInOut", scale: motionrightscale, x: motionpositionright }}>
                    <Main_1020_Game
                        balancedata={balancedatas.data[rightindex]}
                        onClickEvent={handleRightClick}
                    >
                    </Main_1020_Game>
                </motion.div>
            </div>
        </motion.div>
        <div>
            <div className="header">
                <div className="left">
                    <img className="padding" src="https://cdn-icons-png.flaticon.com/512/25/25424.png" width={30} height={30} />
                    <img className="padding" src="https://cdn-icons-png.flaticon.com/512/109/109594.png" width={30} height={30} />
                    <img className="padding" src="https://cdn-icons-png.flaticon.com/512/13/13267.png" width={30} height={30} />
                </div>
                <div className='middle'>
                    <div className='balencegame_scroll_btncontent'>
                        {balancedatas.data.map((x, index) => {
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
    </div> :<></> ) 
);
};

export default Main_balancegame;
