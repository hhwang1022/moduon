import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Photoview = ({generation}) => {
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
          image5 : "",
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
 게시글~
  </div>);
};

export default Photoview;
