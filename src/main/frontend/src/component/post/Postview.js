import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import './Postview.css';
import Reply from './Postreply';
import Balancegame_commentlist from '../currentvote/Balancegame_commentlist';
import Postreply from './Postreply';
import Balancegame_commentlistItem from '../currentvote/Balancegame_commentlistItem';
import PostUpdate from './PostUpdate';
import Loading from '../Loading';


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
    const [isloading, setisloading] = useState(true);

    const navigate = useNavigate();
  
    let accessToken = window.localStorage.getItem('accessToken');

    const fetchPostData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + 'posts/' + postid, {
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
        setisloading(false);
  
      } catch (error) {
        console.error("Error fetching data: ", error);
        setisloading(false);
      }
    };
  
    useEffect(() => {
      fetchPostData();
      fetchPostLike();
    }, [accessToken, generation]);

  const handlePostReply = async () => {
    try {
        const response = await axios.post(
       process.env.REACT_APP_API_URL + 'posts/' + postid + '/reply',
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
        process.env.REACT_APP_API_URL + 'posts/' + postid + '/like',
        {},
        {   
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${accessToken}`,
             },
        });
        setLikeCount(isLike ? likeCount - 1 : likeCount + 1);
        setIsLike(!isLike);
        setisloading(false);
        } catch (error) {
            alert(JSON.stringify(error.message));
            console.log(error.response.data);
            setisloading(false);
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

  const fetchPostLike = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'posts/' + postid + '/like', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    
      if(response.data.data.isLike){
        setIsLike(true);
      }
      else{
        setIsLike(false);
      }

    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };


  const handlePostDelete = async () => {
    try{
      const response = await axios.delete(process.env.REACT_APP_API_URL + 'posts/' + postid, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      navigate(`/main_${generation}/post`);
      console.log(generation);
      alert("게시물 삭제 완료!");
    }
    catch (error){
      alert(JSON.stringify(error.message));
    }
  };


  const handlePostUpdate = () => {
    navigate('../update/:' + postid);
  }

  const handleDeleteReply = async (isDeleted,replyId) => {
    if (!isDeleted) return;
    try {
      const response = await axios.delete(
        process.env.REACT_APP_API_URL + 'posts/' + postid + '/reply/' + replyId,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      setCommentListUpdated(true);
    } catch (error) {
      console.error("comment delete: ", error);
    }
}

useEffect(() => {
  if(commentListUpdated) {
      setCommentListUpdated(false);
  }
}, [commentListUpdated])

const handUpdateReply = async (isUpdate, replyId) => {
  if (!isUpdate) return;
  try {
    const response = await  axios.patch(
      process.env.REACT_APP_API_URL + 'posts/' + postid + '/reply/' + replyId,
      {
        body: searchkeyword
      } ,
      {   'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${accessToken}`,
        },
      });
    setCommentListUpdated(true);
  } catch (error) {
    console.error("comment update: ", error);
  }
}

  return (
  !isloading ?
    <div className={'post-view-container' + generation}>
      <div className={'post-view-header' + generation}>
      <button className='post-like' onClick={handlePostLike}>{isLike ? '추천취소' : '추천하기'}</button>
        <button className='post-update' onClick={handlePostUpdate}>수정</button>
        <button className='post-delete' onClick={handlePostDelete}>삭제</button>
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
            <Balancegame_commentlistItem key={index} comment={x} generation={generation}
            onPostReplyDeleted={handleDeleteReply} username={nickname} onPostReplyUpdate={handUpdateReply}></Balancegame_commentlistItem>
        ))}</div>
        <div className='post-comment-form'>
          <textarea className='post-comment-box'  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
          <button className='post-comment-submit' onClick={handlePostReply}>등록</button>
        </div>
      </div>
    </div> : <div className={'post-view-container' + generation}><Loading generation={generation}/> </div>
  );
};

export default Postview;
