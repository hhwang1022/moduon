import './Photolistitem.css';
import React, { useState, useEffect } from 'react';

const Photolistitem = ({ post, generation }) => {

    post.createsat = "10-22";

    return (
        <div className={"photosumnailbox" + generation}>
            <img className={'photosumnailsize' + generation} src={post.imgurl1}></img>
            {generation != "1020" ? <div className={"photosumnailname"+generation}>{post.title}</div> : <></> }
        </div>
    );
};

export default Photolistitem;
