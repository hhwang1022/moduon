import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './main.css';
import './App.css';
import Qna from './Qna';
import Write from './Write';
import QnaList from './QnaList';
import Modify from './Modify';
import Join from './Join';
import Sidebar from './Sidebar';
import Header_1020 from './component/1020/Header_1020';
import Main_1020 from './component/1020/Main_1020';
import Main_0010 from './component/0010/Main_0010';
import Main_8090 from './component/8090/Main_8090';
import Main_9000 from './component/9000/Main_9000';
import Footer_1020 from './component/1020/Footer_1020';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  //const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    document.cookie = `refreshtoken=${refreshToken}`;

    //메인 페이지
  }, []);

  const Router = () => {
    return (
      <BrowserRouter>
        {/* <div className='main'>
      <div className='content'> */}
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/qnas" element={<QnaList />} />
          <Route path='/qna/:qnaId' element={<Qna />} />
          <Route path="/write" element={<Write />} />
          <Route path="/modify/:qnaId" element={<Modify />} />
          <Route path='/member/join' element={<Join />} />
          <Route path='/' element={<Main_1020 />} />
          <Route path='/main_0010' element={<Main_0010 />} />
          <Route path='/main_1020' element={<Main_1020 />} />
          <Route path='/main_9000' element={<Main_9000 />} />
          <Route path='/main_8090' element={<Main_8090 />} />
        </Routes>
        {/* </div>
      { <Sidebar /> }
      </div> */}
      </BrowserRouter>
    );
  };

  return (
    <div>
      {/* <Header_1020 title={"이번 주 투표 현황"}></Header_1020> */}
      <body>
        <Router>
        </Router>
      </body>
      {/* <p>
            <span>Access Token: </span><span style={{ color: 'blue', fontSize: '5pt' }}>{accessToken}</span>
          </p>
          <p>
            <span>Refresh Token: </span><span style={{ color: 'blue', fontSize: '5pt' }}>{refreshToken}</span>
          </p> */}
    </div>
  );
};

export default App;