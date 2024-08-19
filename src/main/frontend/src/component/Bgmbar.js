import './Bgmbar.css';
import React, { useState, useEffect } from 'react';
import sound1 from '../resource/bgm_test1.mp3';
import sound2 from '../resource/bgm_test2.mp3';
import sound3 from '../resource/bgm_test3.mp3';
import sound4 from '../resource/bgm_test4.mp3';
import sound5 from '../resource/bgm_test5.mp3';

const Bgmbar = ({generation}) => {

    const [currentindex, setcurrentindex] = useState(0);

    let music = [
        {
            "name": "n.SSign-SPICE",
            "sound": sound1
        },
        {
            "name": "MSG워너비-듣고 싶을까",
            "sound": sound2
        },
        {
            "name": "임영웅-다시 사랑한다면",
            "sound": sound3
        },
        {
            "name": "루시-21세기의 어떤 날",
            "sound": sound4
        },
        {
            "name": "김필-그대 떠나가도",
            "sound": sound5
        }
    ]

    let bgm = new Audio();

    return (<button className={'bgmbar_' + generation}
        onClick={() => {
            // setcurrentindex(Math.floor(Math.random() * (music.length - 1)));
            bgm.src = music[currentindex].sound;
            console.log(Math.floor(Math.random() * (music.length - 1)));
            console.log("bgm.paused : " + bgm.paused);
            bgm.paused ? bgm.play() : bgm.pause();
        }}>
        🎶 {music[currentindex].name}
    </button>);
};

export default Bgmbar;
