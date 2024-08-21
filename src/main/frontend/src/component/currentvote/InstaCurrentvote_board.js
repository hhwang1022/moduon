import React, { useState, useEffect } from 'react';
import './InstaCurrentvote_board.css';
import InstaBalancebar from './InstaBalancebar';
import Balancegame_commentlist from './Balancegame_commentlist';

const InstaCurrentvote_board = () => {
    const [searchkeyword, setsearchkeyword] = useState('');
    return  (
        <div className='balancegame-box'>
            <div className='balancegame-header'>
                <div className='voteboard'>투표게시판</div>
                <div className='icon'>
                {/* 이미지 수정 필요 */}
                    <img className='plus-image' src="https://w7.pngwing.com/pngs/68/239/png-transparent-number-computer-icons-plus-miscellaneous-game-plus.png"></img>
                    <img className='menu-image' src="https://cdn-icons-png.flaticon.com/512/3502/3502458.png"></img>
                </div>
            </div>
            <div className='past-votes'>
                <button className='past-votes-button'>지난 투표</button>
            </div>
            <div className='vote-header'>
                <div className='voting-topic'>싸우면 누가 이길까?</div>
                
            </div>
            <div className='share-box'>
                <button>공유 하기</button>
            </div>
            <div className='vote-item'>
                <div className='vote1'>
                    <img className='vote-frame1' src="https://png.pngtree.com/png-vector/20240206/ourmid/pngtree-iphone-15-pro-photocall-camera-vector-png-image_11719125.png"></img>                
                    <div className='vote-name1'>호랑이</div>
                    <button>투표</button>
                    <img className='vote-image1' src="https://gnews.gg.go.kr/OP_UPDATA/UP_DATA/_FILEZ/202112/20211227054431183687488.jpg"></img>
                </div>
                <div className='vote2'>
                    <img className='vote-frame2' src="https://png.pngtree.com/png-vector/20240206/ourmid/pngtree-iphone-15-pro-photocall-camera-vector-png-image_11719125.png"></img>
                    <div className='vote-name2'>사자</div>
                    <button>투표</button>
                    <img className='vote-image2' src="https://static.news.zumst.com/images/2/2020/01/01/6004e56f490341d88d4f022163af8c4b.jpg"></img>
                </div>
            </div>
            <div className='votebar'><InstaBalancebar vote1={200} vote2={100} /></div>
            <div className='comments-box'>
                <div className='comment'><Balancegame_commentlist generation={"1020"}/></div>
                <div className='comment-form'>
                    <textarea className='comment-box'  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
                    <button className='comment-submit' onClick={() => {}}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default InstaCurrentvote_board;