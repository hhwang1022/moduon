import './Balancegameitem.css';
import React, { useState, useEffect } from 'react';

const Balancegameitem = ({ post, generation }) => {

    post.createsat = "10-22";

    return (
        <tr className={'postlist' + generation + 'line'} height="34">
            <td className={'postitem' + generation + 'newtext'}>new</td>
            <td className={'postlist' + generation + 'text'}><button>{post.title}</button></td>
            <td className={'postlist' + generation + 'text'}>{post.nickname}</td>
            <td className={'postlist' + generation + 'text'}>{post.createsat}</td>
            <td className={'postlist' + generation + 'text'}>{post.view}</td>
            <td className={'postlist' + generation + 'text'}>{post.like}</td>
        </tr>);
};

export default Balancegameitem;
