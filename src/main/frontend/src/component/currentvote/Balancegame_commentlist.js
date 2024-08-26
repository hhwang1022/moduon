import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Balancegame_commentlist.css';
import Balancegame_commentlistItem from './Balancegame_commentlistItem';
import memberInfo from "../../MemberInfo";

const info = memberInfo.getMemberInfo();
const Balancegame_commentlist = ({ generation, balanceGameId, commentListUpdated, setCommentListUpdated, value}) => {
    const scrollableDivRef = useRef(null);
    const [commentList, setCommentList] = useState([]);
    const username = useState(info.name);

     let accessToken = window.localStorage.getItem('accessToken');
     const fetchReply = async () => {
        if (!balanceGameId) return;

        try {
              const response = await axios.get(process.env.REACT_APP_API_URL + 'balancegames/this-week?'
              + 'page=' + 1 + '&size=' + 100 + '&generation=' + generation, {
             headers: { Authorization: `Bearer ${accessToken}` }
             });

             const data = response.data.data[0];
             //console.log(data);
             // if(Array.isArray(data.balanceGameReplesiList)) {
                setCommentList(data.balanceGameReplesiList);
                console.log(commentList);
             // } else {
             //    setCommentList([]);
             // }
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

  const handleDeleteReply = async (isDeleted,commentId) => {
      if (!isDeleted) return;
      try {
        const response = await axios.delete(
          process.env.REACT_APP_API_URL + 'balancegames/' + balanceGameId + '/reply/' + commentId,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          });
        setCommentListUpdated(true);
      } catch (error) {
        console.error("comment delete: ", error);
      }
  }

  const handUpdateReply = async (isUpdate, commentId) => {
    if (!isUpdate) return;
    try {
      const response = await  axios.patch(
        process.env.REACT_APP_API_URL + 'balancegames/' + balanceGameId + '/reply/' + commentId,
        {
          body: value
        } ,
        {   'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${accessToken}`,
          },
        });
      setCommentListUpdated(true);
    } catch (error) {
      console.error("comment update: ", error);
    }
  }

  return (
        <div>
            <div id='scrollableDiv' ref={scrollableDivRef} className={`balancegame-comments${generation}box`}>
                {commentList.map((x, index) => (
                  <Balancegame_commentlistItem
                    key={index} comment={x} generation={generation}
                    onDeleted={handleDeleteReply} username={username} onUpdate={handUpdateReply}></Balancegame_commentlistItem>
                ))}
            </div>
        </div>
    );
};

export default Balancegame_commentlist;
