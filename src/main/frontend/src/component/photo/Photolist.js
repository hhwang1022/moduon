import './Photolist.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Photolistitem from './Photolistitem';

const Photolist = ({ generation, onClickwirtebtn }) => {

    const [photolist, setPhotolist] = useState([]);
    const [currentindex, setcurrentindex] = useState(0);
    const [searchkeyword, setsearchkeyword] = useState('');
    const [totalpage, settotalpage] = useState(10);
    const [curruntpage, setcurruntpage] = useState(1);
    const [sorttype, setsorttype] = useState('photoId_desc');
    const [isSearching, setIsSearching] = useState(false);

    /*1020일 땐 보이는 갯수 9개 아닐 땐 9개*/
    let size = generation === "1020" ? 9 : 8;

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

        const fetchPhotos = async () => {
            try {
                const category = getCategoryByGeneration(generation);
                const response = await axios.get('http://127.0.0.1:8080/photos?'
                + 'page=' + curruntpage + '&size=' + size + '&sort=' + sorttype + '&category=' + category, {
                headers: { Authorization: `Bearer ${accessToken}` }
                }).then (function (response) {
                            if (response !== undefined) {
                                    setPhotolist(response.data.data);
                                    settotalpage(response.data.pageInfo.totalPages);
                            }
                });

            } catch (error) {
                console.error("Error fetching photos", error);
            }
        };

        const searchPhotos = async () => {
            try {
                const category = getCategoryByGeneration(generation);
                const response = await axios.get('http://127.0.0.1:8080/photos/search?'
                + 'page=' + curruntpage + '&size=' + 10 + '&category=' + category + '&keyword=' + searchkeyword, {
                headers: { Authorization: `Bearer ${accessToken}` }
                }).then (function (response) {
                            if (response !== undefined) {
                                    setPhotolist(response.data.data);
                                    settotalpage(response.data.pageInfo.totalPages);
                            }
                });
            } catch (error) {
                console.error ("Error searching photos with keyword: ", error );
            } finally {
                setIsSearching(false);
            }
        };

    useEffect(() => {
        if (isSearching) {
            searchPhotos();
        } else {
        fetchPhotos();
        }
    }, [sorttype, curruntpage, generation, searchkeyword]);

    const handlesSearchClick = () => {
        searchPhotos();
    }

    const handlePageChange = (pageNumber) => {
        setcurruntpage(pageNumber);
        if (isSearching) {
            searchPhotos();
        } else {
            fetchPhotos();
        }
    };


    return (<div className={'photolist' + generation + 'mainbox'}>
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
                <button className={'postpagebtn' + generation} onClick={handlesSearchClick}>검색</button>
            </div>
        </div>
    </div>);
};

export default Photolist;
