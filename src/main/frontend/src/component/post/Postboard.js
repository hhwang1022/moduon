import InstarIcon from '../1020/InstarIcon';
import './PostlistItem.css';
import React, { useState, useEffect } from 'react';

const Postboard = ({ generation }) => {

    const Page = () => {
        if(currentindex === 0){
            return (
                <Postlist generation={"0010"} />
            );
        }
        else if(currentindex === 1){
            return (
                <Photolist generation={"0010"} />
            );
        }
        else{
            return (
                <Currentvote_board generation={"0010"} />
            );
        }
      };

    return (
        (generation === "1020" ?
            <div className={'postlist' + generation + 'line'}>
                <div className={'postlist' + generation + 'item'}>
                    <InstarIcon imgurl={"https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"} />
                    <div className={'postlist' + generation + 'body'}>
                        <div>
                            <td className={'postlist' + generation + 'text'}>{post.nickname + "\u00a0"}</td>
                            <td className={'postlist' + generation + 'date'}>{post.createsat + "\u00a0"}</td>
                            <td className={'postitem' + generation + 'newtext'}>new</td>
                        </div>
                        <td className={'postlist' + generation + 'text'}><button>{post.title}</button></td>
                        <div>
                            <td className={'postlist' + generation + 'text'}><img src='https://cdn-icons-png.flaticon.com/512/1077/1077057.png' height={16} width={16}/>{post.view}</td>
                            <td className={'postlist' + generation + 'text'}><img src='https://cdn-icons-png.flaticon.com/512/6611/6611465.png' height={16} width={16}/>{post.like}</td>
                        </div>
                    </div>
                </div>
            </div>
            : <tr className={'postlist' + generation + 'line'} height="34">
                <td className={'postitem' + generation + 'newtext'}>new</td>
                <td className={'postlist' + generation + 'text'}><button>{post.title}</button></td>
                <td className={'postlist' + generation + 'text'}>{post.nickname}</td>
                <td className={'postlist' + generation + 'text'}>{post.createsat}</td>
                <td className={'postlist' + generation + 'text'}>{post.view}</td>
                <td className={'postlist' + generation + 'text'}>{post.like}</td>
            </tr>
        )

    );
};

export default Postboard;
