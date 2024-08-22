import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PostlistItem from '../post/PostlistItem';

const Balancegamelist = ({ generation , onClickwirtebtn }) => {

    const [postlist, setPostlist] = useState([]);
    const [currentindex, setcurrentindex] = useState(0);
    const [totalpage, settotalpage] = useState(10);
    const [curruntpage, setcurruntpage] = useState(1);
    const [sorttype, setsorttype] = useState('postId_desc');

      let accessToken = window.localStorage.getItem('accessToken');

    const fetchPosts = async () => {
        try {
            console.log(generation);
            const response = await axios.get('http://127.0.0.1:8080/balancegames/end?'
            + 'page=' + curruntpage + '&size='  + 10 + '&generation=' + generation, 
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }).then(function (response) {
                      if (response !== undefined) {
                        console.log("Response Data:", response.data);
                                            setPostlist(response.data.data);
                                            settotalpage(response.data.pageInfo.totalPages);
                      }
                    });

            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        };

        useEffect(() => {
            fetchPosts();
         }, [sorttype, curruntpage, generation]);

    const handlePageChange = (pageNumber) => {
        setcurruntpage(pageNumber);
        fetchPosts();
    };




    return (<div className={'postlist' + generation + 'mainbox'}>
        <div className='right'>
            <select className={'postlistselect' + generation} onChange={(e) => {
                setsorttype(e.target.value);
            }}>
                <option className={"postlistselectitem" + generation} value="postId_desc">새글 순</option>
                <option className={"postlistselectitem" + generation} value="postId_asc">오래된글 순</option>
                <option className={"postlistselectitem" + generation} value="view_desc">조회수 많은 순</option>
                <option className={"postlistselectitem" + generation} value="view_asc">조회수 적은 순</option>
                <option className={"postlistselectitem" + generation} value="likeCount_desc">좋아요 많은 순</option>
                <option className={"postlistselectitem" + generation} value="likeCount_asc">좋아요 적은 순</option>
            </select>
            <button className={"postpagewritebtn"+generation}
            onClick={onClickwirtebtn}>글쓰기</button>
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
            
        </div>
    </div>);
};

export default Balancegamelist;