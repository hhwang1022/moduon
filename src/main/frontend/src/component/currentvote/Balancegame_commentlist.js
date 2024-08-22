import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Balancegame_commentlist.css';
import Balancegame_commentlistItem from './Balancegame_commentlistItem';

const Balancegame_commentlist = ({ generation, onClickwirtebtn }) => {
    const scrollableDivRef = useRef(null);

    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');
    const [isCreate, setIsCreate] = useState(false);
    const [commentList, setCommentList] = useState([]);

     let accessToken = window.localStorage.getItem('accessToken');

      const getCategoryByGeneration = (generation) => {
                 switch (generation) {
                     case "8090":
                         return "CATEGORY_8090";
                     case "9000":
                         return "CATEGORY_9000";
                     case "0010":
                         return "CATEGORY_0010";
                     case "1020":
                         return "CATEGORY_1020";
                     default:
                         return "CATEGORY_1020";  // 기본값 설정
                 }
             };

    useEffect(() => {
     const fetchReply = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/balancegames/this-week?'
             + 'page=' + 1 + '&size=' + 10 + '&generation=' + generation, {
             headers: { Authorization: `Bearer ${accessToken}` }
             });

             const data = response.data.data;
             if(data && data.length > 0) {
                    const voteData = data[1];
                    setNickname(voteData.nickname);
                    setContent(voteData.body);
             }
         } catch (error) {
             console.error("Error fetching Reply: ", error);
        }
     };

     fetchReply();
    }, [accessToken, isCreate]);


    useEffect(() => {
        const scrollableDiv = scrollableDivRef.current;
        if (scrollableDiv) {
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }
    }, [commentList]);

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