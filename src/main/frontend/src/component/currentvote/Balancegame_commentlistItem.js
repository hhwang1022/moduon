import './Balancegame_commentlistItem.css';
import React, {useState, useEffect} from 'react';
import memberInfo from "../../MemberInfo";

const Balancegame_commentlistItem = ({comment, generation, onDeleted, username, onUpdate, onPostReplyDeleted, onPostReplyUpdate, isLoggedIn}) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [balanceGameCommentId, setBalanceGameCommentId] = useState(null);
  const [commentUpdated, setCommentUpdated] = useState(false);

  const clickDeleteButton = () => {
      setCommentDeleted(true);
      setBalanceGameCommentId(comment.balanceGameReplyId);
    };

  const clickUpdateButton = () => {
    setCommentUpdated(true);
    setBalanceGameCommentId(comment.balanceGameReplyId);
  };

  let info = memberInfo.getMemberInfo();


  useEffect(() => {
    if (info.name === comment.memberNickname) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  })

  useEffect(() => {
    if (!commentDeleted) return;
    onDeleted(commentDeleted,balanceGameCommentId)
    setCommentDeleted(false);
    setBalanceGameCommentId(null);
  }, [commentDeleted]);

  useEffect(() => {
    if (!commentUpdated) return;
    onUpdate(commentUpdated, balanceGameCommentId)
    setCommentUpdated(false);
    setBalanceGameCommentId(null);
  }, [commentUpdated]);

    return (
      <div className={'balancegame-commentlist' + generation + 'box'}>
        <div className={'balancegame-commentlist' + generation + 'nickname'}>{comment.memberNickname + ' :'}</div>
        <div className={'balancegame-commentlist' + generation + 'content'}>{comment.body}</div>
        <div className={'balancegame-commentlist-button'}>
        {isLoggedIn && isButtonVisible && (
          <button className={'balancegame-commentlist-update-button'} onClick={clickUpdateButton}>수정</button>
        )}
        {isLoggedIn && isButtonVisible && (
          <button className={'balancegame-commentlist-delete-button'} onClick={clickDeleteButton}>삭제</button>
        )}

        </div>
      </div>
    );

};

export default Balancegame_commentlistItem;
