import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Postlist from './Postlist';
import Postwrite from './Postwrite';
import Postview from './Postview';

const Postboard = ({ generation }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const currentpostid = parseInt(postId) || 1;

  useEffect(() => {
    console.log("currentpostid : " + currentpostid);
  }, [currentpostid]);

  return (
    <Routes>
      <Route path="/" element={<Postlist generation={generation} onClickwirtebtn={() => navigate('write')} onClickreadbtn={(id) => navigate(`view/${id}`)} />} />
      <Route path="write" element={<Postwrite generation={generation} />} />
      <Route path="view/:postId" element={<Postview generation={generation} postid={currentpostid} />} />
    </Routes>
  );
};

export default Postboard;
