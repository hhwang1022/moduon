import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Photolist from './Photolist';
import Photowrite from './Photowrite';
import Photoview from './Photoview';

const Photoboard = ({ generation }) => {
  const navigate = useNavigate();
  const { photoId } = useParams();
  const currentphotoid = parseInt(photoId) || 1;

  useEffect(() => {
    console.log("currentphotoid : " + currentphotoid);
  }, [currentphotoid]);

  return (
    <Routes>
      <Route path="/" element={<Photolist generation={generation} onClickwirtebtn={() => navigate('write')} onClickreadbtn={(id) => navigate(`view/${id}`)} />} />
      <Route path="write" element={<Photowrite generation={generation} />} />
      <Route path="view/:photoId" element={<Photoview generation={generation} photoid={currentphotoid} />} />
    </Routes>
  );
};

export default Photoboard;
