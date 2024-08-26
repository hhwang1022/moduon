import React, { useState, useEffect, useRef } from 'react';
import './Balancegamewrite.css';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function Balancegamewrite({ onClickcanclebtn, successhandler }) {
  const generations = ['8090', '9000', '0010', '1020'];

  const [selectedGeneration, setSelectedGeneration] = useState(generations[0]);
  const [title, setTitle] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image1name, setImage1name] = useState('');
  const [image2name, setImage2name] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fileInput1 = useRef(null);
  const fileInput2 = useRef(null);
  let formData = new FormData();

  const navigate = useNavigate();
  let accessToken = window.localStorage.getItem('accessToken');

  const handleUpload = (index, e) => {
    formData = new FormData();
    formData.append('multipartFile', e.target.files[0]);
    handlePostimg(index);
  };

  const handleButtonUploadClick = (index, fileInputRef) => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parseStartDateToList = (dateString) => {
      const [year, month, day] = dateString.split('-').map(Number);
      return [year, month, day, 0, 0];
    };

    const parseEndDateToList = (dateString) => {
      const [year, month, day] = dateString.split('-').map(Number);
      return [year, month, day, 23, 59, 59, 99];
    }

    const voteData = {
      title: title,
      voteItem1: image1name,
      voteItem2: image2name,
      voteImage1: image1,
      voteImage2: image2,
      createDateList: parseStartDateToList(startDate),
      endDateList: parseEndDateToList(endDate),
      generation: selectedGeneration
    };

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + 'balancegames', voteData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (successhandler !== undefined)
        successhandler(5);
      alert('투표 작성 성공!');
      if (response !== undefined)
        navigate('/');
    } catch (error) {
      alert("투표 작성에 실패했습니다.");
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
        if (index === 0) {
          setImage1(response.data);
        }
        else {
          setImage2(response.data);
        }
    } catch (error) {
      alert("이미지 등록에 실패했습니다.");
    }
  };

  return (
    <div>
      <div className='vote-creation-header'>
        <div className='vote-creation-category'>
          <label>카테고리 :</label>
          <select
            value={selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value)}
          >
            {generations.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
        </div>
        <div className='vote-creation-title'>
          <label>제목 :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="image-upload">
        <div className='image'>
          <label>Image 1</label>
          <button className='balancegameuploadbtn' onClick={() => handleButtonUploadClick(0, fileInput1)}>
          업로드버튼
              <img height={50} width={50} />
            </button>
            <input
              type="file"
              ref={fileInput1}
              onChange={(e) => handleUpload(0, e)}
              style={{ display: "none" }}
            />
          {image1 && <img src={image1} alt="이미지 1 미리보기" />}
          <input className='image-name'
            type="text"
            value={image1name}
            onChange={(e) => setImage1name(e.target.value)}
            placeholder="이미지 1 이름"
          />
        </div>

        <div className='image'>
          <label>Image 2</label>
          <button className='balancegameuploadbtn' onClick={() => handleButtonUploadClick(1, fileInput2)}>
            업로드버튼
              <img height={50} width={50} />
            </button>
            <input
              type="file"
              ref={fileInput2}
              onChange={(e) => handleUpload(1,e)}
              style={{ display: "none" }}
            />
          {image2 && <img src={image2} alt="이미지 2 미리보기" />}
          <input className='image-name'
            type="text"
            value={image2name}
            onChange={(e) => setImage2name(e.target.value)}
            placeholder="이미지 2 이름"
          />
        </div>
      </div>

      <div className='date-setting'>
        <label>기간 :</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        ~
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className='vote-creation-footer'>
        <button className='joinbutton_8090' type="cancle" onClick={onClickcanclebtn}>취소</button>
        <button className='joinbutton_8090' type="submit" onClick={handleSubmit}>업로드</button>
      </div>
    </div>
    // </form>
  );
}

export default Balancegamewrite;
