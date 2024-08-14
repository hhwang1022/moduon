import React, { useState, useEffect } from 'react';
import './Qna.css';

const Reply = ({ reply }) => {

    if(!reply){
        return <div></div>
    }

  return <div>--------------------------------------------------------------------
    <div className='replybox'>
        <div>{reply}</div>
    </div>
  </div>;
};

export default Reply;
