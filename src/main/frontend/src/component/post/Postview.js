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
import memberInfo from "../../MemberInfo";

  const Postview = ({generation}) => {
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
    const { postId } = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(memberInfo.getMemberInfo().login);

    const navigate = useNavigate();
  
    let accessToken = window.localStorage.getItem('accessToken');
    let info = memberInfo.getMemberInfo();

    const fetchPostData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + 'posts/' + postId, {
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
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
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
       process.env.REACT_APP_API_URL + 'posts/' + postId + '/reply',
        {
            body:searchkeyword
        },
        {'Content-Type': 'application/json',
            headers:{
            Authorization: `Bearer ${accessToken}`,
             },
        });
        setsearchkeyword('');
        setCommentListUpdated(true);

        } catch (error) {
            if (info.name === "홍길동") {
              alert("로그인 해주세요.");
            } else {
              alert("내용을 입력해주세요.")
            }
            setisloading(false);
    }
  };

  const handlePostLike = async () => {
    try {
        const response = await axios.post(
        process.env.REACT_APP_API_URL + 'posts/' + postId + '/like',
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
            alert("로그인 해주세요");
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

  useEffect(() => {
      if(commentListUpdated) {
          setCommentListUpdated(false);
      }
  }, [commentListUpdated])

  const fetchPostLike = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'posts/' + postId + '/like', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    
      if(response.data.data.isLike){
        setIsLike(true);
      }
      else{
        setIsLike(false);
      }

    } catch (error) {
      alert("좋아요 가져오기 실패했습니다.");
    }
  };

  const handlePostDelete = async () => {
    try{
      const response = await axios.delete(process.env.REACT_APP_API_URL + 'posts/' + postId, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      navigate(`/main_${generation}/post`);
    }
    catch (error){
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  const handlePostUpdate = () => {
    navigate('../update/:' + postId);
  }

useEffect(() => {
  if(commentListUpdated) {
      setCommentListUpdated(false);
  }
}, [commentListUpdated])

    const handleDeletePostReply = async (isDeleted,commentId) => {
      if (!isDeleted) return;
      try {
        const response = await axios.delete(
          process.env.REACT_APP_API_URL + 'posts/' + postId + '/reply/' + commentId,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          });
        setCommentListUpdated(true);
      } catch (error) {
        alert("투표 삭제 실패");
      }
    }

    const handUpdatePostReply = async (isUpdate, commentId) => {
      if (!isUpdate) return;
      try {
        const response = await  axios.patch(
          process.env.REACT_APP_API_URL + 'posts/' + postId + '/reply/' + commentId,
          {
            body: searchkeyword
          } ,
          {   'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${accessToken}`,
            },
          });
        setCommentListUpdated(true);
      } catch (error) {
        alert("투표 댓글 업데이트 실패");
      }
    }

    useEffect(() => {
      const handleInfoUpdate = (updatedInfo) => {
        setIsLoggedIn(updatedInfo.login);

        if (!updatedInfo.login) {
          setTimeout(() => {
            setPostReplyList([]);  // 로그아웃 시 댓글 리스트 초기화
            setCommentListUpdated(true);  // 상태 업데이트 및 강제 리렌더링
          }, 0);
        } else {
          setCommentListUpdated(true);
        }
      };

      memberInfo.subscribe(handleInfoUpdate);

      return () => {
        memberInfo.unsubscribe(handleInfoUpdate);
      };
    }, []);


  return (
  !isloading ?
    <div className={'post-view-container' + generation}>
      <div className={'post-view-header' + generation}>
      <button 
        className='post-like' 
        onClick={handlePostLike}
        style={{ color: isLike ? 'red' : 'blue' }}
      >
        {isLike ? '추천취소' : '추천하기'}
      </button>
        <button className='post-update' onClick={handlePostUpdate}>수정</button>
        <button className='post-delete' onClick={handlePostDelete}>삭제</button>
      </div>
      <div className='post-info-box'>
        <div className={'post-title' + generation}>{title}</div>
        <div className={'post-info' + generation}>
          <div className={'post-nickname-box' + generation}>
            <div className='post-nickname-word'>닉네임: </div>
            <div className='post-nickname'>{nickname}</div>
          </div>
          <div className={'post-created-at-box' + generation}>
            <div className='post-created-at-word'>작성일: </div>
            <div className='post-created-at'>{createdAt}</div>
          </div>
          <div className={'post-views-box' + generation}>
            <div className='post-views-word'>조회수 : </div>
            <div className='post-views'>{view}</div>
          </div>
          <div className={'post-likes-box' + generation}>
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
                                         onDeleted={handleDeletePostReply} username={nickname} onUpdate={handUpdatePostReply} isLoggedIn={isLoggedIn}></Balancegame_commentlistItem>
        ))}</div>
        <div className='post-comment-form'>
          <textarea className={'post-comment-box' + generation}  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
          <button className='post-comment-submit' onClick={handlePostReply}>등록</button>
        </div>
      </div>
    </div> : <div className={'post-view-container' + generation}><Loading generation={generation}/> </div>
  );
};

export default Postview;
