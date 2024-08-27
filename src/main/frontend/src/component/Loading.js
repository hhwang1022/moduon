import { ClockLoader } from 'react-spinners';
import React, { useEffect } from 'react';
import './Loading.css';

const Loading = ({ generation }) => {

  useEffect(() => {
    const squares = document.querySelectorAll('.square');

    // 1초 후에 애니메이션 시작
    setTimeout(() => {
      squares.forEach((square, index) => {
        const rowIndex = Math.floor(index / 7);
        square.style.animationDelay = `${rowIndex * 0.2}s`; // 행에 따라 애니메이션 지연
        square.classList.add('animate');
      });
    }, 1000); // 1초 후에 애니메이션 클래스 추가
  }, []);

  const MShape = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1]
  ];

  const colorClasses = [
    'red', 'red', 'red', '', 'red', 'red', 'red',
    'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange',
    'yellow', '', 'yellow', 'yellow', 'yellow', '', 'yellow',
    'teal', '', '', 'teal', '', '', 'teal',
    'blue', '', '', '', '', '', 'blue',
    'green', '', '', '', '', '', 'green',
    'green', '', '', '', '', '', 'green'
  ];

  return (
    <div className='loadingcentent'>
      {/* <div className="grid">
      {MShape.flat().map((value, index) => (
        <div key={index} className={`square ${value === 1 ? `filled ${colorClasses[index]}` : ''}`}></div>
      ))}
    </div> */}
      <ClockLoader
        color="#e90c59"
        size={200}
        speedMultiplier={5}
      />
      {/* <div />
      <div className={'loadingtext' + generation}>LOADING...</div> */}
    </div>
  );
};

export default Loading;