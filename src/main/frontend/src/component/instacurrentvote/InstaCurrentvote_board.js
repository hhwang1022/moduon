import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InstaCurrentvote_board.css';
import InstaBalancebar from './InstaBalancebar';
import Balancegame_commentlist from '../currentvote/Balancegame_commentlist';

const InstaCurrentvote_board = ({onclicklistbtn}) => {

    const [voteTitle, setVoteTitle] = useState('');
    const [voteImage1, setVoteImage1] = useState('');
    const [voteImage2, setVoteImage2] = useState('');
    const [voteItem1, setVoteItem1] = useState('');
    const [voteItem2, setVoteItem2] = useState('');
    const [searchkeyword, setsearchkeyword] = useState('');
    const [balanceGameId, setBalanceGameId] = useState(null);
    const [commentListUpdated, setCommentListUpdated] = useState(false);

    let accessToken = window.localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/balancegames/this-week?'
                + 'page=' + 1 + '&size=' + 10 + '&generation=' + 1020, {
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
                    }

                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };

            fetchData();
        }, [accessToken]);

    return  (
        <div className='insta-balancegame-box'>
            <div className='insta-past-votes'>
                <button className='insta-past-votes-button' onClick={onclicklistbtn}>지난 투표</button>
            </div>
            <div className='insta-vote-header'>
                <div className='insta-voting-topic'>{voteTitle}</div>
            </div>
            <div className='insta-share-box'>
                <button>공유 하기</button>
            </div>
            <div className='insta-vote-item'>
                <div className='insta-vote1'>
                    <img className='insta-vote-frame1' src="https://png.pngtree.com/png-vector/20240206/ourmid/pngtree-iphone-15-pro-photocall-camera-vector-png-image_11719125.png"></img>
                    <div className='insta-vote-name1'>{voteItem1}</div>
                    <button>투표</button>
                    <img className='insta-vote-image1' src={voteImage1}></img>
                </div>
                <div className='insta-vote2'>
                    <img className='insta-vote-frame2' src="https://png.pngtree.com/png-vector/20240206/ourmid/pngtree-iphone-15-pro-photocall-camera-vector-png-image_11719125.png"></img>
                    <div className='insta-vote-name2'>{voteItem2}</div>
                    <button>투표</button>
                    <img className='insta-vote-image2' src={voteImage2}></img>
                </div>
            </div>
            <div className='insta-votebar'><InstaBalancebar vote1={200} vote2={100} /></div>
            <div className='insta-comments-box'>
                <div className='insta-comment'><Balancegame_commentlist generation={"1020"} balanceGameId={balanceGameId}
          commentListUpdated={commentListUpdated} setCommentListUpdated={setCommentListUpdated}/></div>
                <div className='insta-comment-form'>
                    <textarea className='insta-comment-box'  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
                    <button className='insta-comment-submit' onClick={() => {}}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default InstaCurrentvote_board;