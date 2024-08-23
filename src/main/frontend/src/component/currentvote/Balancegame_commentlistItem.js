import './Balancegame_commentlistItem.css';
import React, {useState, useEffect} from 'react';

const Balancegame_commentlistItem = ({comment, generation}) => {

    return (
        <div className={'balancegame-commentlist' + generation + 'box'}>
            <div className={'balancegame-commentlist' + generation + 'nickname'}>{comment.memberNickname + ' :'}</div>
            <div className={'balancegame-commentlist' + generation + 'content'}>{comment.body}</div>
        </div>
    );

};

export default Balancegame_commentlistItem;