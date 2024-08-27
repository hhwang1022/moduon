import './Footer_9000.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Footer_9000 = () => {

  return (<div className='footer9000background main9000defaultwindow'>
    <button className='main9000defaultwindow footer9000button'>
      <img src={require("../../resource/9000_windowicon.png")} width={30} height={25}/>시작</button>
    <button className='footer9000buttonpressed'><img src={require("../../resource/9000_windowsearchicon.png")} width={30} height={25}/> 90-00</button>
  </div>);
};

export default Footer_9000;
