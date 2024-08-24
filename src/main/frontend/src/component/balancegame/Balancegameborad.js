import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Currentvote_board from '../currentvote/Currentvote_board';
import InstaCurrentvote_board from '../instacurrentvote/InstaCurrentvote_board';
import Balancegamelist from './Balancegamelist';
import Balancegamewrite from './Balancegamewrite';

const Balancegameboard = ({ generation }) => {
    const navigate = useNavigate();
    const { balanceid } = useParams();

    return (
        <Routes>
            <Route path="/" element={<Balancegamelist generation={generation} onClickwirtebtn={() => navigate('write')} />} />
            <Route path="write" element={<Balancegamewrite />} />
            <Route path="view/:balanceid" element={generation !== "1020" ? <Currentvote_board generation={generation} onclicklistbtn={() => navigate('/main_' + generation + '/balance')} /> : <InstaCurrentvote_board />} />
            <Route path="view" element={generation !== "1020" ? <Currentvote_board generation={generation} onclicklistbtn={() => navigate('/main_' + generation + '/balance')} /> : <InstaCurrentvote_board />} />
        </Routes>
    );
};

export default Balancegameboard;
