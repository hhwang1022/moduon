import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './Postwrite.css';

const Postwrite = ({ generation, successhandler }) => {
  const [postTitle, setpostTitle] = useState('');
  const [postBody, setpostBody] = useState('');
  const [isLock, setIsLock] = useState(false);
  const [uplodfile, setFile] = useState([]);
  const [imgurllist, setimgurllist] = useState([]);
  const fileInput = React.useRef(null);
  const maximgcount = 5;

  let accessToken = window.localStorage.getItem('accessToken');
  let formData = new FormData();

  const navigate = useNavigate();

  const handleUpload = (e) => {
    if (uplodfile.length < maximgcount) {
      const newfile = [...uplodfile, e.target.files[0]];
      setFile(newfile);

      formData = new FormData();

      formData.append('multipartFile', e.target.files[0]);

      handlePostimg(uplodfile.length);
    }
    else {
      alert("사진은 " + maximgcount + "장까지 올릴 수 있습니다!");
    }
  };

  const handleButtonUploadClick = () => {
    fileInput.current.click();
  };

  const handlePostpost = async () => {
    console.log(imgurllist);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'posts',
        {
          title: postTitle,
          body: postBody,
          isNotice: isLock ? 1 : 0,
          image1: imgurllist[0] ? imgurllist[0].toString() : "",
          image2: imgurllist[1] ? imgurllist[1].toString() : "",
          image3: imgurllist[2] ? imgurllist[2].toString() : "",
          image4: imgurllist[3] ? imgurllist[3].toString() : "",
          image5: imgurllist[4] ? imgurllist[4].toString() : "",
          category: "CATEGORY_" + generation,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (successhandler !== undefined)
        successhandler(5);
      
      alert('게시글 남기기 성공!');

      setFile([]);
      setimgurllist([]);

      if (response !== undefined)
        navigate('/main_' + generation + '/post');
    } catch (error) {
      alert(JSON.stringify(error.message));
      console.log(error.response.data);
    }
  };

  //이미지를 등록하는 함수
  const handlePostimg = async (index) => {
    accessToken = window.localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'images', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const newimgurllist = [...imgurllist, response.data];
      setimgurllist(newimgurllist);
      console.log(newimgurllist);
    } catch (error) {
      alert(JSON.stringify(error.message));
      console.log(error.response.data);
    }
  };

  return (<div className={"postwritemain" + generation}>
    <div>
      <label className={'posttitle' + generation} htmlFor="postTitle">제목</label>
      <input className={"posttitleinput" + generation} type="text" value={postTitle} onChange={(e) => setpostTitle(e.target.value)} />
      <input type="checkbox" id="isLock" checked={isLock} onChange={() => setIsLock(!isLock)} />
      <label htmlFor="isLock">🔒</label>
    </div>
    <div>
      <label className={'posttitle' + generation} htmlFor="postTitle">첨부파일</label>
      {uplodfile.length < maximgcount ?
        <span >
          <button onClick={() => handleButtonUploadClick()}>
            <img height={50} width={50} src={"https://cdn.iconscout.com/icon/free/png-256/free-plus-button-6544256-5479387.png?f=webp"} />
          </button>
          <input
            type="file"
            ref={fileInput}
            onChange={(e) => handleUpload(e)}
            style={{ display: "none" }}
          />
        </span> : <span></span>}
      {uplodfile.map((x, index) => (

        <span key={index}>
          <button>
            <img height={50} width={50} src={URL.createObjectURL(uplodfile[index]) } className='postuploadsumnailicon'/>
          </button>
        </span>

      ))}

    </div>
    <div>
      <label className={'posttitle' + generation} htmlFor="postBody">내용</label>
      <input className={"postbodyinput" + generation} type="text" value={postBody} onChange={(e) => setpostBody(e.target.value)} />
    </div>
    <div>
      <button className={"postwritebtn" + generation} onClick={handlePostpost}>작성</button>
    </div>
  </div>);
};

export default Postwrite;
