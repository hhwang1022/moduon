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

    return (<div className={'vote-containe' + generation}><progress
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
    </div>);
};

export default BalanceBar;
