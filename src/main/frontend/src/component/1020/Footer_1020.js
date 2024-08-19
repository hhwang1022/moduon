import './Footer_1020.css';

const Footer_1020 = ({ title }) => {
  return (
    <div>
      <div className="header">
        <div className="left">
          <img className="padding" src="https://cdn-icons-png.flaticon.com/512/25/25424.png" width={30} height={30} />
          <img className="padding" src="https://cdn-icons-png.flaticon.com/512/109/109594.png" width={30} height={30} />
          <img className="padding" src="https://cdn-icons-png.flaticon.com/512/13/13267.png" width={30} height={30} />
        </div>
        <div className='middle'>
          <div className='balencegame_scroll_btncontent'>
            <div className="balencegame_scroll_btn_active"></div>
            <div className="balencegame_scroll_btn_unactive"></div>
            <div className="balencegame_scroll_btn_unactive"></div>
            <div className="balencegame_scroll_btn_unactive"></div>
            <div className="balencegame_scroll_btn_unactive"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer_1020;