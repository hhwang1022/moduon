import './ShareBar.css';
import React, { useState, useEffect } from 'react';
import ShareButton from './ShareButton';
import KakaoButton from '../KakaoButton';
import TwitterButton from '../TwitterButton';
import FacebookButton from '../FacebookButton';

const ShareBar = ({ generation }) => {

    const [sharetype, setsharetype] = useState(0);

    let title="제목~";
    let description="설명~";
    let imageUrl="";

    return (
        <div className='sharebox'>
            {/* <ShareButton sharetype={"kakao"} title={title} imageUrl={imageUrl} description={description}/>
            <ShareButton sharetype={"facebook"} title={title} imageUrl={imageUrl} description={description}/>
            <ShareButton sharetype={"twitter"} title={title} imageUrl={imageUrl} description={description}/> */}
            <KakaoButton url="https://www.naver.com/" title="제목~" description="설명~" imageUrl=""></KakaoButton>
            <TwitterButton url="https://www.naver.com/" title="제목~" description="설명~"></TwitterButton>
            <FacebookButton url="https://www.naver.com/" ></FacebookButton>
        </div>
    );
};

export default ShareBar;
