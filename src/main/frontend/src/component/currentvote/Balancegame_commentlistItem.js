import './Balancegame_commentlistItem.css';
import React, {useState, useEffect} from 'react';
import memberInfo from "../../MemberInfo";

const Balancegame_commentlistItem = ({comment, generation, onDeleted, username, onUpdate}) => {
  console.log(comment);
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

  const info = memberInfo.getMemberInfo();

  useEffect(() => {
    if (info.name === comment.memberNickname) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  })

  useEffect(() => {
    onDeleted(commentDeleted,balanceGameCommentId)
  }, [commentDeleted])

  useEffect(() => {
    onUpdate(commentUpdated, balanceGameCommentId)
  }, [commentUpdated]);

    return (
      <div className={'balancegame-commentlist' + generation + 'box'}>
        <div className={'balancegame-commentlist' + generation + 'nickname'}>{comment.memberNickname + ' :'}</div>
        <div className={'balancegame-commentlist' + generation + 'content'}>{comment.body}</div>
        <div className={'balancegame-commentlist-button'}>
          {isButtonVisible && (
            <button className={'balancegame-commentlist-update-button'} onClick={clickUpdateButton}>수정</button>
          )}
          {isButtonVisible && (
            <button className={'balancegame-commentlist-delete-button'} onClick={clickDeleteButton}>삭제</button>
          )}
        </div>
      </div>
    );

};

export default Balancegame_commentlistItem;
