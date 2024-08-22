import React, { useState, useEffect } from 'react';
import './Postview.css';

const Postreply = ({ reply }) => {

    if(!reply){
        return <div></div>
    }

  return <div>--------------------------------------------------------------------
    <div className='replybox'>
        <div>{reply}</div>
    </div>
  </div>;
};

export default Postreply;
