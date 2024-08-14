import { useNavigate } from "react-router-dom";

const QnaListComponent = ({ qna }) => {

    const navigate = useNavigate();

    let getDayDiffDay = (createdAt) =>
        (new Date() - new Date(createdAt)) / (1000 * 3600);
    
    let name = (email) => email.split('@')[0];

    const simpleday = (day) =>
        (
          // yyyy-mm-dd
          `${new Date(day).getFullYear()}-
          ${(new Date(day).getMonth() + 1).toString().padStart(2, '0')}-
          ${new Date(day).getDate().toString().padStart(2, '0')}`
        );

  return (<li className="qnabtn" key={qna.qnaId}>
    <button className='likebtn' onClick={() => {
      //아이디 넘겨주기
      navigate('/qna/' + qna.qnaId);
      console.log(qna.qnaId);
    }}>
      <div className="title">{qna.lock === 1 ? '🔒' : ''}{qna.title}
        {qna.reply ? '✏️' : ''}
        {getDayDiffDay(qna.createdAt) <= 2.0 ? '🆕' : '' }</div>
    </button>
    <span className='rightcontent'>
      <span className='boldtext'>{name(qna.memberName) + '    '} </span>
      <span>{simpleday(qna.createdAt) + '    '} </span>
      <span  className='boldtext'>{'❤️'}{qna.like}{'\t' + '👁️  ' + qna.view}</span> 
      </span>
  </li>);
};

export default QnaListComponent;
