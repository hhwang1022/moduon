import './Currentvote_board.css';
import axios from 'axios';
import BalanceBar from './BalanceBar'
import React, { useState, useEffect } from 'react';
import Balancegame_commentlist from './Balancegame_commentlist';
import memberInfo from '../../MemberInfo';

  const info = memberInfo.getMemberInfo();

  const Currentvote_board= ({generation, onclicklistbtn}) => {

   // const [generation, setGeneration] = useState('');
    const [voteTitle, setVoteTitle] = useState('');
    const [voteImage1, setVoteImage1] = useState('');
    const [voteImage2, setVoteImage2] = useState('');
    const [voteItem1, setVoteItem1] = useState('');
    const [voteItem2, setVoteItem2] = useState('');
    const [searchkeyword, setsearchkeyword] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [balanceGameId, setBalanceGameId] = useState(null);
    const [commentListUpdated, setCommentListUpdated] = useState(false);


    let accessToken = window.localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/balancegames/this-week?'
            + 'page=' + 1 + '&size=' + 10 + '&generation=' + generation, {
            headers: { Authorization: `Bearer ${accessToken}` }
            });

            const data = response.data.data;
               if(data && data.length > 0) {
                    const voteData = data[0];
                    setVoteTitle(voteData.title);
                    setVoteImage1(voteData.voteImage1);
                    setVoteImage2(voteData.voteImage2);
                    setVoteItem1(voteData.voteItem1);
                    setVoteItem2(voteData.voteItem2);
                    setBalanceGameId(voteData.balanceGameId);
                }

        } catch (error) {
            console.error("Error fetching data: ", error);
       }
    };

    fetchData();
  }, [accessToken, generation]);

  const handlePostReply = async () => {
    try {
        const response = await axios.post(
        'http://127.0.0.1:8080/balancegames/' + balanceGameId + '/reply',
        {
            body:searchkeyword,
        },
        {   'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${accessToken}`,
             },

        });
        setsearchkeyword('');
        setCommentListUpdated(true);

        } catch (error) {
            alert(JSON.stringify(error.message));
    }
  };


    return (
      <div className='vote-mainbox'>
        <div className='past-votes'>
          <button className={'past-votes-button' + generation} onClick={onclicklistbtn}>지난 투표</button>
        </div>
        <div className='vote-header'>
          <div className='voting-topic'>이번 주 투표 - {voteTitle}</div>
          <button>공유 하기</button>
        </div>
        <div className='vote-box'>
          <div class="vote-item">
            <img className='vote-image' src={voteImage1}></img>
            <button className={'vote-name' + generation}>{voteItem1}</button>
          </div>
          <div className='votebar'><BalanceBar vote1={200} vote2={100} generation={generation} /></div>
          <div class="vote-item">
            <img className='vote-image' src={voteImage2}></img>
            <button className={'vote-name' + generation}>{voteItem2}</button>
          </div>
        </div>
        <div className='comments-box'>
          <div className='comment'><Balancegame_commentlist generation={generation} balanceGameId={balanceGameId}
          commentListUpdated={commentListUpdated} setCommentListUpdated={setCommentListUpdated}/></div>
          <div className='comment-form'>
            <textarea className='comment-box' value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
            <button className='comment-submit' onClick={handlePostReply}>등록</button>
          </div>
        </div>
      </div>
    );
  };


export default Currentvote_board;