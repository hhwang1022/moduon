import './HotPostList.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const HotPostList = ({generation}) => {

    const [currentindex, setcurrentindex] = useState(0);
    const [sorttype, setsorttype] = useState('likeCount_desc');
    const [postlist, setpostlist] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchHotPosts();
      }, []);


     let accessToken = window.localStorage.getItem('accessToken');

        const fetchHotPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/posts/popular?' + 'page=' + 1 + '&size=' + 10, {
                 headers: { Authorization: `Bearer ${accessToken}` }
                });
                if(response && response.data && response.data.data) {
                    setpostlist(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching hotPosts: ", error);
            }
        };

        const handlePostClick = (post) => {
        //console.log(post);
        //todo - 게시글로 연결
           navigate('/main_' + post.category.replace('CATEGORY_', '')  + '/post/view/' + post.postId);
        }


    return (
        <div>
            <div className={'hotpostlist' + generation + 'title'}>인기글</div>
            {postlist.map((post, index) => {
                return <div className={'hotpostlist' + generation + 'item'}>
                <button onClick={() => handlePostClick(post)}>
                {"[" + post.category.replace('CATEGORY_', '') +"] " + post.title}</button></div>
            })}
        </div>
    );
};

export default HotPostList;
