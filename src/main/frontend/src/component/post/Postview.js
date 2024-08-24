import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Postview.css';
import Reply from './Postreply';
import Balancegame_commentlist from '../currentvote/Balancegame_commentlist';
import Postreply from './Postreply';

// const Postview = ({postid}) => {

//   const [qnalike, setqnalike] = useState(0);
//   const [qnaislike, setqnaislike] = useState(0);
//   const [qnalock, setqnalock] = useState(0);
//   const [qnareplyBody, setQnareplyBody] = useState('');
//   const [qnareply, setQnareply] = useState('');
//   const [qna, setQna] = useState('');

//   let accessToken = window.localStorage.getItem('accessToken');
//   const qnaId = useParams().qnaId;
//   const navigate = useNavigate();

//   const handleGetPost = async () => {

//   };

//   useEffect(() => {
//     handleGetPost();
//   }, []);

//   useEffect(() => {
//     if(qna !== undefined){
//       setqnalike(qna.like ? qna.like : 0);
//       setqnaislike(qna.isLike ? qna.isLike : 0);
//       setqnalock(qna.lock ? qna.lock : 0);
//     }
//   }, [qna]);

//   const parsedDate = (day) =>
//     (
//       new Date(qna.createdAt).toLocaleDateString('ko-kr')
//     );

//   const handleLikeQna = async () => {
//     accessToken = window.localStorage.getItem('accessToken');
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8080/v11/board/qna/like/` + qna.qnaId,
//         {
          
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if(qna.isLike === 1){
//         qna.isLike = 0;
//         qna.like -= 1;
//         setqnaislike(0);
//         setqnalike(qnaislike - 1);
//       }
//       else{
//         qna.isLike = 1;
//         qna.like += 1;
//         setqnaislike(1);
//         setqnalike(qnaislike + 1);
//       }
//     } catch (error) {
//       alert(JSON.stringify(error.message));
//     }
//   };

//   const handleReply = async () => {
//     accessToken = window.localStorage.getItem('accessToken');
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8080/v11/board/qna/reply/` + qna.qnaId,
//         {
//           "body":qnareplyBody
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       qna.reply = qnareplyBody;
//       setQnareply(qnareplyBody);
//     } catch (error) {
//       alert(JSON.stringify(error.message));
//     }
//   };

//   return qna !== undefined ? <div className="postbox" id={qna.lock}>
//       <div className="title boldtext">{'title ' + qna.title}{qnalock === 1 ? '🔒' : ''}</div><br/>
//       <div >
//         <div >
//           <div >
//             <span >{qna.memberName}</span>
//             <span >{parsedDate(qna.createdAt)}</span>
//             <span className="right_"> <button className="likebtn" onClick={handleLikeQna}>{qnaislike === 1 ? '❤️' : '🖤'}{qnalike}</button> {'\t' + '👁️  ' + qna.view} </span> 
//             </div>
//         </div>
//         <div >
//         <div className="body">{'body  ' + qna.body}</div><br/>
//         <button className="btn-1 custom-mini-btn" onClick={() => {
//           navigate('/modify/' + qna.qnaId);
//         }}>수정</button>
//         <button className="btn-1 custom-mini-btn" onClick={() => {
//           navigate('/modify/' + qna.qnaId);
//         }}>삭제</button>
//         <button className="btn-1 custom-mini-btn" onClick={() => {
//           navigate('/modify/' + qna.qnaId);
//         }}>목록</button>
//         {qnareply !== '' || qna.reply ? <div></div> : <input className="replyinput" value={qnareplyBody} onChange={(e) => setQnareplyBody(e.target.value)} />}
//         {qnareply !== '' || qna.reply  ? <div></div> : <button className="btn-1 custom-btn" onClick={handleReply} >Reply</button>}
//         {qnareply !== '' || qna.reply  ? <Reply reply = {qna.reply}></Reply> : <div></div>}
//         </div>
//       </div>
//     </div> : <></>;
//   };

//   export default Postview;

  const Postview = ({generation, postId}) => {
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
    const [postReplyList, setPostReplyList] = useState('[]');
    const [nickname, setNickname] = useState('');
    const [searchkeyword, setsearchkeyword] = useState('');
    const [commentListUpdated, setCommentListUpdated] = useState(false);
    const [isLike, setIsLike] = useState(false);

  
    let accessToken = window.localStorage.getItem('accessToken');

  useEffect(() => {
  const fetchData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8080/posts/' + postId, {
        headers: { Authorization: `Bearer ${accessToken}` }
        });

        const data = response.data.data;
        console.log(data.createdAt);
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

fetchData();
}, [accessToken, generation]);

  const handlePostReply = async () => {
    try {
        const response = await axios.post(
        'http://127.0.0.1:8080/posts/' + postId + '/reply',
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
        } catch (error) {
          console.error("Error posting reply:", error);
            alert(JSON.stringify(error.message));
    }
  };

  const handlePostLike = async () => {
    try {
        const response = await axios.post(
        'http://127.0.0.1:8080/posts/' + postId + '/like',
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
    }
  };



  return (
    <div className='post-view-container'>
      <div className='post-view-header'>
      <button className='post-like' onClick={handlePostLike}>{isLike ? '추천취소' : '추천하기'}</button>
        <button className='post-update'>수정</button>
        <button className='post-delete'>삭제</button>
      </div>
      <div className='post-info-box'>
        <div className='post-title'>{title}</div>
        <div className='post-info'>
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
      <div className='post-contents'>{body}</div>
      <div className='post-comments-box'>
        <div className='post-comment'>{postReplyList}</div>
        <div className='post-comment-form'>
          <textarea className='post-comment-box'  value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)}></textarea>
          <button className='post-comment-submit' onClick={handlePostReply}>등록</button>
        </div>
      </div>
    </div>

  );
};

export default Postview;
