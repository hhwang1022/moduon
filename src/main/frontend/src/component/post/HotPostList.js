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
                }).then(function (response) {
                        if(response && response.data && response.data.data) {

                          //  console.log(response.data.data);

                            setpostlist(response.data.data);

                            //console.log(response.data.data[0].category);
                        }
                });
            } catch (error) {
                console.error("Error fetching hotPosts: ", error);
            }
        };

        const handlePostClick = (postId) => {
        console.log(postId);
        //todo - 게시글로 연결
           // navigate(`/posts/${postId}`);
           //navigate(`/`);
        }


    return (
        <div>
            <div className={'hotpostlist' + generation + 'title'}>인기글</div>
            {postlist.map((post, index) => {
                return <div className={'hotpostlist' + generation + 'item'}>
                <button onClick={() => handlePostClick(post.postId)}>
                {"[" + post.category.replace('CATEGORY_', '') +"] " + post.title}</button></div>
            })}
        </div>
    );
};

export default HotPostList;
