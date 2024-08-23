import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Balancegamelist from './Balancegamelist';
import Balancegamewrite from './Balancegamewrite';
import Currentvote_board from '../currentvote/Currentvote_board';
import InstaCurrentvote_board from '../instacurrentvote/InstaCurrentvote_board';

const Balancegameborad = ({ generation }) => {
    const navigate = useNavigate();
    const { voteType } = useParams();  // URL에서 voteType을 가져옴

    useEffect(() => {
        console.log("current vote type : " + voteType);
    }, [voteType]);

    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <Balancegamelist 
                        generation={generation} 
                        onClickwirtebtn={() => navigate('write')} 
                    />
                } 
            />
            <Route 
                path="write" 
                element={
                    <Balancegamewrite 
                        onClickcanclebtn={() => navigate('/balance')}
                    />
                } 
            />
            <Route 
                path="current" 
                element={
                    generation !== "1020" ? 
                    <Currentvote_board 
                        generation={generation} 
                        onclicklistbtn={() => navigate('/balance')} 
                    /> 
                    : 
                    <InstaCurrentvote_board 
                        onclicklistbtn={() => navigate('/balance')} 
                    />
                } 
            />
        </Routes>
    );
};

export default Balancegameborad;
