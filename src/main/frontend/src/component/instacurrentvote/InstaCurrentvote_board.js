import React, { useState, useEffect } from 'react';
import './InstaCurrentvote_board.css';
import InstaBalancebar from './InstaBalancebar';
import Balancegame_commentlist from '../currentvote/Balancegame_commentlist';

const InstaCurrentvote_board = () => {
    const [searchkeyword, setsearchkeyword] = useState('');
    return  (
        <div className='insta-balancegame-box'>
            <div className='insta-past-votes'>
                <button className='insta-past-votes-button'>지난 투표</button>
            </div>
            <div className='insta-vote-header'>
                <div className='insta-voting-topic'>싸우면 누가 이길까?</div>
            </div>
            <div className='insta-share-box'>
                <button>공유 하기</button>
            </div>
            <div className='insta-vote-item'>
                <div className='insta-vote1'>
                    <img className='insta-vote-frame1' src="https://png.pngtree.com/png-vector/20240206/ourmid/pngtree-iphone-15-pro-photocall-camera-vector-png-image_11719125.png"></img>                
                    <div className='insta-vote-name1'>호랑이</div>
                    <button>투표</button>
                    <img className='insta-vote-image1' src="https://gnews.gg.go.kr/OP_UPDATA/UP_DATA/_FILEZ/202112/20211227054431183687488.jpg"></img>
                </div>
                <div className='insta-vote2'>
                    <img className='insta-vote-frame2' src="https://png.pngtree.com/png-vector/20240206/ourmid/pngtree-iphone-15-pro-photocall-camera-vector-png-image_11719125.png"></img>
                    <div className='insta-vote-name2'>사자</div>
                    <button>투표</button>
                    <img className='insta-vote-image2' src="https://static.news.zumst.com/images/2/2020/01/01/6004e56f490341d88d4f022163af8c4b.jpg"></img>
                </div>
            </div>
            <div className='insta-votebar'><InstaBalancebar vote1={200} vote2={100} /></div>
            <div className='insta-comments-box'>
                <div className='insta-comment'><Balancegame_commentlist generation={"1020"}/></div>
                <div className='insta-comment-form'>
                    <textarea className='insta-comment-box'  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
                    <button className='insta-comment-submit' onClick={() => {}}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default InstaCurrentvote_board;