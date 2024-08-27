import React, {useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Postlist from './Postlist';
import Postwrite from './Postwrite';
import Postview from './Postview';
import PostUpdate from './PostUpdate';

const Postboard = ({ generation }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [currentpostid, setCurrentPostId] = useState(parseInt(postId) || 1);

  useEffect(() => {
  }, [currentpostid]);

  const handleReadClick = (id) => {
    setCurrentPostId(id);
    navigate(`view/${id}`);
  };

  return (
    <Routes>
      <Route path="/" element={<Postlist generation={generation} onClickwirtebtn={() => navigate('write')} onClickreadbtn={handleReadClick} />} />
      <Route path="write" element={<Postwrite generation={generation} />} />
      <Route path="view/:postId" element={<Postview generation={generation} />} />
      <Route path="update/:postId" element={<PostUpdate generation={generation} postid={currentpostid} />} />
    </Routes>
  );
};

export default Postboard;
