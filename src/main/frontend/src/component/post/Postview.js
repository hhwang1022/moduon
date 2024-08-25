import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Postview.css';
import Reply from './Postreply';
import Balancegame_commentlist from '../currentvote/Balancegame_commentlist';
import Postreply from './Postreply';
import Balancegame_commentlistItem from '../currentvote/Balancegame_commentlistItem';


  const Postview = ({generation, postid}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [view, setView] = useState('');
    const [likeCount, setLikeCount] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [postReplyList, setPostReplyList] = useState([]);
    const [nickname, setNickname] = useState('');
    const [searchkeyword, setsearchkeyword] = useState('');
    const [commentListUpdated, setCommentListUpdated] = useState(false);
    const [isLike, setIsLike] = useState(false);

  
    let accessToken = window.localStorage.getItem('accessToken');

    const fetchPostData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/posts/' + postid, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = response.data.data;
        setTitle(data.title);
        setBody(data.body);
        setView(data.view);
        setLikeCount(data.likeCount);
        setCreatedAt(data.createdAt.slice(0, 10));
        setImage1(data.image1);
        setImage2(data.image2);
        setImage3(data.image3);
        setImage4(data.image4);
        setImage5(data.image5);
        setPostReplyList(data.postReplyList);
        setNickname(data.nickname);
  
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    useEffect(() => {
      fetchPostData();
      fetchPostLike();
    }, [accessToken, generation]);

  const handlePostReply = async () => {
    try {
        const response = await axios.post(
        'http://127.0.0.1:8080/posts/' + postid + '/reply',
        {
            body:searchkeyword
        },
        {   

            'Content-Type': 'application/json',
            headers:{
            Authorization: `Bearer ${accessToken}`,
             },

        });
        setsearchkeyword('');
        setCommentListUpdated(true);
        } catch (error) {
          console.error("Error posting reply:", error);
            alert(JSON.stringify(error.message));
            console.log(error.response.data);
    }
  };


  const handlePostLike = async () => {
    try {
        const response = await axios.post(
        'http://127.0.0.1:8080/posts/' + postid + '/like',
        {},
        {   
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${accessToken}`,
             },
        });
        setIsLike(!isLike);
        } catch (error) {
            alert(JSON.stringify(error.message));
            console.log(error.response.data);
    }
  };

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    fetchPostData()
  }, [commentListUpdated]);

  useEffect(() => {
      const scrollableDiv = scrollableDivRef.current;
      if (scrollableDiv) {
          scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
      }
  }, [postReplyList]);

  useEffect(() => {
      if(commentListUpdated) {
          setCommentListUpdated(false);
      }
  }, [commentListUpdated])

  const fetchPostLike = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/posts/' + postid + '/like', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    
      if(response.data.data.isLike){
        setIsLike(true);
      }
      else{
        setIsLike(false);
      }

    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className={'post-view-container' + generation}>
      <div className={'post-view-header' + generation}>
      <button className='post-like' onClick={handlePostLike}>{isLike ? '추천취소' : '추천하기'}</button>
        <button className='post-update'>수정</button>
        <button className='post-delete'>삭제</button>
      </div>
      <div className='post-info-box'>
        <div className='post-title'>{title}</div>
        <div className={'post-info' + generation}>
          <div className='post-nickname-box'>
            <div className='post-nickname-word'>닉네임: </div>
            <div className='post-nickname'>{nickname}</div>
          </div>
          <div className='post-created-at-box'>
            <div className='post-created-at-word'>작성일: </div>
            <div className='post-created-at'>{createdAt}</div>
          </div>
          <div className='post-views-box'>
            <div className='post-views-word'>조회수 : </div>
            <div className='post-views'>{view}</div>
          </div>
          <div className='post-likes-box'>
            <div className='post-likes-word'>추천수 : </div>
            <div className='post-likes'>{likeCount}</div>
          </div>
        </div>
      </div>
      <div className='post-contents-box'>
        <img src={image1}></img>
        <img src={image2}></img>
        <img src={image3}></img>
        <img src={image4}></img>
        <img src={image5}></img>
        <div className='post-contents'>{body}</div>
      </div>
      <div className='post-comments-box'>
        <div id='scrollableDiv' ref={scrollableDivRef}  className='post-comment'>
          {postReplyList.map((x, index) => (
            <Balancegame_commentlistItem key={index} comment={x} generation={generation}/>
        ))}</div>
        <div className='post-comment-form'>
          <textarea className='post-comment-box'  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
          <button className='post-comment-submit' onClick={handlePostReply}>등록</button>
        </div>
      </div>
    </div>

  );
};

export default Postview;
