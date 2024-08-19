import './HotPostList.css';
import React, { useState, useEffect } from 'react';

const HotPostList = ({generation}) => {

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
        <div>
            <div className={'hotpostlist' + generation + 'title'}>인기글</div>
            {postlist.map((post, index) => {
                return <div className={'hotpostlist' + generation + 'item'}><button>[{post.catergory}] {post.title}</button></div>
            })}
        </div>
    );
};

export default HotPostList;
