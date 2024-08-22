import './Photolistitem.css';
import React, { useState, useEffect } from 'react';

const Photolistitem = ({ post, generation, onclickhandler }) => {

    post.createsat = "10-22";

    return (
        <div className={"photosumnailbox" + generation}>
            <button  onClick={() => {
                onclickhandler(post.photoId);
            }}><img className={'photosumnailsize' + generation} src={post.image1}></img></button>
            {generation != "1020" ? <div className={"photosumnailname"+generation}>{post.title}</div> : <></> }
        </div>
    );
};

export default Photolistitem;
