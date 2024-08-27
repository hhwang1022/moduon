import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Loading from '../Loading';

 const CurrentvoteUpdate = ({ generation }) => {
  const generations = ['8090', '9000', '0010'];
  const [voteTitle, setVoteTitle] = useState('');
  const [voteImage1, setVoteImage1] = useState('');
  const [voteImage2, setVoteImage2] = useState('');
  const [voteItem1, setVoteItem1] = useState('');
  const [voteItem2, setVoteItem2] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGeneration, setSelectedGeneration] = useState(generations[0]);

  const fileInput1 = useRef(null);
  const fileInput2 = useRef(null);
  let formData = new FormData();
  const navigate = useNavigate();

  const { balanceid } = useParams();

  let accessToken = window.localStorage.getItem('accessToken');

  const handleUpload = (index, e) => {
      formData = new FormData();
      formData.append('multipartFile', e.target.files[0]);
      handlePostimg(index);
    };

  // 데이터를 가져오는 함수
useEffect(() => {
  const fetchVote = async () => {
  console.log("balanceGameId : " + balanceid);
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'balancegames/' + balanceid,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      console.log(response);

      // 서버로부터 받은 데이터를 상태로 설정
      setVoteTitle(data.title);
      setVoteImage1(data.voteImage1);
      setVoteImage2(data.voteImage2);
      setVoteItem1(data.voteItem1);
      setVoteItem2(data.voteItem2);
      setStartDate(data.startDate);
      setEndDate(data.endDate);

      setIsLoading(false);
    } catch (error) {
      alert("데이터를 가져오는 중 오류가 발생했습니다.");
      navigate('/');
    }
  };
    fetchVote();
  }, [balanceid, accessToken, navigate]);


  // 데이터 수정 요청 함수
  const handleSubmit = async () => {
    try {
      const response = await axios.patch(process.env.REACT_APP_API_URL + 'balancegames/' + balanceid,
        {
          title: voteTitle,
          voteImage1: voteImage1,
          voteImage2: voteImage2,
          voteItem1: voteItem1,
          voteItem2: voteItem2,
          createDateList: parseStartDateToList(startDate),
          endDateList: parseEndDateToList(endDate)
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("수정 완료!");
      navigate(`/main_${generation}/balance`);
    } catch (error) {
      alert("수정 중 오류가 발생했습니다.");
    }
  };

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
            setVoteImage1(response.data);
          }
          else {
            setVoteImage2(response.data);
          }
      } catch (error) {
        alert("이미지 등록에 실패했습니다.");
      }
    };

   const parseStartDateToList = (dateString) => {
     const [year, month, day] = dateString.split('-').map(Number);
     return [year, month, day, 0, 0];
   };

   const parseEndDateToList = (dateString) => {
     const [year, month, day] = dateString.split('-').map(Number);
     return [year, month, day, 23, 59, 59, 99];
   }

  return !isLoading ? (
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
            value={voteTitle}
            onChange={(e) => setVoteTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="image-upload">
        <div className='image'>
          <label>Image 1</label>
          <button className='balancegameuploadbtn' onClick={() => fileInput1.current.click()}>
            업로드 버튼
          </button>
          <input
           type="file"
           ref={fileInput1}
            onChange={(e) => handleUpload(0, e)}
            style={{ display: "none" }}
            />
          {voteImage1 && <img src={voteImage1} alt="이미지 1 미리보기" />}
          <input className='image-name'
            type="text"
            value={voteItem1}
            onChange={(e) => setVoteItem1(e.target.value)}
            placeholder="이미지 1 이름"
          />
        </div>

        <div className='image'>
          <label>Image 2</label>
          <button className='balancegameuploadbtn' onClick={() => fileInput2.current.click()}>
            업로드 버튼
          </button>
            <input
              type="file"
              ref={fileInput2}
              onChange={(e) => handleUpload(1,e)}
              style={{ display: "none" }}
            />
          {voteImage2 && <img src={voteImage2} alt="이미지 2 미리보기" />}
          <input className='image-name'
                type="text"
                value={voteItem2}
                 onChange={(e) => setVoteItem2(e.target.value)}
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
        <button className='joinbutton_8090' type="button" onClick={() => navigate(-1)}>취소</button>
        <button className='joinbutton_8090' type="button" onClick={handleSubmit}>수정</button>
      </div>
    </div>
  ) : (
    <div className='vote-creation-header'>
      <Loading generation={generation} />
    </div>
  );
};

export default CurrentvoteUpdate;
