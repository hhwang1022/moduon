import '../currentvote/Currentvote_board.css';
import axios from 'axios';
import BalanceBar from '../currentvote/BalanceBar';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Balancegame_commentlistItem from '../currentvote/Balancegame_commentlistItem';
import Loading from '../Loading';

const LastBalanceGame = ({ generation }) => {
  const { balanceid } = useParams();
  const balanceGameId = balanceid;
  const [voteTitle, setVoteTitle] = useState('');
  const [voteImage1, setVoteImage1] = useState('');
  const [voteImage2, setVoteImage2] = useState('');
  const [voteItem1, setVoteItem1] = useState('');
  const [voteItem2, setVoteItem2] = useState('');
  const [searchkeyword, setSearchkeyword] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [commentListUpdated, setCommentListUpdated] = useState(false);
  const [votePoint1, setVotePoint1] = useState(0);
  const [votePoint2, setVotePoint2] = useState(0);
  const [votePageReset, setVotePageReset] = useState(false);
  const[isloading, setisloading] = useState(true);

  let accessToken = window.localStorage.getItem('accessToken');

  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'balancegames/' + balanceGameId, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = response.data.data;

      if (data) {
        const voteData = data;
        setVoteTitle(voteData.title);
        setVoteImage1(voteData.voteImage1);
        setVoteImage2(voteData.voteImage2);
        setVoteItem1(voteData.voteItem1);
        setVoteItem2(voteData.voteItem2);
        setVotePoint1(voteData.votePoint1);
        setVotePoint2(voteData.votePoint2);
        setCommentList(voteData.balanceGameReplesiList || []);
      }
      setVotePageReset(false);
      setisloading(false);

    } catch (error) {
      setisloading(false);
      alert("단일투표 조회 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, [commentListUpdated]);

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [commentListUpdated]);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  }, [commentList]);

  useEffect(() => {
    if (commentListUpdated) {
      setCommentListUpdated(false);
    }
  }, [commentListUpdated]);

  return (
  !isloading ?
    <div className='vote-mainbox'>
      <div className='vote-header'>
        <div className='voting-topic'> {voteTitle}</div>
      </div>
      <div className='vote-box'>
        <div className="vote-item">
          <img className='vote-image' src={voteImage1} alt="Vote Option 1" />
          <div className={'vote-name' + generation}>{voteItem1}</div>
        </div>
        <div className='votebar'>
        </div>
        <div className="vote-item">
          <img className='vote-image' src={voteImage2} alt="Vote Option 2" />
          <div className={'vote-name' + generation}>{voteItem2}</div>
        </div>
      </div>
      <BalanceBar vote1={votePoint1} vote2={votePoint2} generation={generation} />
      <div className='comments-box'>
        <div id='scrollableDiv' ref={scrollableDivRef} className='comment'>
          {commentList.length > 0 ? (
            commentList.map((x, index) => (
              <Balancegame_commentlistItem key={index} comment={x} generation={generation} />
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>

      </div>
    </div> : <div className='vote-mainbox'><Loading generation={generation}/> </div>
  );
};

export default LastBalanceGame;
