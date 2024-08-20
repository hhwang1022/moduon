import './Photolist.css';
import React, { useState, useEffect } from 'react';
import Photolistitem from './Photolistitem';

const Photolist = ({ generation }) => {

    const [currentindex, setcurrentindex] = useState(0);
    const [searchkeyword, setsearchkeyword] = useState('');
    const [totalpage, settotalpage] = useState(10);
    const [curruntpage, setcurruntpage] = useState(1);
    const [sorttype, setsorttype] = useState('SORT_NEW');
    /*1020일 땐 보이는 갯수 9개 아닐 땐 9개*/
    let size = generation === "1020" ? 9 : 8;

    let photolist = [
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10,
            "imgurl1": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl2": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl3": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl4": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl5": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10,
            "imgurl1": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl2": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl3": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl4": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl5": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10,
            "imgurl1": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl2": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl3": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl4": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl5": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10,
            "imgurl1": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl2": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl3": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl4": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl5": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10,
            "imgurl1": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl2": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl3": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl4": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl5": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"
        }
        ,
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10,
            "imgurl1": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl2": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl3": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl4": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl5": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10,
            "imgurl1": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl2": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl3": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl4": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl5": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"
        },
        {
            "title": "n.SSign-SPICEasdasdasdasdas",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10,
            "imgurl1": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl2": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl3": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl4": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl5": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"
        }
    ]

    if (generation === "1020") {
        photolist.push({
            "title": "n.SSign-SPICEasdasdasdasdas",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10,
            "imgurl1": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl2": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl3": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl4": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg",
            "imgurl5": "https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"
        })
    }

    useEffect(() => {

    }, [curruntpage]);


    return (<div className={'photolist' + generation + 'mainbox'}>
        <div className='right'>
            <select className={"postlistselect" + generation} onChange={(e) => {
                setsorttype(e.target.value);
            }}>
                <option className={"postlistselectitem" + generation} value="SORT_NEW">새글 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_OLD">오래된글 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_VIEW_MAX">조회수 많은 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_VIEW_MIN">조회수 적은 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_LIKE_MANY">좋아요 많은 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_LIKE_MIN">좋아요 적은 순</option>
            </select>
            <button className={"postpagewritebtn" + generation}>글쓰기</button>
        </div>
        <div className={"photomainconent" + generation}>
            {photolist.map((x, index) => {
                return <Photolistitem post={x} generation={generation} />
            })}
        </div>
        <div className='postmiddle'>
            <div>
                <button className={'pagebtn' + generation} onClick={() => {
                    if (currentindex > 0)
                        setcurrentindex(currentindex - 1);
                }}>
                    ◁
                </button>
                {[...Array(parseInt(totalpage))].map((n, index) => {
                    return <button className={curruntpage === index + 1 ? 'pagebtnselect' + generation : 'pagebtn' + generation} onClick={() => setcurruntpage(index + 1)}> {index + 1}  </button>
                })}
                <button className={'pagebtn' + generation} onClick={() => {
                    if (currentindex < totalpage - 1)
                        setcurrentindex(currentindex + 1);
                }}>
                    ▷
                </button>
            </div>
            <div>
                <input className='qnasearchbodyinput' type="text" value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)} />
                <button className={'postpagebtn' + generation} onClick={() => {

                }}>검색</button>
            </div>
        </div>
    </div>);
};

export default Photolist;
