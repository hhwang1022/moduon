import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Balancegame_commentlist.css';
import Balancegame_commentlistItem from './Balancegame_commentlistItem';
import memberInfo from "../../MemberInfo";

let info = memberInfo.getMemberInfo();
const Balancegame_commentlist = ({ generation, balanceGameId, commentListUpdated, setCommentListUpdated, value}) => {
    const scrollableDivRef = useRef(null);
    const [commentList, setCommentList] = useState([]);
    const username = useState(info.name);
    const [isLoggedIn, setIsLoggedIn] = useState(memberInfo.getMemberInfo().login);

     let accessToken = window.localStorage.getItem('accessToken');
     const fetchReply = async () => {
        if (!balanceGameId) return;

        try {
              const response = await axios.get(process.env.REACT_APP_API_URL + 'balancegames/this-week?'
              + 'page=' + 1 + '&size=' + 100 + '&generation=' + generation, {
             headers: { Authorization: `Bearer ${accessToken}` }
             });

             const data = response.data.data[0];
                setCommentList(data.balanceGameReplesiList);
                console.log(commentList);
         } catch (error) {
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
            fetchReply();
            setCommentListUpdated(false);
        }
    }, [commentListUpdated, setCommentListUpdated])

    useEffect(() => {
      const handleInfoUpdate = (updatedInfo) => {
        setIsLoggedIn(updatedInfo.login);

        if (!updatedInfo.login) {
          setTimeout(() => {
            setCommentList([]);  // 로그아웃 시 댓글 리스트 초기화
            setCommentListUpdated(true);  // 상태 업데이트 및 강제 리렌더링
        }, 0);
      } else {
          setCommentListUpdated(true);
      }
  };
    
      memberInfo.subscribe(handleInfoUpdate);
    
      return () => {
        memberInfo.unsubscribe(handleInfoUpdate);
      };
    }, []);
    
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
        alert("투표 삭제 실패");
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
      alert("투표 댓글 업데이트 실패");
    }
  }

  return (
        <div>
            <div id='scrollableDiv' ref={scrollableDivRef} className={`balancegame-comments${generation}box`}>
                {commentList.map((x, index) => (
                  <Balancegame_commentlistItem
                    key={x} comment={x} generation={generation}
                    onDeleted={handleDeleteReply} username={username} onUpdate={handUpdateReply} isLoggedIn={isLoggedIn}></Balancegame_commentlistItem>
                ))}
            </div>
        </div>
    );
};

export default Balancegame_commentlist;
