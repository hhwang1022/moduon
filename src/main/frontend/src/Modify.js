import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Modify = ({qna}) => {
  const [qnaTitle, setQnaTitle] = useState('');
  const [qnaBody, setQnaBody] = useState('');
  const [isLock, setIsLock] = useState(false);

  let accessToken = window.localStorage.getItem('accessToken');

  const navigate = useNavigate();

  const handleModifyQna = async () => {
    try {
      const response = await axios.patch(
        process.env.REACT_APP_API_URL + 'v11/board/qna/' + qna.qnaId ,
        {
          title: qnaTitle,
          body: qnaBody,
          lock: isLock ? 1 : 0
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert('질문 수정 성공!');
      if(response !== undefined)
        navigate('/');
    } catch (error) {
      alert(JSON.stringify(error.message));
      console.log(error.response.data);
    }
  };

  return (<div>
        <div>
            <label htmlFor="qnaTitle">제목</label>
            <input className='qnatitleinput' type="text" value={qnaTitle} onChange={(e) => setQnaTitle(e.target.value)} />
            <input type="checkbox" id="isLock" checked={isLock} onChange={() => setIsLock(!isLock)} />
            <label htmlFor="isLock">🔒</label>
        </div>
        <div>
            <label htmlFor="qnaBody">내용</label>
            <input className='qnabodyinput' type="text" value={qnaBody} onChange={(e) => setQnaBody(e.target.value)} />
        </div>
        <div>
            <button className="btn-1 custom-btn" onClick={handleModifyQna}>수정</button>
        </div>
  </div>);
};

export default Modify;
