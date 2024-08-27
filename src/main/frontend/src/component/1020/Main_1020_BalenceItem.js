import './Main_1020_BalenceItem.css';

const Main_1020_BalenceItem = ({ img, title, iswin }) => {
  const winicon = require('../../resource/balancewinicon.png');

  return (
    <span className='item'>
      <img className='mainbalancegameitemimg' src={img} height={200} width={200}></img>
      {iswin ? <div className="mainbalancegameitemimgsticker">
            <img src={winicon} />
        </div> : <></>}
      <a>{title}</a>
    </span>
  );
};

export default Main_1020_BalenceItem;
