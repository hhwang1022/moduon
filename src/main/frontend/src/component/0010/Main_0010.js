import './Main_0010.css';
import React, { useState, useEffect } from 'react';
import Menubar_0010 from './Menubar_0010';
import { useNavigate, useParams } from "react-router-dom";
import Mypage from '../Mypage';
import Bgmbar from '../Bgmbar';
import Postlist from '../post/Postlist';
import Photolist from '../photo/Photolist';
import Balancegamelist from '../balancegame/Balancegamelist';
import Currentvote_board from '../currentvote/Currentvote_board';

const Main_0010 = () => {
    const [currentindex, setcurrentindex] = useState(0);

    useEffect(() => {
        console.log("currentindex : " + currentindex);
    }, [currentindex]);

    const Page = () => {
        if(currentindex === 0){
            return (
                <Postlist generation={"0010"} />
            );
        }
        else if(currentindex === 1){
            return (
                <Photolist generation={"0010"} />
            );
        }
        else if(currentindex === 2){
            return (
                <Currentvote_board generation={"0010"} />
            );
        }
        else if(currentindex === 3){
            return (
                <Photolist generation={"0010"} />
            );
        }
        else if(currentindex === 4){
            return (
                <Photolist generation={"0010"} />
            );
        }
        else if(currentindex === 5){
            return (
                <Photolist generation={"0010"} />
            );
        }
        else if(currentindex === 6){
            return (
                <Photolist generation={"0010"} />
            );
        }
        else if(currentindex === 7){
            return (
                <Photolist generation={"0010"} />
            );
        }
        else if(currentindex === 8){
            return (
                <Photolist generation={"0010"} />
            );
        }
        else{
            return (
                <Balancegamelist generation={"0010"} />
            );
        }
      };

    const navigate = useNavigate();
    return (<div className='main0010background'>
        <div className='main0010outbox'>
            <div className='main0010category'>MODUON</div>
            <div className='main1020categorybuttonarea'>
                <button className='main1020categorybutton main0010category'
                    onClick={() => {
                        navigate('/main_8090');
                    }}>8090</button>
                <button className='main1020categorybutton main0010category'
                    onClick={() => {
                        navigate('/main_9000');
                    }} >9000</button>
                <button className='main1020categorybutton main0010category'
                    onClick={() => {
                        navigate('/main_0010');
                    }}>0010</button>
                <button className='main1020categorybutton main0010category'
                    onClick={() => {
                        navigate('/main_1020');
                    }}>1020</button>
            </div>
            <div className='main0010dotbox'>
                <Menubar_0010 onClickHandler={setcurrentindex}></Menubar_0010>
                <div className='main0010inbox'>
                    <Bgmbar generation={"0010"}/>
                    <div className='main0010contentbox'>
                        <Page/>
                    </div>
                    <Mypage generation={"0010"}/>
                    <div className='main0010footer' >일촌평에 남긴 소소한 마음의 표현</div>
                </div>
            </div>
        </div>
    </div>);
};

export default Main_0010;
