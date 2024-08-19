import './TopBanner.css';
import React, { useState, useEffect } from 'react';

const TopBanner = ({generation}) => {

    const [currentindex, setcurrentindex] = useState(0);

    const bannerlist = [
        {
            "text": "n.SSign-SPICE",
            "generation": "8090"
        },
        {
            "text": "MSG워너비-듣고 싶을까",
            "generation": "9000"
        },
        {
            "text": "임영웅-다시 사랑한다면",
            "generation": "0010"
        },
        {
            "text": "루시-21세기의 어떤 날",
            "generation": "1020"
        },
        {
            "text": "김필-그대 떠나가도",
            "generation": "8090"
        }
    ]

    let categorybannerlist = bannerlist.filter(x => x.generation === generation);

    return (<div className={"marquee" + generation}><p>{categorybannerlist[Math.floor(Math.random() * categorybannerlist.length)].text}</p></div>);
};

export default TopBanner;
