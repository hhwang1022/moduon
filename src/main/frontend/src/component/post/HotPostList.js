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
                const response = await axios.get(process.env.REACT_APP_API_URL + 'posts/popular?' + 'page=' + 1 + '&size=' + 6, {
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
           if(generation === post.category.replace('CATEGORY_', '')){
            navigate('/main_' + post.category.replace('CATEGORY_', '')  + '/post/view/' + post.postId);
            window.location.reload();
           }
           else{
            navigate('/main_' + post.category.replace('CATEGORY_', '')  + '/post/view/' + post.postId);
           }
        }


    return (
        <div>
            <div className={'hotpostlist' + generation + 'title'}>인기글</div>
            {postlist.map((post, index) => {
                return <div key={index} className={'hotpostlist' + generation + 'item'}>
                <button key={index} onClick={() => handlePostClick(post)}>
                {"[" + post.category.replace('CATEGORY_', '') +"] " + post.title}</button></div>
            })}
        </div>
    );
};

export default HotPostList;
