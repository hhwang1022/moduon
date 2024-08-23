import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Currentvote_board from '../currentvote/Currentvote_board';
import InstaCurrentvote_board from '../instacurrentvote/InstaCurrentvote_board';
import Balancegamelist from './Balancegamelist';
import Balancegamewrite from './Balancegamewrite';
import React from 'react';

const Balancegameboard = ({ generation }) => {
    const navigate = useNavigate();
    return (
        <Routes>
            <Route path="list" element={<Balancegamelist generation={generation} />} />
            <Route path="write" element={<Balancegamewrite />} />
            <Route path="/" element={generation !== "1020" ? <Currentvote_board generation={generation} onclicklistbtn={() => () => navigate('list')} /> : <InstaCurrentvote_board />} />
        </Routes>
    );
};

export default Balancegameboard;
