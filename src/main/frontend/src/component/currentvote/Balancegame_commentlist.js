import React, { useEffect, useRef } from 'react';
import './Balancegame_commentlist.css';
import Balancegame_commentlistItem from './Balancegame_commentlistItem';

const Balancegame_commentlist = ({ generation }) => {
    const scrollableDivRef = useRef(null);

    let commentlist = [
        {
            "nickname": "엄준식1",
            "content": "엄"
        },
        {
            "nickname": "엄준식2",
            "content": "준"
        },
        {
            "nickname": "엄준식3",
            "content": "식"
        },
        {
            "nickname": "엄준식4",
            "content": "엄"
        },
        {
            "nickname": "엄준식5",
            "content": "준"
        },
        {
            "nickname": "엄준식6",
            "content": "식"
        }
    ];

    useEffect(() => {
        const scrollableDiv = scrollableDivRef.current;
        if (scrollableDiv) {
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }
    }, [commentlist]);

    return (
        <div>
            <div id='scrollableDiv' ref={scrollableDivRef} className={`balancegame-comments${generation}box`}>
                {commentlist.map((x, index) => (
                    <Balancegame_commentlistItem key={index} comment={x} generation={generation} />
                ))}
            </div>
        </div>
    );
};

export default Balancegame_commentlist;
