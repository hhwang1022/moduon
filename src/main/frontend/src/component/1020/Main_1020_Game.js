import './Main_1020_Game.css';
import Main_1020_BalenceItem from './Main_1020_BalenceItem';
import BalanceBar from '../currentvote/BalanceBar';
import Currentvote_board from '../currentvote/Currentvote_board';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Main_1020_Game = ({ position, balancedata, onClickEvent }) => {
    const [balancedatas, setbalancedatas] = useState([]);

    let accessToken = window.localStorage.getItem('accessToken');

      if (!balancedata) {
        return <div>Loading...</div>;
      }

  return (<div className={position}>
    <div className='mainbox'>
      <button className='maingamebutton' onClick={onClickEvent}>
        <div className='category'>{balancedata.balanceGameGeneration.replace("GENERATION_", "")}</div>
        <div className='itembox'>
          <Main_1020_BalenceItem img={balancedata.voteImage1} title={balancedata.voteItem1} />
          <span className='gamevs'>
            <span className='gamevsfont'>VS</span>
          </span>
          <Main_1020_BalenceItem img={balancedata.voteImage2} title={balancedata.voteItem2} />
        </div>
        <div className='bodyprogress'>
          <BalanceBar vote1={Math.floor(Math.random() * 10000)} vote2={Math.floor(Math.random() * 10000)} generation={"1020"}></BalanceBar>
        </div>
        <div></div>
        <div className='body'>당신의 선택은?</div>
      </button>
    </div>
  </div>

  );
};

export default Main_1020_Game;