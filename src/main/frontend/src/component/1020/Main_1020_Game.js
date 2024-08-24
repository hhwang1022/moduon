import './Main_1020_Game.css';
import Main_1020_BalenceItem from './Main_1020_BalenceItem';
import BalanceBar from '../currentvote/BalanceBar';


const Main_1020_Game = ({ position, balancedata, onClickEvent }) => {

  return (<div className={position}>
    <div className='mainbox'>
      <button className='maingamebutton' onClick={onClickEvent}>
        <div className='category'>{balancedata.category}</div>
        <div className='itembox'>
          <Main_1020_BalenceItem img={balancedata.img1} title={balancedata.title1} />
          <span className='gamevs'>
            <span className='gamevsfont'>VS</span>
          </span>
          <Main_1020_BalenceItem img={balancedata.img2} title={balancedata.title2} />
        </div>
        <div className='bodyprogress'>
          <BalanceBar vote1={Math.floor(Math.random() * 10000)} vote2={Math.floor(Math.random() * 10000)} generation={"1020"}></BalanceBar>
        </div>
        <div></div>
        <div className='body'>당신의 선택은?</div>
      </button>
    </div>
  </div>

  );
};

export default Main_1020_Game;