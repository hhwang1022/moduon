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
import Header from './Header';

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
      <Header/>
      <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/qnas" element={<QnaList />} />
            <Route path='/qna/:qnaId' element ={<Qna/>} />
            <Route path="/write" element={<Write />} />
            <Route path="/modify/:qnaId" element={<Modify />} />
            <Route path='/member/join'element={<Join />} />
      </Routes>
      <Sidebar />
      </BrowserRouter>
    );
  };
  
  return (
    <div>
      <main>
      <Router>
      </Router>
      </main>
      <div>
         <p>
          <span>Access Token: </span><span style={{ color: 'blue', fontSize: '5pt' }}>{accessToken}</span>
        </p>
        <p>
          <span>Refresh Token: </span><span style={{ color: 'blue', fontSize: '5pt' }}>{refreshToken}</span>
        </p>
      </div>
      
    </div>
  );
};

export default App;