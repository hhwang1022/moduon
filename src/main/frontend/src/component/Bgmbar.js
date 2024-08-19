import './Bgmbar.css';
import React, { useState, useEffect, useRef } from 'react';
import sound1 from '../resource/bgm_test1.mp3';
import sound2 from '../resource/bgm_test2.mp3';
import sound3 from '../resource/bgm_test3.mp3';
import sound4 from '../resource/bgm_test4.mp3';
import sound5 from '../resource/bgm_test5.mp3';

const Bgmbar = ({ generation }) => {

    const [currentindex, setcurrentindex] = useState(0);
    const bgm = useRef(new Audio());

    const musiclist = [
        {
            "name": "n.SSign-SPICE",
            "sound": sound1,
            "generation": "8090"
        },
        {
            "name": "MSG워너비-듣고 싶을까",
            "sound": sound2,
            "generation": "9000"
        },
        {
            "name": "임영웅-다시 사랑한다면",
            "sound": sound3,
            "generation": "0010"
        },
        {
            "name": "루시-21세기의 어떤 날",
            "sound": sound4,
            "generation": "1020"
        },
        {
            "name": "김필-그대 떠나가도",
            "sound": sound5,
            "generation": "1020"
        }
    ];

    let categorymusiclist = musiclist.filter(x => x.generation === generation);

    const handleButtonClick = () => {
        // 현재 재생 중인 음악이 있으면 중지
        if (!bgm.current.paused) {
            bgm.current.pause();
        }

        // 새로운 랜덤 인덱스를 생성하여 노래 변경
        const newIndex = Math.floor(Math.random() * categorymusiclist.length);
        setcurrentindex(newIndex);

        // 새로운 노래를 로드하고 재생
        bgm.current.src = categorymusiclist[newIndex].sound;
        bgm.current.play().catch((error) => {
            console.error("오디오 재생 중 오류가 발생했습니다:", error);
        });
    };

    return (
        <button className={'bgmbar_' + generation}
            onClick={handleButtonClick}>
            🎶 {categorymusiclist[currentindex].name}
        </button>
    );
};

export default Bgmbar;