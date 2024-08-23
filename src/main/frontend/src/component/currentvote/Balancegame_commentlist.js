import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Balancegame_commentlist.css';
import Balancegame_commentlistItem from './Balancegame_commentlistItem';

const Balancegame_commentlist = ({ generation, balanceGameId, commentListUpdated, setCommentListUpdated }) => {
    const scrollableDivRef = useRef(null);
    const [commentList, setCommentList] = useState([]);

//    const [nickname, setNickname] = useState('');
//    const [content, setContent] = useState('');
//    const [isCreate, setIsCreate] = useState(false);
//

     let accessToken = window.localStorage.getItem('accessToken');

     const fetchReply = async () => {
        if (!balanceGameId) return;

        try {
              const response = await axios.get('http://127.0.0.1:8080/balancegames/' + balanceGameId + '/reply?'
              + 'page=' + 1 + '&size=' + 100, {
             headers: { Authorization: `Bearer ${accessToken}` }
             });

             const data = response.data.data;
             if(Array.isArray(data)) {
                setCommentList(data);
             } else {
                setCommentList([]);
             }
         } catch (error) {
             console.error("Error fetching Reply: ", error);
             setCommentList([]);
        }
     };

    useEffect(() => {
        fetchReply();
    }, [balanceGameId, commentListUpdated]);

    useEffect(() => {
        const scrollableDiv = scrollableDivRef.current;
        if (scrollableDiv) {
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }
    }, [commentList]);

    useEffect(() => {
        if(commentListUpdated) {
            setCommentListUpdated(false);
        }
    }, [commentListUpdated, setCommentListUpdated])

    return (
        <div>
            <div id='scrollableDiv' ref={scrollableDivRef} className={`balancegame-comments${generation}box`}>
                {commentList.map((x, index) => (
                    <Balancegame_commentlistItem key={index} comment={x} generation={generation} />
                ))}
            </div>
        </div>
    );
};

export default Balancegame_commentlist;