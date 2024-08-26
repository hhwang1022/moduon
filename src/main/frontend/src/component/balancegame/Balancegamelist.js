import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BalancegameItem from './Balancegameitem'; // Corrected import

const Balancegamelist = ({ generation, onClickwirtebtn, balanceGameId }) => {

    const [postlist, setPostlist] = useState([]);
    const [currentindex, setCurrentindex] = useState(0);
    const [totalpage, setTotalpage] = useState(10);
    const [curruntpage, setCurruntpage] = useState(1);
    const [sorttype, setSorttype] = useState('balanceGameId_desc');

    let accessToken = window.localStorage.getItem('accessToken');

    const fetchPosts = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'balancegames/end?' +
                'page=' + curruntpage + '&size=' + 10 + '&generation=' + generation,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
            if (response !== undefined) {
                console.log("Response Data:", response.data);
                setPostlist(response.data.data);
                setTotalpage(response.data.pageInfo.totalPages);
            }
        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [sorttype, curruntpage, generation]);

    const handlePageChange = (pageNumber) => {
        setCurruntpage(pageNumber);
        fetchPosts();
    };

    return (
        <div className={'postlist' + generation + 'mainbox'}>
            <div className='right'>
                <select className={'postlistselect' + generation} onChange={(e) => {
                    setSorttype(e.target.value);
                }}>
                    <option className={"postlistselectitem" + generation} value="postId_desc">새글 순</option>
                    <option className={"postlistselectitem" + generation} value="postId_asc">오래된글 순</option>
                    <option className={"postlistselectitem" + generation} value="view_desc">조회수 많은 순</option>
                    <option className={"postlistselectitem" + generation} value="view_asc">조회수 적은 순</option>
                    <option className={"postlistselectitem" + generation} value="likeCount_desc">좋아요 많은 순</option>
                    <option className={"postlistselectitem" + generation} value="likeCount_asc">좋아요 적은 순</option>
                </select>
            </div>
            {generation === "1020" ?
                <div className={"postlist" + generation + "margin"}>
                    {postlist.map((x, index) => {
                        return <BalancegameItem key={x.postId} post={x} generation={generation} onclickhandler={onClickwirtebtn} />;
                    })}
                </div> :
                <table className={'postlist' + generation + 'margin'}>
                    <thead>
                        <tr className={'postlist' + generation + 'title'}>
                            <td width="50"></td>
                            <td className={'postlist' + generation + 'text'}>제목</td>
                            <td className={'postlist' + generation + 'text'}>닉네임</td>
                            <td className={'postlist' + generation + 'text'} width="50">작성일</td>
                            <td className={'postlist' + generation + 'text'} width="50">조회수</td>
                            <td className={'postlist' + generation + 'text'} width="50">추천수</td>
                        </tr>
                    </thead>
                    <tbody>
                        {postlist.map((x, index) => {
                            return <BalancegameItem key={x.postId} post={x} generation={generation} onclickhandler={onClickwirtebtn} />;
                        })}
                    </tbody>
                </table>
            }
            <div className='postmiddle'>
                <div>
                    <button className={'pagebtn' + generation} onClick={() => {
                        if (currentindex > 0) setCurrentindex(currentindex - 1);
                    }}>
                        ◁
                    </button>
                    {[...Array(parseInt(totalpage))].map((n, index) => {
                        return <button key={index} className={curruntpage === index + 1 ? 'pagebtnselect' + generation : 'pagebtn' + generation} onClick={() => setCurruntpage(index + 1)}> {index + 1} </button>
                    })}
                    <button className={'pagebtn' + generation} onClick={() => {
                        if (currentindex < totalpage - 1) setCurrentindex(currentindex + 1);
                    }}>
                        ▷
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Balancegamelist;