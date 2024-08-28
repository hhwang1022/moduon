import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, navigate } from 'react-router-dom';
import axios from 'axios';
import './Photoview.css';
import Reply from './Photoreply';
import Balancegame_commentlistItem from '../currentvote/Balancegame_commentlistItem';
import Loading from '../Loading';
import memberInfo from "../../MemberInfo";

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
  const [isloading, setisloading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(memberInfo.getMemberInfo().login);
  const [currentUserNickname, setCurrentUserNickname] = useState('');

  const navigate = useNavigate();


  let accessToken = window.localStorage.getItem('accessToken');
  let info = memberInfo.getMemberInfo();

  const fetchPhotoData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'photos/' + photoid, {
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
      setisloading(false);

    } catch (error) {
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      setisloading(false);
    }
  };

  useEffect(() => {
    fetchPhotoData();
    fetchPhotoLike();
  }, [accessToken, generation]);

const handlePhotoReply = async () => {
  try {
      const response = await axios.post(
      process.env.REACT_APP_API_URL + 'photos/' + photoid + '/reply',
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
          if (info.name === "홍길동") {
            alert("로그인 해주세요.");
          } else {
            if(info.generation === "8090" && generation === "0010") {
               alert("8090세대는 8090과 9000 카테고리만 글쓰기가 가능합니다.");
             } else if (info.generation === "0010" && generation === "8090") {
                alert("0010세대는 9000과 0010 카테고리만 글쓰기가 가능합니다.");
             } else {
                alert("내용을 입력해주세요.")
             }
             setisloading(false);
          }
  }
};

const handlePhotoLike = async () => {
  try {
      const response = await axios.post(
      process.env.REACT_APP_API_URL + 'photos/' + photoid + '/like',
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
          alert("로그인 해주세요");
          setisloading(false);
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
    const response = await axios.get(process.env.REACT_APP_API_URL + 'photos/' + photoid + '/like', {
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

const handlePhotoDelete = async () => {
  try{
    const response = await axios.delete(process.env.REACT_APP_API_URL + 'photos/' + photoid, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    navigate(`/main_${generation}/photo`);
    alert("게시물 삭제 완료!");
  }
  catch (error){
    alert("게시물 삭제에 실패했습니다.");
  }
};

const handlePhotoUpdate = () => {
  navigate('../update/:' + photoid);
}

  useEffect(() => {
    if(commentListUpdated) {
      setCommentListUpdated(false);
    }
  }, [commentListUpdated])

  const handleDeletePhotoReply = async (isDeleted,commentId) => {
    if (!isDeleted) return;
    try {
      const response = await axios.delete(
        process.env.REACT_APP_API_URL + 'photos/' + photoid + '/reply/' + commentId,
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

  const handleUpdatePhotoReply = async (isUpdate, commentId) => {
    if (!isUpdate) return;
    try {
      const response = await  axios.patch(
        process.env.REACT_APP_API_URL + 'photos/' + photoid + '/reply/' + commentId,
        {
          body: searchkeyword
        } ,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      setCommentListUpdated(true);
      
    } catch (error) {
      if (searchkeyword === '') {
        alert("수정 내용을 입력해주세요");
        return;
      }
      if (searchkeyword.length > 255) {
        alert("댓글은 최대 255자까지 입력하실 수 있습니다.");
      }
    }
  }

  useEffect(() => {
    const handleInfoUpdate = (updatedInfo) => {
      setIsLoggedIn(updatedInfo.login);
      setCurrentUserNickname(memberInfo._name);

      if (!updatedInfo.login) {
        setTimeout(() => {
          setPhotoReplyList([]);  // 로그아웃 시 댓글 리스트 초기화
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

    const renderAdminButton = () => {
        if(memberInfo._name === nickname) {
            return (
                <>
                  <button className='photo-update' onClick={handlePhotoUpdate}>수정</button>
                  <button className='photo-delete' onClick={handlePhotoDelete}>삭제</button>
                </>
            );
        }
        return null;
    };


return (
!isloading ?
  <div className={'photo-view-container' + generation}>
    <div className={'photo-view-header' + generation}>
    {renderAdminButton()}
    <button
      className='photo-like'
      onClick={handlePhotoLike}
      style={{ color: isLike ? 'red' : 'blue' }}
  >
      {isLike ? '추천취소' : '추천하기'}
    </button>
    </div>
    <div className='photo-info-box'>
      <div className={'photo-title' + generation}>{title}</div>
      <div className={'photo-info' + generation}>
        <div className={'photo-nickname-box' + generation}>
          <div className='photo-nickname-word'>닉네임: </div>
          <div className='photo-nickname'>{nickname}</div>
        </div>
        <div className={'photo-created-at-box' + generation}>
          <div className='photo-created-at-word'>작성일: </div>
          <div className='photo-created-at'>{createdAt}</div>
        </div>
        <div className={'photo-views-box' + generation}>
          <div className='photo-views-word'>조회수 : </div>
          <div className='photo-views'>{view}</div>
        </div>
        <div className={'photo-likes-box' + generation}>
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
      <div className={'photo-contents' + generation}>{body}</div>
    </div>
    <div className='photo-comments-box'>
      <div id='scrollableDiv' ref={scrollableDivRef}  className='photo-comment'>
        {photoReplyList.map((x, index) => (
          <Balancegame_commentlistItem key={index} comment={x} generation={generation}
                                       onDeleted={handleDeletePhotoReply} username={nickname} onUpdate={handleUpdatePhotoReply} isLoggedIn={isLoggedIn} />
      ))}</div>
      <div className='photo-comment-form'>
        <textarea className={'photo-comment-box' + generation}  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
        <button className='photo-comment-submit' onClick={handlePhotoReply}>등록</button>
      </div>
    </div>
  </div> : <div className={'photo-view-container' + generation}><Loading generation={generation}/> </div>

  );
};

export default Photoview;
