import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Postwrite = ({generation}) => {
  const [postTitle, setpostTitle] = useState('');
  const [postBody, setpostBody] = useState('');
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

  const handlePostpost = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/posts',
        {
          title: postTitle,
          body: postBody,
          isNotice: isLock ? 1 : 0,
          memberId : 1,
          image1 : "",
          image2 : "",
          image3 : "",
          image4 : "",
          image5 : ""
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
            <label htmlFor="postTitle">제목</label>
            <input className='posttitleinput' type="text" value={postTitle} onChange={(e) => setpostTitle(e.target.value)} />
            <input type="checkbox" id="isLock" checked={isLock} onChange={() => setIsLock(!isLock)} />
            <label htmlFor="isLock">🔒</label>
        </div>
        <div>
        <label htmlFor="postTitle">첨부파일</label>
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
            <label htmlFor="postBody">내용</label>
            <input className='postbodyinput' type="text" value={postBody} onChange={(e) => setpostBody(e.target.value)} />
        </div>
        <div>
            <button className="btn-1 custom-btn" onClick={handlePostpost}>작성</button>
        </div>
  </div>);
};

export default Postwrite;
