import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, navigate } from 'react-router-dom';
import axios from 'axios';
import './Photoview.css';
import Reply from './Photoreply';
import Balancegame_commentlistItem from '../currentvote/Balancegame_commentlistItem';

const Photoview = ({generation, photoid}) => {
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
  const [photoReplyList, setPhotoReplyList] = useState([]);
  const [nickname, setNickname] = useState('');
  const [searchkeyword, setsearchkeyword] = useState('');
  const [commentListUpdated, setCommentListUpdated] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const navigate = useNavigate();


  let accessToken = window.localStorage.getItem('accessToken');

  const fetchPhotoData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/photos/' + photoid, {
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
      setPhotoReplyList(data.photoReplyList);
      setNickname(data.nickname);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchPhotoData();
    fetchPhotoLike();
  }, [accessToken, generation]);

const handlePhotoReply = async () => {
  try {
      const response = await axios.post(
      'http://127.0.0.1:8080/photos/' + photoid + '/reply',
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
          alert(JSON.stringify(error.message));
          console.log(error.response.data);
  }
};


const handlePhotoLike = async () => {
  try {
      const response = await axios.post(
      'http://127.0.0.1:8080/photos/' + photoid + '/like',
      {},
      {   
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${accessToken}`,
           },
      });
      setLikeCount(isLike ? likeCount - 1 : likeCount + 1);
      setIsLike(!isLike);
      } catch (error) {
          alert(JSON.stringify(error.message));
          console.log(error.response.data);
  }
};

const scrollableDivRef = useRef(null);

useEffect(() => {
  fetchPhotoData()
}, [commentListUpdated]);

useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
}, [photoReplyList]);

useEffect(() => {
    if(commentListUpdated) {
        setCommentListUpdated(false);
    }
}, [commentListUpdated])

const fetchPhotoLike = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8080/photos/' + photoid + '/like', {
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

const handlePhotoDelete = async () => {
  try{
    const response = await axios.delete('http://127.0.0.1:8080/photos/' + photoid, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    navigate(`/main_${generation}/photo`);
    alert("게시물 삭제 완료!");
  }
  catch (error){
    alert(JSON.stringify(error.message));
  }
};

const handlePhotoUpdate = () => {
  navigate('../update/:' + photoid);
}

return (
  <div className={'photo-view-container' + generation}>
    <div className={'photo-view-header' + generation}>
    <button className='photo-like' onClick={handlePhotoLike}>{isLike ? '추천취소' : '추천하기'}</button>
      <button className='photo-update' onClick={handlePhotoUpdate}>수정</button>
      <button className='photo-delete' onClick={handlePhotoDelete}>삭제</button>
    </div>
    <div className='photo-info-box'>
      <div className='photo-title'>{title}</div>
      <div className={'photo-info' + generation}>
        <div className='photo-nickname-box'>
          <div className='photo-nickname-word'>닉네임: </div>
          <div className='photo-nickname'>{nickname}</div>
        </div>
        <div className='photo-created-at-box'>
          <div className='photo-created-at-word'>작성일: </div>
          <div className='photo-created-at'>{createdAt}</div>
        </div>
        <div className='photo-views-box'>
          <div className='photo-views-word'>조회수 : </div>
          <div className='photo-views'>{view}</div>
        </div>
        <div className='photo-likes-box'>
          <div className='photo-likes-word'>추천수 : </div>
          <div className='photo-likes'>{likeCount}</div>
        </div>
      </div>
    </div>
    <div className='photo-contents-box'>
      <img src={image1}></img>
      <img src={image2}></img>
      <img src={image3}></img>
      <img src={image4}></img>
      <img src={image5}></img>
      <div className='photo-contents'>{body}</div>
    </div>
    <div className='photo-comments-box'>
      <div id='scrollableDiv' ref={scrollableDivRef}  className='photo-comment'>
        {photoReplyList.map((x, index) => (
          <Balancegame_commentlistItem key={index} comment={x} generation={generation}/>
      ))}</div>
      <div className='photo-comment-form'>
        <textarea className='photo-comment-box'  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
        <button className='photo-comment-submit' onClick={handlePhotoReply}>등록</button>
      </div>
    </div>
  </div>

  );
};

export default Photoview;
