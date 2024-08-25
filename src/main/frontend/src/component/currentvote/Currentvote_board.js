import './Currentvote_board.css';
import axios from 'axios';
import BalanceBar from './BalanceBar'
import React, { useState, useEffect } from 'react';
import Balancegame_commentlist from './Balancegame_commentlist';
import memberInfo from '../../MemberInfo';
import KakaoButton from '../KakaoButton';
import FacebookButton from '../FacebookButton';
import TwitterButton from '../TwitterButton';
import Loading from '../Loading';

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
    const [votePoint1, setVotePoint1] = useState(0);
    const [votePoint2, setVotePoint2] = useState(0);
    const [voteItem, setVoteItem] = useState('');
    const [votePageReset, setVotePageReset] = useState(false);
    const[isloading, setisloading] = useState(true);

    let accessToken = window.localStorage.getItem('accessToken');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8080/balancegames/this-week?'
            + 'page=' + 1 + '&size=' + 10 + '&generation=' + generation, {
            headers: {Authorization: `Bearer ${accessToken}`}
          });

          const data = response.data.data;
          if (data && data.length > 0) {
            const voteData = data[0];
            setVoteTitle(voteData.title);
            setVoteImage1(voteData.voteImage1);
            setVoteImage2(voteData.voteImage2);
            setVoteItem1(voteData.voteItem1);
            setVoteItem2(voteData.voteItem2);
            setBalanceGameId(voteData.balanceGameId);
            setVotePoint1(voteData.votePoint1);
            setVotePoint2(voteData.votePoint2);
          }
          setVotePageReset(false);

          setisloading(false);

        } catch (error) {
          console.error("Error fetching data: ", error);
          setisloading(false);
        }
      };

      fetchData();
    }, [accessToken, generation, votePageReset]);

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
        console.log(error.response.data);
      }
    };

    //공유하기
    const handlePostShare = async (sharetype) => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8080/balancegames/' + balanceGameId + '/share',
          {
            "sharetype": sharetype,
          },
          {
            'Content-Type': 'application/json',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },

          });

          console.log("response.data.data : " + response.data.data);

          updateTicketCount(response.data.data);

      } catch (error) {
        alert(JSON.stringify(error.message));
        console.log(error.response.data);
      }
    };

    const updateTicketCount = (newTicketCount) => {
      // Update balancegameticket
      memberInfo.updateMemberInfo({ balancegameticket: newTicketCount });
  };

      const vote1 = (() => {
        const vote11 = "point1"
        handlePostVote(vote11);
        setVotePageReset(true);
    });

    const vote2 = (() => {
      const vote12 = "point2"
      handlePostVote(vote12);
      setVotePageReset(true);
    });

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

          updateTicketCount(response.data.data.votingRights);

      } catch (error) {
        alert(JSON.stringify(error.message));
        console.log(error.response.data);
        console.log(error.response.data);
      }
    };

    return (
      !isloading ? 
      <div className='vote-mainbox'>
        <div className='past-votes'>
          <button className={'postpagewritebtn' + generation} onClick={onclicklistbtn}>지난 투표</button>
        </div>
        <div className={'vote-header voting-topic' + generation}>
        이번 주 투표 - {voteTitle}
        </div>
        <div className='sharebox'>
        <KakaoButton url={window.location.href} title={voteTitle} description={"당신의 선택은?"} imageUrl=""
        onclickhandler={() => handlePostShare("kakao")}/>
        <TwitterButton url={window.location.href} title={voteTitle} description={"당신의 선택은?"}
        onclickhandler={() => handlePostShare("twitter")}/>
        <FacebookButton url={window.location.href}
        onclickhandler={() => handlePostShare("facebook")}/>
        </div>
        <div className='vote-box'>
          <div class="vote-item">
            <img className='vote-image' src={voteImage1}></img>
            <button className={'vote-name' + generation} onClick={vote1}>{voteItem1}</button>
          </div>
          <div className='votebar'><BalanceBar vote1={votePoint1} vote2={votePoint2} generation={generation} /></div>
          <div class="vote-item">
            <img className='vote-image' src={voteImage2}></img>
            <button className={'vote-name' + generation} onClick={vote2}>{voteItem2}</button>
          </div>
        </div>
        <div className='comments-box'>
          <div className='comment'><Balancegame_commentlist generation={generation} balanceGameId={balanceGameId} 
          commentListUpdated={commentListUpdated} setCommentListUpdated={setCommentListUpdated}/></div>
          <div className='comment-form'>
            <textarea className={'comment-box commentfont' + generation} value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
            <button className={'balancereplywritebtn' + generation} onClick={handlePostReply}>등록</button>
          </div>
        </div>
      </div> :  <div className='vote-mainbox'><Loading generation={generation}/> </div> 
    );
  };


export default Currentvote_board;