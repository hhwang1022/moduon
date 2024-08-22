import React, { useState, useEffect } from 'react';
import './Balancegamewrite.css';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function Balancegamewrite({onClickcanclebtn, successhandler}) {
    const generations = ['8090', '9000', '0010', '1020'];
  
    const [selectedGeneration, setSelectedGeneration] = useState(generations[0]);
    const [title, setTitle] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image1name, setImage1name] = useState('');
    const [image2name, setImage2name] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const navigate = useNavigate();
    let accessToken = window.localStorage.getItem('accessToken');

    
    const handleSubmit = async (e) => {
      e.preventDefault();   

        const parseDateToList = (dateString) => {
          const [year, month, day] = dateString.split('-').map(Number);
          return [year, month, day, 0, 0];
        };

        const voteData = {
          title: title,
          voteItem1: image1name,
          voteItem2: image2name,
          voteImage1: image1,
          voteImage2: image2,
          createDateList: parseDateToList(startDate),
          endDateList: parseDateToList(endDate),
          generation: selectedGeneration
        };
      
        try {
          const response = await axios.post('http://127.0.0.1:8080/balancegames', voteData, {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
              },
          }).then(function (response) {
            if (successhandler !== undefined)
              successhandler(5);
            alert('투표 작성 성공!');
            if (response !== undefined)
              navigate('/');
          });
      } catch (error) {
          alert(JSON.stringify(error.message));
      }

    };
  
    return (
        <form className="vote-creation-form" onSubmit={handleSubmit}>
          <div className='vote-creation-header'>
            <div className='vote-creation-title'>
            <label>제목 :</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                </div>
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
          </div>
  
          <div className="image-upload">
            <div className='image'>
              <label>Image 1</label>
              <input
                type="text"
                value={image1}
                onChange={(e) => setImage1(e.target.value)}
                placeholder="이미지 1 URL 입력"
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
              <input
                type="text"
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
                placeholder="이미지 2 URL 입력"
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
            <button type="cancle" onClick={onClickcanclebtn}>취소</button>
            <button type="submit">업로드</button>
          </div>
        </form>
      );
  }

export default Balancegamewrite;