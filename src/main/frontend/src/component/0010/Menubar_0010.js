import './Menubar_0010.css';
import React, { useState, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';

const Menubar_0010 = ({onClickHandler}) => {
  const [currentindex, setcurrentindex] = useState(2);
  const location = useLocation();

  let menu = ["게시판", "사진첩", "투표"];

  useEffect(() => {
    if (location.pathname.indexOf('/post') > 0) {
      setcurrentindex(0);
    }
    else if(location.pathname.indexOf('/photo') > 0){
      setcurrentindex(1);
    }
    else{
      setcurrentindex(2);
    }
  }, [location.pathname]);

  useEffect(() => {
  }, [currentindex]);

  return (<span className='main0010menubar'>
    {menu.map((x, index) => {
      return <button key={index} className={(index === currentindex ? 'main0010menubtnactive' : 'main0010menubtn')}
        onClick={() => {
          setcurrentindex(index);
          onClickHandler(index);
        }}
      >{x}</button>
    })}
  </span>);
};

export default Menubar_0010;
