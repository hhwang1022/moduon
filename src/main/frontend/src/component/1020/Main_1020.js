import './Main_1020.css';
import Main_1020_Game from './Main_1020_Game';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header_1020 from './Header_1020';
import Join from '../Join';
import Login from '../Login';
import Postboard from '../post/Postboard';
import Photoboard from '../photo/Photoboard';
import Balancegameborad from '../balancegame/Balancegameborad';
import axios from 'axios';
import MyProfile from '../MyProfile';
import UpdateProfile from '../UpdateProfile';
import Main_balancegame from './Main_balancegame';


const Main_1020 = () => {

    const [currentgameindex, setcurrentgameindex] = useState(1);
    const [leftindex, setleftindex] = useState(0);
    const [rightindex, setrightindex] = useState(2);

    const [motionposition, setmotionposition] = useState(100);
    const [motionmiddlescale, setmotionmiddlescale] = useState(0.9);
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
            setmotionmiddlescale(0.9);
            setmotionrightscale(0.5);
        }, 100);
    }, [motionposition]);

    useEffect(() => {
        const fetchbalancedatas = async () => {
            try {

                const response = await axios.get(
                    process.env.REACT_APP_API_URL + 'balancegames/main', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });

                console.log(response.data);
                setbalancedatas(response.data);
                
          } catch (error) {
            console.error("Error fetching balancedatas: ", error);
            setbalancedatas([]);
          }
        };

        fetchbalancedatas();
    }, []);

    useEffect(() => {
        console.log("response.data : " + balancedatas.data);
    }, [balancedatas]);

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
        else if (currentindex === 3) {
            return (
                <Join successhandler={setcurrentindex} />
            );
        }
        else if (currentindex === 5) {
            return (
                <Login successhandler={setcurrentindex} />
            );
        }
        else {

        }
    };

    return (<div>
        <Header_1020 setcurrentindex={setcurrentindex} titleindex={titleindex}></Header_1020>
        <div className={'main1020' + (currentindex === 1 ? " main1020photo" : "")}>
            <Routes>
                <Route path="join" element={<Join successhandler={setcurrentindex} />} />
                <Route path="login" element={<Login successhandler={setcurrentindex} />} />
                <Route path="myprofile" element={<MyProfile successhandler={setcurrentindex} />} />
                <Route path="updateprofile" element={<UpdateProfile successhandler={setcurrentindex} />} />
                <Route path="/" element={<Main_balancegame balancedatas={balancedatas}/>} />
            </Routes>
        </div>
    </div>);
};

export default Main_1020;