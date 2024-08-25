import React, {useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './main.css';
import './App.css';
import Qna from './Qna';
import Write from './Write';
import QnaList from './QnaList';
import Modify from './Modify';
import Main_1020 from './component/1020/Main_1020';
import Main_0010 from './component/0010/Main_0010';
import Main_8090 from './component/8090/Main_8090';
import Main_9000 from './component/9000/Main_9000';
import 'bootstrap/dist/css/bootstrap.min.css';
import Errorpage from './component/Errorpage';
import MyProfile from './component/MyProfile'
import UpdateProfile from './component/UpdateProfile'


const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [islogin, setislogin] = useState(false);
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
        <Routes>
          <Route path='/' element={<Main_1020 />} />
          <Route path="/" element={<Navigate to="/main_1020" />} />
        <Route path="/main_0010/*" element={<Main_0010 />} />
        <Route path="/main_1020/*" element={<Main_1020 />} />
        <Route path="/main_9000/*" element={<Main_9000 />} />
        <Route path="/main_8090/*" element={<Main_8090 />} />
          <Route path='/error/:errorcode' element={<Errorpage />} />
          <Route path="/*" element={<Errorpage />} />
          <Route path="/myprofile" element={<MyProfile onClickMyProfile={() => {}} />} />
          <Route path="/updateprofile" element={<UpdateProfile onclicklUpdateProfile={() => {}} />} />
        </Routes>
      </BrowserRouter>
    );
  };

  return (
    <div>
        <audio id="bgmplayer" loop></audio>
        <body>
          <Router>
          </Router>
        </body>
      </div>
  );
};

export default App;