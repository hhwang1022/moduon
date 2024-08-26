import './Postlist.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PostlistItem from './PostlistItem';
import Postwrite from './Postwrite';
import Loading from '../Loading';

const Postlist = ({ generation , onClickwirtebtn, onClickreadbtn}) => {

    const [postlist, setPostlist] = useState([]);
    const [currentindex, setcurrentindex] = useState(0);
    const [searchkeyword, setsearchkeyword] = useState('');
    const [totalpage, settotalpage] = useState(10);
    const [curruntpage, setcurruntpage] = useState(1);
    const [sorttype, setsorttype] = useState('postId_desc');
    const [isSearching, setIsSearching] = useState(false);
    const [isloading, setisloading] = useState(true);

      let accessToken = window.localStorage.getItem('accessToken');

    const getCategoryByGeneration = (generation) => {
            switch (generation) {
                case "8090":
                    return "CATEGORY_8090";
                case "9000":
                    return "CATEGORY_9000";
                case "0010":
                    return "CATEGORY_0010";
                case "1020":
                    return "CATEGORY_1020";
                default:
                    return "CATEGORY_1020";  // 기본값 설정
            }
        };

    const fetchPosts = async () => {
        try {
            const category = getCategoryByGeneration(generation);
            const response = await axios.get(process.env.REACT_APP_API_URL + 'posts?'
            + 'page=' + curruntpage + '&size='  + 10 + '&sort=' + sorttype + '&category='  +category, {
            headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (response !== undefined) {
                setPostlist(response.data.data);
                settotalpage(response.data.pageInfo.totalPages);
                }

                setisloading(false);

            } catch (error) {
                console.error("Error fetching posts: ", error);
                setisloading(false);
            }
        };

        const searchPosts = async () => {
            try {
                const category = getCategoryByGeneration(generation);
                console.log("Searching with keyword: ",  searchkeyword);
                const response = await axios.get(process.env.REACT_APP_API_URL + 'posts/search?'
                +'page=' + curruntpage + '&size=' + 10 + '&category=' + category
                + '&keyword=' + searchkeyword, {
                headers: { Authorization: `Bearer ${accessToken}` }
                });

                if (response !== undefined) {
                    setPostlist(response.data.data);
                    settotalpage(response.data.pageInfo.totalPages);
                    }

                    setisloading(false);

            } catch (error) {
                console.error("Error searching posts with keyword: ", error);
                setisloading(false);

            } finally {
                setIsSearching(false);
            }
        };

    useEffect(() => {
       if (isSearching) {
            searchPosts();
            setisloading(true);

       } else {
            fetchPosts();
            setisloading(true);
       }
    }, [sorttype, curruntpage, generation, searchkeyword]);


    const handleSearchClick = () => {
        searchPosts();
    };

    const handlePageChange = (pageNumber) => {
        setcurruntpage(pageNumber);
        if (isSearching) {
            searchPosts();
        } else {
            fetchPosts();
        }
    };




    return (
    !isloading ?
    <div className={'postlist' + generation + 'mainbox'}>
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
            console.log("onClickreadbtn : " + x);
            return <PostlistItem post={x} generation={generation}  onclickhandler={() => {onClickreadbtn(x)}} />
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
                    console.log(x.postId);
                    return <PostlistItem post={x} generation={generation}  onclickhandler={() => {onClickreadbtn(x.postId)}} />
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
                <button className={'postpagebtn' + generation} onClick={handleSearchClick}>검색</button>
            </div>
        </div>
    </div> : <div className={'postlist' + generation + 'mainbox'}> <Loading generation={generation}/> </div>
    );
};

export default Postlist;