import React, { useState, useEffect } from 'react';
import './Balancegamewrite.css';


function Balancegamewrite() {
    const generations = ['80-90', '90-00', '00-10', '10-20'];
  
    const [selectedGeneration, setSelectedGeneration] = useState(generations[0]);
    const [title, setTitle] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image1name, setImage1name] = useState('');
    const [image2name, setImage2name] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const voteData = {
          generation: selectedGeneration,
          title,
          image1,
          image2,
          image1name,
          image2name,
          startDate,
          endDate
        };
    };

    // 바인딩 구현 하는 곳
  
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
            <button type="cancle">취소</button>
            <button type="submit">업로드</button>
          </div>
        </form>
      );
  }

export default Balancegamewrite;