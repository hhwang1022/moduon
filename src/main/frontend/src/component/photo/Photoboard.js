import React, {useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Photolist from './Photolist';
import Photowrite from './Photowrite';
import Photoview from './Photoview';
import PhotoUpdate from './PhotoUpdate';

const Photoboard = ({ generation }) => {
  const navigate = useNavigate();
  const { photoId } = useParams();
  const [currentphotoid, setCurrentPhotoId] = useState(parseInt(photoId) || 1);
  useEffect(() => {
  }, [currentphotoid]);

   const handleReadClick = (id) => {
    setCurrentPhotoId(id);
    navigate(`view/${id}`);
  };

  return (
    <Routes>
      <Route path="/" element={<Photolist generation={generation} onClickwirtebtn={() => navigate('write')} onClickreadbtn={handleReadClick} />} />
      <Route path="write" element={<Photowrite generation={generation} />} />
      <Route path="view/:photoId" element={<Photoview generation={generation} photoid={currentphotoid} />} />
      <Route path="update/:photoId" element={<PhotoUpdate generation={generation} photoid={currentphotoid} />} />
    </Routes>
  );
};

export default Photoboard;
