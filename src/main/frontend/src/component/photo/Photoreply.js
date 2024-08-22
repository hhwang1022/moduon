import React, { useState, useEffect } from 'react';
import './Photoview.css';

const Photoreply = ({ reply }) => {

    if(!reply){
        return <div></div>
    }

  return <div>--------------------------------------------------------------------
    <div className='replybox'>
        <div>{reply}</div>
    </div>
  </div>;
};

export default Photoreply;
