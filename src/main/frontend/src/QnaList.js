import QnaListComponent from './QnaListComponent';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function QnaList() {
  const [qnaList, setQnas] = useState();
  const [totalpage, settotalpage] = useState(0);
  const [curruntpage, setcurruntpage] = useState(1);
  const [size, setsize] = useState(10);
  const [searchkeyword, setsearchkeyword] = useState('');
  const [sorttype, setsorttype] = useState('SORT_NEW');

  let accessToken = window.localStorage.getItem('accessToken');

  const navigate = useNavigate();

    const handleGetPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/v11/board/qna?' 
          + 'page=' + curruntpage + '&size=' + size + '&sortType=' + sorttype + '&keyword=' + searchkeyword, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.data) {
          if(response.data !== undefined && response.data !== '' ){
            let keys = Object.keys(response.data['data']); //키를 가져옵니다. 이때, keys 는 반복가능한 객체가 됩니다.
            for (let i=0; i<keys.length; i++) {
              let key = keys[i];
              console.log("key : " + key + ", value : " +  response.data[key])
            }
            
            setQnas(response.data['data']);
            setPageinfo(response.data['pageInfo']);
          }
        }
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    };

    const setPageinfo = (pageinfo) => {
      if(pageinfo !== undefined){
        settotalpage(parseInt(pageinfo['totalPages']));
        setcurruntpage(parseInt(pageinfo['page']));
        setsize(parseInt(pageinfo['size']));
      }
    };

    useEffect(() => {
      if(curruntpage > 0 && curruntpage <= totalpage && accessToken !== null){
        handleGetPosts();
        console.log("curruntpage");
      }
      
    }, [curruntpage]);

    useEffect(() => {
      if(accessToken.length > 5){
        console.log("accessToken : " + accessToken);
        handleGetPosts();
      }
      else{
        console.log("!accessToken : " + accessToken);
      }
    }, [accessToken]);

  return  <div>
    <div className= "listheader"></div>
    {qnaList === undefined || qnaList.length === 0 ? 
      <div className='boldtext middlecontent'>목록이 없습니다</div>
    : qnaList.map(
      ({  lock,
          memberName,
          title,
          body,
          like,
          view,
          createdAt,
          qnaStatus,
          reply,
          replyCreatedAt,
          isLike,
          qnaId }) => {
        return (      
          <QnaListComponent 
          qna={{
          lock: lock,
          memberName: memberName,
          parsedDate: createdAt,
          title: title,
          body: body,
          like: like,
          view: view,
          createdAt: createdAt,
          qnaStatus: qnaStatus,
          reply: reply,
          replyCreatedAt: replyCreatedAt,
          isLike : isLike,
          qnaId : qnaId
          }}
      />
          )
      }
    )
    }
    {
      <div className='DOSSaemmul'>
        <div className='pagelist'>
        {[...Array(parseInt(totalpage))].map((n, index) => {
                  return <button className= {curruntpage === index + 1 ? 'pagebtnselect' : 'pagebtn' } onClick={() => setcurruntpage(index + 1)}> {index + 1} </button>
        })}
        </div>
        <div className='rightcontent'>
        <select onChange={(e) =>{
          setsorttype(e.target.value);
        }}>
          <option value="SORT_NEW">새글 순</option>
          <option value="SORT_OLD">오래된글 순</option>
          <option value="SORT_VIEW_MAX">조회수 많은 순</option>
          <option value="SORT_VIEW_MIN">조회수 적은 순</option>
          <option value="SORT_LIKE_MANY">좋아요 많은 순</option>
          <option value="SORT_LIKE_MIN">좋아요 적은 순</option>
        </select>
        <input className='qnasearchbodyinput' type="text" value={searchkeyword} onChange={(e) => setsearchkeyword(e.target.value)} />
        <button className="btn-1 custom-btn" onClick={() => {
          handleGetPosts();
        }}>검색</button>
        <button className="btn-1 custom-btn rightcontent" onClick={() => {
          console.log("질문 작성");
          navigate("/write");
        }}>질문 작성</button>
        </div>
      </div>
    }
    </div>
}

export default QnaList;
