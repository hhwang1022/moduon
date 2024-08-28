import './Photolist.css';
import '../post/Postlist.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Photolistitem from './Photolistitem';
import Loading from '../Loading';
import { useNavigate } from "react-router-dom";

const Photolist = ({ generation, onClickwirtebtn, onClickreadbtn }) => {

    const [photolist, setPhotolist] = useState([]);
    const [currentindex, setcurrentindex] = useState(0);
    const [searchkeyword, setsearchkeyword] = useState('');
    const [totalpage, settotalpage] = useState(10);
    const [curruntpage, setcurruntpage] = useState(1);
    const [sorttype, setsorttype] = useState('photoId_desc');
    const [isSearching, setIsSearching] = useState(false);
    const [isloading, setisloading] = useState(true);


    let accessToken = window.localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const getCategoryByGeneration = (generation) => {
            switch (generation) {
                case "8090":
                    return "CATEGORY_8090";
                case "9000":
                    return "CATEGORY_9000";
                case "0010":
                    return "CATEGORY_0010";
                default:
                    return "CATEGORY_00 v10";  // 기본값 설정
            }
        };

        const fetchPhotos = async () => {
            try {
                const category = getCategoryByGeneration(generation);
                const response = await axios.get(process.env.REACT_APP_API_URL + 'photos?'
                + 'page=' + curruntpage + '&size=' + 8 + '&sort=' + sorttype + '&category=' + category, {
                headers: { Authorization: `Bearer ${accessToken}` }
                });
                if (response !== undefined) {
                    setPhotolist(response.data.data);
                    settotalpage(response.data.pageInfo.totalPages);
                  }
                      setisloading(false);
            } catch (error) {
                alert("게시글을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.");
                navigate('/');
                setisloading(false);
            }
        };

        const searchPhotos = async () => {
            try {
                const category = getCategoryByGeneration(generation);
                const response = await axios.get(process.env.REACT_APP_API_URL + 'photos/search?'
                + 'page=' + curruntpage + '&size=' + 10 + '&category=' + category + '&keyword=' + searchkeyword, {
                headers: { Authorization: `Bearer ${accessToken}` }
                });
                if (response !== undefined) {
                    setPhotolist(response.data.data);
                    settotalpage(response.data.pageInfo.totalPages);
                    }
                    setisloading(false);
            } catch (error) {
                alert("r키워드로 게시물을 검색하는 중 오류가 발생했습니다. 다시 시도해주세요.")
                setisloading(false);
            }
        };

    useEffect(() => {
        if (isSearching) {
            searchPhotos();
        } else {
        fetchPhotos();
       }
    }, [sorttype, curruntpage, generation]);

    const handlesSearchClick = () => {
        setIsSearching(true);
        setcurruntpage(1);
        searchPhotos();
    };

    const handlePageChange = (pageNumber) => {
        setcurruntpage(pageNumber);
        if (isSearching) {
            searchPhotos();
        } else {
            fetchPhotos();
        }
    };


    return (
    !isloading ?
    <div className={'postlist' + generation + 'mainbox'}>
        <div className='right'>
            <select className={"postlistselect" + generation} onChange={(e) => {
                setsorttype(e.target.value);
            }}>
                <option className={"postlistselectitem" + generation} value="photoId_desc">새글 순</option>
                <option className={"postlistselectitem" + generation} value="photoId_asc">오래된글 순</option>
                <option className={"postlistselectitem" + generation} value="view_desc">조회수 많은 순</option>
                <option className={"postlistselectitem" + generation} value="vies_asc">조회수 적은 순</option>
                <option className={"postlistselectitem" + generation} value="likeCount_desc">좋아요 많은 순</option>
                <option className={"postlistselectitem" + generation} value="likeCount_asc">좋아요 적은 순</option>
            </select>
            <button className={"postpagewritebtn" + generation}
            onClick={onClickwirtebtn}>글쓰기</button>
        </div>
        <div className={"photomainconent" + generation}>
            {photolist.map((x, index) => {
                return <Photolistitem key={index} post={x} generation={generation} onclickhandler={() => {onClickreadbtn(x.photoId)}} />
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
                    return <button key={index} className={curruntpage === index + 1 ? 'pagebtnselect' + generation : 'pagebtn' + generation} onClick={() => setcurruntpage(index + 1)}> {index + 1}  </button>
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
                <button className={'postpagebtn' + generation} onClick={handlesSearchClick}>검색</button>
            </div>
        </div>
    </div> : <div className={'photolist' + generation + 'mainbox'}> <Loading generation={generation}/> </div>
    );
};

export default Photolist;
