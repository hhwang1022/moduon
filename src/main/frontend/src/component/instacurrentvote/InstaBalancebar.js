import React from 'react';
import './InstaBalancebar.css';

const InstaBalancebar = ({ vote1, vote2 }) => {

    const totalVotes = vote1 + vote2;
    const vote1Percentage = (vote1 / totalVotes) * 100;
    const vote2Percentage = (vote2 / totalVotes) * 100;

    return (
        <div className="insta-vote-container">
            <progress className="insta-vote-bar" max="100" value={vote1Percentage}></progress>
            <div className="insta-vote-labels">
                <span>{vote1Percentage.toFixed(0)}%</span>
                <span>{vote2Percentage.toFixed(0)}%</span>
            </div>
        </div>

    );
};

export default InstaBalancebar;