import './BalanceBar.css';
import React, { useState, useEffect } from 'react';

const BalanceBar = ({ vote1, vote2, generation }) => {
    const [leftpoint, setleft] = useState(0);
    const per = Math.floor((vote1 / (vote1 + vote2)) * 100);

    const totalTime = 1000;
    let stepTime = 0;

    useEffect(() => {
        stepTime = totalTime / vote1;

        for (let i = 1; i < vote1; i++) {
            (function (x) {
                setTimeout(function () {
                    setleft(i);
                }, x * stepTime);
            })(i);
        }

    }, [vote1]);

    useEffect(() => {
        stepTime = totalTime / vote2;

        for (let i = vote1 + vote2; i >= vote1; i--) {
            (function (x) {
                setTimeout(function () {
                    setleft(i);
                }, (vote1 + vote2 - x) * stepTime);
            })(i);
        }
    }, [vote2]);

    return (<span><progress
        class={"progress_" + generation}
        id={"progress_" + generation}
        value={leftpoint}
        min={0}
        max={vote1 + vote2}
    >  
    </progress>
    <div className='balancepointbar'>
    <div className={'balanceleftpoint' + generation}>{vote1.toLocaleString()}</div> 
    <div className={'balancerighttpoint' + generation}>{vote2.toLocaleString()}</div>
    </div>
    </span>);

    //   const totalVotes = vote1 + vote2;
    //   const vote1Percentage = totalVotes ? (vote1 / totalVotes) * 100 : 0;
    //   const vote2Percentage = totalVotes ? (vote2 / totalVotes) * 100 : 0;

    //   return (
    //       <div className={"vote-container" + generation}>
    //           <progress className="vote-bar" max="100" value={vote1Percentage}></progress>
    //           <div className="vote-labels">
    //               <span>{vote1Percentage.toFixed(0)}%</span>
    //               <span>{vote2Percentage.toFixed(0)}%</span>
    //           </div>
    //       </div>



    //   );
};

export default BalanceBar;
