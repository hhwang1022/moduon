import './Bgmbar.css';
import React, { useState, useEffect, useRef } from 'react';
import sound1 from '../resource/bgm_test1.mp3';
import sound2 from '../resource/bgm_test2.mp3';
import sound3 from '../resource/bgm_test3.mp3';
import sound4 from '../resource/bgm_test4.mp3';
import sound5 from '../resource/bgm_test5.mp3';
import sound6 from '../resource/bgm_test6.mp3';
import sound7 from '../resource/bgm_test7.mp3';
import sound8 from '../resource/bgm_test8.mp3';
import sound9 from '../resource/bgm_test9.mp3';
import sound10 from '../resource/bgm_test10.mp3';

const Bgmbar = ({ generation }) => {

    const [currentindex, setcurrentindex] = useState(0);
    const bgm = useRef(document.getElementById('bgmplayer'));

    const musiclist = [
        {
            "name": "신해철 - 그대에게",
            "sound": sound1,
            "generation": "8090"
        },
        {
            "name": "이문세 - 붉은노을",
            "sound": sound2,
            "generation": "8090"
        },
        {
            "name": "이선희 - 나 항상 그대를",
            "sound": sound3,
            "generation": "8090"
        },
        {
            "name": "H.O.T. - 캔디",
            "sound": sound4,
            "generation": "9000"
        },
        {
            "name": "S.E.S. - I'm Your Girl",
            "sound": sound5,
            "generation": "9000"
        },
        {
            "name": "신화 -Perfect Man",
            "sound": sound6,
            "generation": "9000"
        },
        {
            "name": "프리스타일 - Y",
            "sound": sound7,
            "generation": "0010"
        },
        {
            "name": "Buzz - Monologue",
            "sound": sound8,
            "generation": "0010"
        },
        {
            "name": "빅뱅 - 하루하루",
            "sound": sound9,
            "generation": "0010"
        },
        {
            "name": "원더걸스 - Tell me",
            "sound": sound10,
            "generation": "0010"
        },
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
