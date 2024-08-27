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
import Polaroid from '../Polaroid';
const vsicon0010 = require('../../resource/vs_0010.png');

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
    const [commentId, setCommentId] = useState(null);
    const [enddate, setenddate] = useState(Date.now);

    let accessToken = window.localStorage.getItem('accessToken');
    let info = memberInfo.getMemberInfo();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_API_URL + 'balancegames/this-week?'
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
            setenddate(voteData.endDate);
          }
          setVotePageReset(false);
          setisloading(false);
        } catch (error) {
          setisloading(false);
        }
      };

      fetchData();
    }, [accessToken, generation, votePageReset]);

    const handlePostReply = async () => {
      try {
        const response = await axios.post(
         process.env.REACT_APP_API_URL + 'balancegames/' + balanceGameId + '/reply',
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
        if (searchkeyword === '' && info.name === "홍길동") {
          alert("로그인 하셔야 댓글 작성 가능합니다.");
          return;
        }
        if (searchkeyword === '') {
          alert("메세지를 입력해주세요.");
          return;
        } else {
          alert("로그인 하셔야 댓글 작성 가능합니다.")
        }
      }
    };

    //공유하기
    const handlePostShare = async (sharetype) => {
      if(info.login){
        try {
          const response = await axios.post(
            process.env.REACT_APP_API_URL + 'balancegames/' + balanceGameId + '/share',
            {
              "sharetype": sharetype,
            },
            {
              'Content-Type': 'application/json',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            updateTicketCount(response.data.data);
        } catch (error) {
          alert("공유에 실패했습니다.")
        }
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
          process.env.REACT_APP_API_URL + 'balancegames/' + balanceGameId + '/vote',
          {
            voteItem: vote
          },
          {   'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${accessToken}`,
            },
          });
          updateTicketCount(response.data.data.votingRights);
      } catch (error) {
        alert("투표에 실패했습니다.")
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
        <div className={'vote-box' + generation}>
          <div class="vote-item">
            {/* <img className='vote-image' src={voteImage1}></img> */}
            <Polaroid img={voteImage1} name={voteItem1} generation={generation} iswin={votePoint1 > votePoint2} isright ={false}/>
            <button className={'vote-name' + generation} onClick={vote1}>{voteItem1}</button>
          </div>
          <img height={150} width={150} src={vsicon0010} className='vote-vs'/>
          <div class="vote-item">
          <Polaroid img={voteImage2} name={voteItem2} generation={generation} iswin={votePoint2 > votePoint1} isright ={true}/>
            {/* <img className='vote-image' src={voteImage2}></img> */}
            <button className={'vote-name' + generation} onClick={vote2}>{voteItem2}</button>
          </div>
        </div>
        <BalanceBar vote1={votePoint1} vote2={votePoint2} generation={generation} />
        <div className='vote-info-box'>{'투표 마감까지 ' + Math.floor((new Date(enddate) - new Date()) / (1000 * 3600)) + '일!!!'}
        </div>
        <div className='comments-box'>
          <div className='comment'><Balancegame_commentlist generation={generation} balanceGameId={balanceGameId} 
          commentListUpdated={commentListUpdated} setCommentListUpdated={setCommentListUpdated} value={searchkeyword}/></div>
          <div className='comment-form'>
            <textarea className={'comment-box commentfont' + generation} value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
            <button className={'balancereplywritebtn' + generation} onClick={handlePostReply}>등록</button>
          </div>
        </div>
      </div> :  <div className='vote-mainbox'><Loading generation={generation}/> </div> 
    );
  };


export default Currentvote_board;
