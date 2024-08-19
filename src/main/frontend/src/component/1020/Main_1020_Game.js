import './Main_1020_Game.css';
import Main_1020_BalenceItem from './Main_1020_BalenceItem';
import BalenceBar from '../BalenceBar';


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
          <BalenceBar left={Math.random() * 100} right={Math.random() * 100}></BalenceBar>
        </div>
        <div></div>
        <div className='body'>당신의 선택은?</div>
      </button>
    </div>
  </div>

  );
};

export default Main_1020_Game;
