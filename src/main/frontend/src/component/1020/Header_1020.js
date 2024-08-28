import InstarIcon from "./InstarIcon";
import './Header_1020.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const Header_1020 = ({ title, setcurrentindex, titleindex }) => {
  const [currenttitleindex, setcurrenttitleindex] = useState(titleindex);
  const navigate = useNavigate();

  const menu8090icon = require('../../resource/8090_menuicon.png');
  const menu9000icon = require('../../resource/9000_menuicon.png');
  const menu0010icon = require('../../resource/0010_menuicon.png');

  const menusearchicon = require('../../resource/1020searchicon.png');
  const menuloveicon = require('../../resource/1020loveicon.png');
  const menuflighticon = require('../../resource/1020flighticon.png');
  const menujoinicon = require('../../resource/1020joinicon.png');
  const menuloginicon = require('../../resource/1020loginicon.png');

  const titles = ["투표", "갤러리", "게시판", "회원가입", "", "로그인"];

  return (
    <div>
      <div className="header">
         <span className="header1020maintitle"><button onClick={() => {
           navigate('/main_1020');}}>𝑴𝒐𝒅𝒖𝒐𝒏</button>
         </span>
        <div className="right">
          <img className="padding" src={menuloveicon} width={30} height={30} />
          <img className="padding" src={menuflighticon} width={30} height={30} />
          <img className="padding" src={menusearchicon} width={30} height={30} />
        </div>
      </div>
      <div className="headermenu">
        <InstarIcon imgurl={menu8090icon} name={"80-90"}
          onClickHandler={() => {
            navigate('/main_8090/balance/view');
          }}
        ></InstarIcon>
        <InstarIcon imgurl={menu9000icon} name={"90-00"}
          onClickHandler={() => {
            navigate('/main_9000/balance/view');
          }}
        ></InstarIcon>
        <InstarIcon imgurl={menu0010icon} name={"00-10"}
          onClickHandler={() => {
            navigate('/main_0010/balance/view');
          }}
        ></InstarIcon>
      </div>
      <div className='hline'></div>
      <div className="header">
        <div className="right">
        <button className="right" onClick={() => {
          navigate('/main_1020/join');
          setcurrentindex(3);
          setcurrenttitleindex(3);
        }}><img className="padding" src={menujoinicon} width={30} height={30} /></button>
        <button className="right" onClick={() => {
          navigate('/main_1020/login');
          setcurrentindex(5);
          setcurrenttitleindex(5);
        }}><img className="padding" src={menuloginicon} width={30} height={30} /></button>
      </div>
      </div>
    </div>
  );
};

export default Header_1020;
