import './Main_1020_BalenceItem.css';

const Main_1020_BalenceItem = ({ img, title, isleft, iswin }) => {
  const winicon = require('../../resource/balancewinicon.png');

  return (
    <span className='item'>
      <img className='mainbalancegameitemimg' src={img} height={200} width={200}></img>
      {isleft && iswin ? <div className="mainbalancegameitemimgleftsticker"><img src={winicon} /></div> : <div/>}
      {!isleft && iswin ? <div className="mainbalancegameitemimgsrightticker"><img src={winicon} /></div> : <div/>}
      <a>{title}</a>
    </span>
  );
};

export default Main_1020_BalenceItem;
