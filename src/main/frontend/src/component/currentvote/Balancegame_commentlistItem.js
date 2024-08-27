import './Balancegame_commentlistItem.css';
import React, {useState, useEffect} from 'react';
import memberInfo from "../../MemberInfo";

const Balancegame_commentlistItem = ({comment, generation, onDeleted, username, onUpdate, onPostReplyDeleted, onPostReplyUpdate, isLoggedIn}) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentUpdated, setCommentUpdated] = useState(false);

  let info = memberInfo.getMemberInfo();
  const clickDeleteButton = () => {
      setCommentDeleted(true);
      if (comment.balanceGameReplyId !== undefined) {
        setCommentId(comment.balanceGameReplyId);
        return;
      }
      if (comment.postReplyId !== undefined) {
        setCommentId(comment.postReplyId);
        return;
      }
      if (comment.photoReplyId !== undefined) {
        setCommentId(comment.photoReplyId);
        return;
      }
    };

  const clickUpdateButton = () => {
    setCommentUpdated(true);
    if (comment.balanceGameReplyId !== undefined) {
      setCommentId(comment.balanceGameReplyId);
      return;
    }
    if (comment.postReplyId !== undefined) {
      setCommentId(comment.postReplyId);
      return;
    }
    if (comment.photoReplyId !== undefined) {
      setCommentId(comment.photoReplyId);
      return;
    }
  };

  useEffect(() => {
    if (info.name === comment.memberNickname) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  })

  useEffect(() => {
    if (!commentDeleted) return;
    onDeleted(commentDeleted,commentId)
    setCommentDeleted(false);
    setCommentId(null);
  }, [commentDeleted]);

  useEffect(() => {
    if (!commentUpdated) return;
    onUpdate(commentUpdated, commentId)
    setCommentUpdated(false);
    setCommentId(null);
  }, [commentUpdated]);

    return (
      <div className={'balancegame-commentlist' + generation + 'box'}>
        <div className={'balancegame-commentlist' + generation + 'nickname'}>{comment.memberNickname + ' :'}</div>
        <div className={'balancegame-commentlist' + generation + 'content'}>{comment.body}</div>
        <div className={'balancegame-commentlist-button' + generation}>
        {isLoggedIn && isButtonVisible && (
          <button className={'balancegame-commentlist-update-button' + generation} onClick={clickUpdateButton}>수정</button>
        )}
        {isLoggedIn && isButtonVisible && (
          <button className={'balancegame-commentlist-delete-button' + generation} onClick={clickDeleteButton}>삭제</button>
        )}

        </div>
      </div>
    );

};

export default Balancegame_commentlistItem;
