//import './Balancegameitem.css';
import React, { useState, useEffect } from 'react';


const BalancegameItem = ({ post, generation, onclickhandler }) => {
    return (
        <tr className={'postlist' + generation + 'line'} height="34">
            <td className={'postitem' + generation + 'newtext'}>new</td>
            <td className={'postlist' + generation + 'text'}>
                <button onClick={() => onclickhandler(post.balanceGameId)}>
                    {post.title}</button></td>
            <td className={'postlist' + generation + 'text'}>{post.nickname}</td>
            <td className={'postlist' + generation + 'text'}>{post.createsat}</td>
            <td className={'postlist' + generation + 'text'}>{post.view}</td>
            <td className={'postlist' + generation + 'text'}>{post.like}</td>
        </tr>
    );
};

export default BalancegameItem;