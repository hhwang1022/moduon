import './BalanceBar.css';
import React, { useState, useEffect } from 'react';

const BalanceBar = ({ vote1, vote2, generation}) => {

  const totalVotes = vote1 + vote2;
  const vote1Percentage = totalVotes ? (vote1 / totalVotes) * 100 : 0;
  const vote2Percentage = totalVotes ? (vote2 / totalVotes) * 100 : 0;

  return (
      <div className={"vote-container" + generation}>
          <progress className="vote-bar" max="100" value={vote1Percentage}></progress>
          <div className="vote-labels">
              <span>{vote1Percentage.toFixed(0)}%</span>
              <span>{vote2Percentage.toFixed(0)}%</span>
          </div>
      </div>

      
  
  );
};

export default BalanceBar;
