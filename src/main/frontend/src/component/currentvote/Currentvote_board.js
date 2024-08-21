import './Currentvote_board.css';
import BalanceBar from './BalanceBar'
import React, { useState, useEffect } from 'react';
import Balancegame_commentlist from './Balancegame_commentlist';

  const Currentvote_board= () => {
    const [voteImage1, setVoteImage1] = useState('https://image.bugsm.co.kr/album/images/500/1745/174521.jpg');
    const [voteImage2, setVoteImage2] = useState('https://www.breaknews.com/imgdata/breaknews_com/200809/2008092225398536.jpg');
    const [searchkeyword, setsearchkeyword] = useState('');

    return (
      <div className='vote-mainbox'>
        <div className='past-votes'>
          <button className='past-votes-button'>지난 투표</button>
        </div>
        <div className='vote-header'>
          <div className='voting-topic'>이번 주 투표 - 당시 인기 아이돌은?</div>
          <button>공유 하기</button>
        </div>
        <div className='vote-box'>
          <div class="vote-item">
            <img className='vote-image1' src={voteImage1}></img>
            <button className='vote-name'>소녀시대</button>
          </div>
          <div className='votebar'><BalanceBar vote1={200} vote2={100} /></div>
          <div class="vote-item">
            <img className='vote-image1' src={voteImage2}></img>
            <button className='vote-name'>원더걸스</button>
          </div>
        </div>
        <div className='comments-box'>
          <div className='comment'><Balancegame_commentlist generation={"8090"}/></div>
          <div className='comment-form'>
            <textarea className='comment-box' value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
            <button className='comment-submit' onClick={() => {}}>등록</button>
          </div>
        </div>
      </div>
    );
  };


export default Currentvote_board;



