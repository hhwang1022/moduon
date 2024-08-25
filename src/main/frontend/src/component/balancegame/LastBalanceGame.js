import './LastBalanceGame.css';
import axios from 'axios';
import BalanceBar from '../currentvote/BalanceBar'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Balancegame_commentlist from '../currentvote/Balancegame_commentlist';
import memberInfo from '../../MemberInfo';
import KakaoButton from '../KakaoButton';
import FacebookButton from '../FacebookButton';
import TwitterButton from '../TwitterButton';
  const info = memberInfo.getMemberInfo();
  const LastBalanceGame= ({generation }) => {
    const {balanceid} = useParams();
    const balanceGameId = balanceid;
    // const [generation, setGeneration] = useState('');
    const [voteTitle, setVoteTitle] = useState('');
    const [voteImage1, setVoteImage1] = useState('');
    const [voteImage2, setVoteImage2] = useState('');
    const [voteItem1, setVoteItem1] = useState('');
    const [voteItem2, setVoteItem2] = useState('');
    const [searchkeyword, setsearchkeyword] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [commentListUpdated, setCommentListUpdated] = useState(false);
    const [votePoint1, setVotePoint1] = useState(0);
    const [votePoint2, setVotePoint2] = useState(0);
    const [voteItem, setVoteItem] = useState('');
    const [votePageReset, setVotePageReset] = useState(false);
    let accessToken = window.localStorage.getItem('accessToken');
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8080/balancegames/' + balanceGameId, {
            headers: {Authorization: `Bearer ${accessToken}`}
          });
          const data = response.data.data;
          console.log(response);
          if (data) {
            const voteData = data;
            console.log("fetched data: ", data);
            setVoteTitle(voteData.title);
            setVoteImage1(voteData.voteImage1);
            setVoteImage2(voteData.voteImage2);
            setVoteItem1(voteData.voteItem1);
            setVoteItem2(voteData.voteItem2);
           // setBalanceGameId(voteData.balanceGameId);
            setVotePoint1(voteData.votePoint1);
            setVotePoint2(voteData.votePoint2);
          }
          setVotePageReset(false);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      fetchData();
    }, [accessToken, generation, votePageReset, balanceGameId]);
    const handlePostReply = async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8080/balancegames/' + balanceGameId + '/reply',
          {
            body: searchkeyword,
          },
          {
            'Content-Type': 'application/json',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        setsearchkeyword('');
        setCommentListUpdated(true);
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    };
    const handlePostVote = async (vote) => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8080/balancegames/' + balanceGameId + '/vote',
          {
            voteItem: vote
          },
          {   'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${accessToken}`,
            },
          });
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    };
    return (
      <div className='vote-mainbox'>
        <div className='vote-header'>
          <div className='voting-topic'> {voteTitle}</div>
        </div>
        <div className='vote-box'>
          <div className="vote-item">
            <img className='vote-image' src={voteImage1}></img>
            <div className={'vote-name' + generation}>{voteItem1}</div>
          </div>
          <div className='votebar'><BalanceBar vote1={votePoint1} vote2={votePoint2} generation={generation} /></div>
          <div class="vote-item">
            <img className='vote-image' src={voteImage2}></img>
            <div className={'vote-name' + generation}>{voteItem2}</div>
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
export default LastBalanceGame;