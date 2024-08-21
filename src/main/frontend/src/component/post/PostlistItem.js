import InstarIcon from '../1020/InstarIcon';
import './PostlistItem.css';
import React, { useState, useEffect } from 'react';

const PostlistItem = ({ post, generation }) => {

    let getDayDiffDay = (createsat) =>
        (new Date() - new Date(createsat)) / (1000 * 3600);

    const simpleday = (day) =>
    (
        // yyyy-mm-dd
        `${new Date(day).getFullYear()}-
          ${(new Date(day).getMonth() + 1).toString().padStart(2, '0')}-
          ${new Date(day).getDate().toString().padStart(2, '0')}`
    );

    return (
        (generation === "1020" ?
            <div className={'postlist' + generation + 'line'}>
                <div className={'postlist' + generation + 'item'}>
                    <InstarIcon imgurl={"https://www.animals.or.kr/api/files/thumbnails/51386-02422bb9-0420-4d99-b33e-24f541c3b269.jpg"} />
                    <div className={'postlist' + generation + 'body'}>
                        <div>
                            <td className={'postlist' + generation + 'text'}>{post.nickname + "\u00a0"}</td>
                            <td className={'postlist' + generation + 'date'}>{simpleday(post.createsat) + "\u00a0"}</td>
                            {getDayDiffDay(post.createsat) <= 2.0 ? <td className={'postitem' + generation + 'newtext'}>new</td> : <></>}
                            {post.like >= 10 ? <td className={'postitem' + generation + 'hottext'}>hot</td> : <></>}
                        </div>
                        <td className={'postlist' + generation + 'text'}><button>{post.title}</button></td>
                        <div>
                            <td className={'postlist' + generation + 'text'}><img src='https://cdn-icons-png.flaticon.com/512/1077/1077057.png' height={16} width={16}/>{post.view}</td>
                            <td className={'postlist' + generation + 'text'}><img src='https://cdn-icons-png.flaticon.com/512/6611/6611465.png' height={16} width={16}/>{post.likeCount}</td>

                        </div>
                    </div>
                </div>
            </div>
            : <tr className={'postlist' + generation + 'line'} height="34">
                {getDayDiffDay(post.createsat) <= 2.0 ? <td className={'postitem' + generation + 'newtext'}>new</td> : <></>}
                {post.like >= 10 ? <td className={'postitem' + generation + 'hottext'}>hot</td> : <></>}
                <td className={'postlist' + generation + 'text'}><button>{post.title}</button></td>
                <td className={'postlist' + generation + 'text'}>{post.nickname}</td>
                <td className={'postlist' + generation + 'text'}>{post.createsat}</td>
                <td className={'postlist' + generation + 'text'}>{post.view}</td>
                <td className={'postlist' + generation + 'text'}>{post.likeCount}</td>
            </tr>
        )

    );
};

export default PostlistItem;
