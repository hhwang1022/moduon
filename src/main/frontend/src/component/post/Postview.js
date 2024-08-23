import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Postview.css';
import Reply from './Postreply';
import Balancegame_commentlist from '../currentvote/Balancegame_commentlist';


  const Postview = ({generation}) => {
    const [post, setPost] = useState(null);
    const [searchkeyword, setsearchkeyword] = useState('');
    const { postId } = useParams();


    useEffect(() => {

      console.log("Postview : " + postId);
        const fetchPost = async () => {
            try {
               let accessToken = window.localStorage.getItem('accessToken');
               const response = await axios.get('http://127.0.0.1:8080/posts/' + postId, {
                     headers: { Authorization: `Bearer ${accessToken}` }
               });

               setPost(response.data);
            } catch (error) {
                console.error("Error fetching post: ", error);
            }
        }

        fetchPost();
    }, [postId]);

      if (!post) {
        return <div>로딩 중...</div>;
      }

  return (
    <div className='post-view-container'>
      <div className='post-view-header'>
        <button className='post-update'>수정</button>
        <button className='post-update'>삭제</button>
      </div>
      <div className='post-info-box'>
        <div className='post-title'>{post.title}</div>
        <div className='post-info'>
          <div className='post-nickname-box'>
            <div className='post-nickname-word'>닉네임: </div>
            <div className='post-nickname'>{post.nickname}</div>
          </div>
          <div className='post-created-at-box'>
            <div className='post-created-at-word'>작성일: </div>
            <div className='post-created-at'>{post.createdAt}</div>
          </div>
          <div className='post-likes-box'>
            <div className='post-likes-word'>추천수 : </div>
            <div className='post-likes'>{post.likeCount}</div>
          </div>
        </div>
      </div>
      <div className='post-contents'>{post.body}</div>
      <div className='post-comments-box'>
        <div className='post-comment'><Balancegame_commentlist generation={generation}/></div>
        <div className='post-comment-form'>
          <textarea className='post-comment-box'  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
          <button className='post-comment-submit' onClick={() => {}}>등록</button>
        </div>
      </div>
    </div>

  );
};

export default Postview;
