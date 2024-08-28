import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import memberInfo from "../../MemberInfo";
import './Photowrite.css';

const Photowrite = ({ generation, successhandler }) => {
  const [photoTitle, setphotoTitle] = useState('');
  const [photoBody, setphotoBody] = useState('');
  const [isLock, setIsLock] = useState(false);
  const [uplodfile, setFile] = useState([]);
  const [imgurllist, setimgurllist] = useState([]);
  const fileInput = React.useRef(null);
  const maximgcount = 5;
  const plusicon = require('../../resource/plus_icon.png');

 useEffect(() => {
      info = memberInfo.getMemberInfo();
  }, []);

  let accessToken = window.localStorage.getItem('accessToken');
  let formData = new FormData();
  let info = memberInfo.getMemberInfo();

  const navigate = useNavigate();

  const handleUpload = (e) => {
    if (uplodfile.length < maximgcount) {
      const newfile = [...uplodfile, e.target.files[0]];
      setFile(newfile);

      formData = new FormData();
      formData.append('multipartFile', e.target.files[0]);

      handlePhotoimg(uplodfile.length);
    }
    else {
      alert("사진은 " + maximgcount + "장까지 올릴 수 있습니다!");
    }
  };

  const handleButtonUploadClick = () => {
    fileInput.current.click();
  };

  const handlePostphoto = async () => {

    if (imgurllist.length < 1) {
      alert("최소 1장의 이미지를 올려주세요!");
      return;
    }

    const title = photoTitle || '';
    const body = photoBody || ''; 
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'photos',
        {
          title: photoTitle,
          body: photoBody,
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
        setFile([]);
        setimgurllist([]);
        navigate('/main_' + generation + '/photo');
    } catch (error) {
      if(title.length > 255){
        alert("제목은 최대 255자까지 입력하실 수 있습니다.");
        return;
      }
      if(body.length > 255){
        alert("내용은 최대 255자까지 입력하실 수 있습니다.");
        return;
      }
      if (info.name === '홍길동') {
        alert("로그인 해주세요.");
        return;
      }
      if (info.generation === "8090" && generation === "0010") {
          alert("8090세대는 8090과 9000 카테고리만 글쓰기가 가능합니다.");
          return;
      } else if (info.generation === "0010" && generation === "8090") {
          alert("0010세대는 9000과 0010 카테고리만 글쓰기가 가능합니다.");
          return;
      }
      if (title === '') {
        alert("제목을 입력해주세요.");
        return;
      } 
      if (body === ''){
        alert("내용을 입력해주세요.");
      }
    }
  };

  //이미지를 등록하는 함수
  const handlePhotoimg = async (index) => {
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
    }
  };

  const handleCancle = (() => {
    navigate('/main_' + generation + '/photo')
  });

  return (<div className={"photowritemain" + generation}>
    <div>
      <label className={'phototitle' + generation} htmlFor="photoTitle">제목</label>
      <input className={"phototitleinput" + generation} type="text" value={photoTitle} onChange={(e) => setphotoTitle(e.target.value)} />
    </div>
    <div>
      <label className={'phototitle' + generation} htmlFor="photoTitle">첨부파일</label>
      {uplodfile.length < maximgcount ?
        <span >
          <button onClick={() => handleButtonUploadClick()}>
            <img height={50} width={50} src={plusicon} />
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
          <button key={index}>
            <img key={index} height={50} width={50} src={URL.createObjectURL(uplodfile[index])} className='photouploadsumnailicon' />
          </button>
        </span>

      ))}
    </div>
    <div>
      <label className={'phototitle' + generation} htmlFor="photoBody">내용</label>
      <textarea className={"photobodyinput" + generation} type="text" value={photoBody} onChange={(e) => setphotoBody(e.target.value)} />
    </div>
    <div className='photowritebtn-box'>
      <button className={"photowritebtn" + generation} onClick={handleCancle}>취소</button>
      <button className={"photowritebtn" + generation} onClick={handlePostphoto}>작성</button>
    </div>
  </div>);
};

export default Photowrite;
