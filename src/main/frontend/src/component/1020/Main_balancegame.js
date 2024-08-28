import './Main_1020.css';
import Main_1020_Game from './Main_1020_Game';
import React, { useState } from 'react';
import { motion } from 'framer-motion';


const Main_balancegame = ({balancedatas}) => {

    const [currentgameindex, setcurrentgameindex] = useState(1);
    const [leftindex, setleftindex] = useState(0);
    const [rightindex, setrightindex] = useState(2);

    const [motionposition, setmotionposition] = useState(100);
    const [motionmiddlescale, setmotionmiddlescale] = useState(0.9);
    const [motionleftscale, setmotionleftscale] = useState(0.5);
    const [motionrightscale, setmotionrightscale] = useState(0.5);

    const [datas, setdatas] = useState(balancedatas.data);

    console.log("Main_balancegame");
    console.log(balancedatas);

    return ( ((datas !== undefined && datas.length > 0) ?
        <div>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1, x: motionposition, ease: "easeInOut" }}>
            <div className='main1020'>
                <motion.span width={0} className='middlegame' initial={{ opacity: 0 }} animate={{ opacity: 1, ease: "easeInOut", scale: motionmiddlescale }}>
                    <Main_1020_Game position={"middlegame"}
                        balancedata={datas[currentgameindex]}>
                    </Main_1020_Game>
                </motion.span>
                <motion.span className='leftgame' initial={{ opacity: 0 }} animate={{ opacity: 1, ease: "easeInOut", scale: motionleftscale }}>
                    <Main_1020_Game
                        balancedata={datas[leftindex]}
                        onClickEvent={() => {
                            if (leftindex <= 0) {
                                setleftindex(datas.length - 1);
                            }
                            else {
                                setleftindex(leftindex - 1);
                            }

                            if (rightindex <= 0) {
                                setrightindex(datas.length - 1);
                            }
                            else {
                                setrightindex(rightindex - 1);
                            }

                            if (currentgameindex <= 0) {
                                setcurrentgameindex(datas.length - 1);
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
                        balancedata={datas[rightindex]}
                        onClickEvent={() => {
                            if (leftindex >= datas.length - 1) {
                                setleftindex(0);
                            }
                            else {
                                setleftindex(leftindex + 1);
                            }

                            if (rightindex >= datas.length - 1) {
                                setrightindex(0);
                            }
                            else {
                                setrightindex(rightindex + 1);
                            }

                            if (currentgameindex >= datas.length - 1) {
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
                        {datas.map((x, index) => {
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