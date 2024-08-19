import './Menubar_0010.css';
import React, { useState, useEffect } from 'react';

const Menubar_0010 = () => {
  const [currentindex, setcurrentindex] = useState(0);

  let menu = ["게시판", "사진첩", "투표"];

  useEffect(() => {
  }, [currentindex]);


  return (<span className='main0010menubar'>
    {menu.map((x, index) => {
      return <button className={(index === currentindex ? 'main0010menubtnactive' : 'main0010menubtn')}
        onClick={() => {
          setcurrentindex(index);
        }}
      >{x}</button>
    })}
  </span>);
};

export default Menubar_0010;
