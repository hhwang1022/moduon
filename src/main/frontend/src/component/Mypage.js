import HotPostList from './post/HotPostList';
import './Mypage.css';
import React, { useState, useEffect } from 'react';

const Mypage = ({generation}) => {

    const [currentindex, setcurrentindex] = useState(0);

    let postlist = [
        {
            "title": "n.SSign-SPICE",
            "catergory": "1020",
            "id": 20
        },
        {
            "title": "n.SSign-SPICE",
            "catergory": "1020",
            "id": 20
        },
        {
            "title": "n.SSign-SPICE",
            "catergory": "1020",
            "id": 20
        },
        {
            "title": "n.SSign-SPICE",
            "catergory": "1020",
            "id": 20
        },
        {
            "title": "n.SSign-SPICE",
            "catergory": "1020",
            "id": 20
        }
    ]

    return (
        <div className={'main' + generation + 'memberbox'}>
                        <div className={'main' + generation + 'memberinbox'}>
                            <div className={'main' + generation + 'membertitle'}><span>닉네임</span> <span className={'main' + generation + 'membertitlegeneration'}>[1020]</span></div>
                            <div className={'main' + generation + 'memberpoint'}>투표권 N장</div>
                            <div className='direction-row'><button className={'main' + generation + 'memberbutton'}>[마이페이지]</button><button className={'main' + generation + 'memberbutton'}>[로그아웃]</button></div>
                           <HotPostList generation={generation}/>
                        </div>
                    </div>
    );
};

export default Mypage;
