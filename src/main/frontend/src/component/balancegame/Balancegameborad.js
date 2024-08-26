import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Currentvote_board from '../currentvote/Currentvote_board';
import InstaCurrentvote_board from '../instacurrentvote/InstaCurrentvote_board';
import Balancegamelist from './Balancegamelist';
import LastBalanceGame from './LastBalanceGame';
import Balancegamewrite from './Balancegamewrite';


const Balancegameboard = ({ generation }) => {
    const navigate = useNavigate();
    const { balanceid } = useParams();
    const [balanceGameId, setbalanceGameId] = useState(balanceid ? parseInt(balanceid) : 1);

    const handleReadClick = (id) => {
        setbalanceGameId(id);
        navigate(`view/${id}`);
    };

     return (
            <Routes>
                <Route path="/" element={<Balancegamelist generation={generation}
                    onClickwirtebtn={handleReadClick} />} />
                <Route path="write" element={<Balancegamewrite />} />
                <Route path="view/:balanceid" element={<LastBalanceGame generation={generation} balanceid={balanceGameId}/>} />
                <Route path="view" element={generation !== "1020" ? <Currentvote_board generation={generation} onclicklistbtn={() => navigate('/main_' + generation + '/balance')} /> : <InstaCurrentvote_board />} />
            </Routes>
        );
};
export default Balancegameboard;
