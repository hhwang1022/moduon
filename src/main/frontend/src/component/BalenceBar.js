import './BalenceBar.css';
import React, { useState, useEffect } from 'react';

const BalenceBar = ({ left, right }) => {
  const [leftpoint, setleft] = useState(0);
  const [rightpoint, setright] = useState(0);

  const per = Math.floor((left / (left + right)) * 100);

  const totalTime = 1000;
    let stepTime = 0;

  useEffect(() => {
    if (left > right) {
      stepTime = totalTime / left;
      for (let i = 1; i < left; i++) {
        (function (x) {
          setTimeout(function () {
            setleft(i);
          }, stepTime * x);
        })(i);
      }
    }
    else {
      stepTime = totalTime / right;
      for (let i = left + right; i >= left; i--) {
        (function (x) {
          setTimeout(function () {
            setleft(i);
          }, stepTime * (left + left - x));
        })(i);
      }
    }

  }, [left]);

  return (<span><progress
    class="progress"
    id="progress"
    value={leftpoint}
    min={0}
    max={left + right}
  ></progress>
    <div className='balancepointbar'>
      <div className={'balanceleftpoint'}>{left.toLocaleString()}</div>
      <div className={'balancerighttpoint'}>{right.toLocaleString()}</div>
    </div>
  </span>);
};

export default BalenceBar;
