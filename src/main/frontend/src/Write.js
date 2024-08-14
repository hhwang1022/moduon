import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Write = () => {
  const [qnaTitle, setQnaTitle] = useState('');
  const [qnaBody, setQnaBody] = useState('');
  const [isLock, setIsLock] = useState(false);
  const [uplodfile, setFile] = useState(null);

  let accessToken = window.localStorage.getItem('accessToken');

  const navigate = useNavigate();

  const fileInput = React.useRef(null);

  useEffect(() => {
    if(uplodfile !== null){
      
    }
  }, [uplodfile]);

  const handleUpload = (e) => {
    // 선택한 파일 정보를 콘솔에 출력
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleButtonUploadClick = (e) => {
    fileInput.current.click();
  };

  const handlePostQna = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/v11/board/qna',
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
      alert('질문 남기기 성공!');
      if(response !== undefined)
        navigate('/');
    } catch (error) {
      alert(JSON.stringify(error.message));
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
        <label htmlFor="qnaTitle">첨부파일</label>
        {
          uplodfile !== null ?  <div>{uplodfile.name}<button onClick={
            () => {
              setFile(null);
            }
          }>파일 삭제</button></div> : (<div><button onClick={handleButtonUploadClick}>파일 업로드</button>
          <input
          type="file"
          ref={fileInput}
          onChange={handleUpload}
          style={{ display: "none" }}
          /></div>)
        }
        
      </div>
        <div>
            <label htmlFor="qnaBody">내용</label>
            <input className='qnabodyinput' type="text" value={qnaBody} onChange={(e) => setQnaBody(e.target.value)} />
        </div>
        <div>
            <button className="btn-1 custom-btn" onClick={handlePostQna}>작성</button>
        </div>
  </div>);
};

export default Write;
