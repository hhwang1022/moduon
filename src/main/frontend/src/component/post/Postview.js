import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Postview.css';
import Reply from './Postreply';

const Postview = ({postid}) => {

  const [qnalike, setqnalike] = useState(0);
  const [qnaislike, setqnaislike] = useState(0);
  const [qnalock, setqnalock] = useState(0);
  const [qnareplyBody, setQnareplyBody] = useState('');
  const [qnareply, setQnareply] = useState('');
  const [qna, setQna] = useState('');

  let accessToken = window.localStorage.getItem('accessToken');
  const qnaId = useParams().qnaId;
  const navigate = useNavigate();

  const handleGetPost = async () => {

  };

  useEffect(() => {
    handleGetPost();
  }, []);

  useEffect(() => {
    if(qna !== undefined){
      setqnalike(qna.like ? qna.like : 0);
      setqnaislike(qna.isLike ? qna.isLike : 0);
      setqnalock(qna.lock ? qna.lock : 0);
    }
  }, [qna]);

  const parsedDate = (day) =>
    (
      new Date(qna.createdAt).toLocaleDateString('ko-kr')
    );

  const handleLikeQna = async () => {
    accessToken = window.localStorage.getItem('accessToken');
    try {
      const response = await axios.post(
        `http://127.0.0.1:8080/v11/board/qna/like/` + qna.qnaId,
        {
          
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if(qna.isLike === 1){
        qna.isLike = 0;
        qna.like -= 1;
        setqnaislike(0);
        setqnalike(qnaislike - 1);
      }
      else{
        qna.isLike = 1;
        qna.like += 1;
        setqnaislike(1);
        setqnalike(qnaislike + 1);
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  const handleReply = async () => {
    accessToken = window.localStorage.getItem('accessToken');
    try {
      const response = await axios.post(
        `http://127.0.0.1:8080/v11/board/qna/reply/` + qna.qnaId,
        {
          "body":qnareplyBody
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      qna.reply = qnareplyBody;
      setQnareply(qnareplyBody);
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  return qna !== undefined ? <div className="postbox" id={qna.lock}>
      <div className="title boldtext">{'title ' + qna.title}{qnalock === 1 ? '🔒' : ''}</div><br/>
      <div >
        <div >
          <div >
            <span >{qna.memberName}</span>
            <span >{parsedDate(qna.createdAt)}</span>
            <span className="right_"> <button className="likebtn" onClick={handleLikeQna}>{qnaislike === 1 ? '❤️' : '🖤'}{qnalike}</button> {'\t' + '👁️  ' + qna.view} </span> 
            </div>
        </div>
        <div >
        <div className="body">{'body  ' + qna.body}</div><br/>
        <button className="btn-1 custom-mini-btn" onClick={() => {
          navigate('/modify/' + qna.qnaId);
        }}>수정</button>
        <button className="btn-1 custom-mini-btn" onClick={() => {
          navigate('/modify/' + qna.qnaId);
        }}>삭제</button>
        <button className="btn-1 custom-mini-btn" onClick={() => {
          navigate('/modify/' + qna.qnaId);
        }}>목록</button>
        {qnareply !== '' || qna.reply ? <div></div> : <input className="replyinput" value={qnareplyBody} onChange={(e) => setQnareplyBody(e.target.value)} />}
        {qnareply !== '' || qna.reply  ? <div></div> : <button className="btn-1 custom-btn" onClick={handleReply} >Reply</button>}
        {qnareply !== '' || qna.reply  ? <Reply reply = {qna.reply}></Reply> : <div></div>}
        </div>
      </div>
    </div> : <></>;
};

export default Postview;
