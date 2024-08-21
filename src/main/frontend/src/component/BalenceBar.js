import './BalenceBar.css';
import React, { useState, useEffect } from 'react';

const BalenceBar = ({ left, right }) => {
  const [leftpoint, setleft] = useState(0);
  const [rightpoint, setright] = useState(0);

  const per = Math.floor((left / (left + right)) * 100);

  useEffect(() => {

    for (let i = 1; i < left; i++) {
      (function (x) {
        setTimeout(function () {
          setleft(i);
        }, 10 * x);
      })(i);
    }
    
  }, [left]);

  return (<progress
    class="progress"
    id="progress"
    value={leftpoint}
    min={0}
    max={left + right}
  ></progress>);
};

export default BalenceBar;
