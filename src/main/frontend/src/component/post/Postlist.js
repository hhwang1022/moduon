import './Postlist.css';
import React, { useState, useEffect } from 'react';
import PostlistItem from './PostlistItem';

const Postlist = ({ generation }) => {

    const [currentindex, setcurrentindex] = useState(0);
    const [searchkeyword, setsearchkeyword] = useState('');
    const [totalpage, settotalpage] = useState(10);
    const [curruntpage, setcurruntpage] = useState(1);
    const [sorttype, setsorttype] = useState('SORT_NEW');

    let postlist = [
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10
        }
        ,
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10
        },
        {
            "title": "n.SSign-SPICE",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10
        },
        {
            "title": "n.SSign-SPICEasdasdasdasdas",
            "nickname": "닉네임",
            "createsat": "2020-10-22",
            "view": 10,
            "like": 10
        }
    ]

    useEffect(() => {

    }, [curruntpage]);


    return (<div className={'postlist' + generation + 'mainbox'}>
        <div className='right'>
            <select className={'postlistselect' + generation} onChange={(e) => {
                setsorttype(e.target.value);
            }}>
                <option className={"postlistselectitem" + generation} value="SORT_NEW">새글 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_OLD">오래된글 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_VIEW_MAX">조회수 많은 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_VIEW_MIN">조회수 적은 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_LIKE_MANY">좋아요 많은 순</option>
                <option className={"postlistselectitem" + generation} value="SORT_LIKE_MIN">좋아요 적은 순</option>
            </select>
            <button className={"postpagewritebtn"+generation}>글쓰기</button>
        </div>
        {generation === "1020" ? 
        <div className={"postlist" + generation + "margin"}>{postlist.map((x, index) => {
            return <PostlistItem post={x} generation={generation} />
        })}</div> :
        <table className={'postlist' + generation + 'margin'}  >
            <tr className={'postlist' + generation + 'title'} >
                <td width="50"></td>
                <td className={'postlist' + generation + 'text'}>제목</td>
                <td className={'postlist' + generation + 'text'}>닉네임</td>
                <td className={'postlist' + generation + 'text'} width="50">작성일</td>
                <td className={'postlist' + generation + 'text'} width="50">조회수</td>
                <td className={'postlist' + generation + 'text'} width="50">추천수</td>
            </tr>
            <tbody>
                {postlist.map((x, index) => {
                    return <PostlistItem post={x} generation={generation} />
                })}
            </tbody>
        </table>
        }
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

export default Postlist;
