import './Main_1020_BalenceItem.css';

const Main_1020_BalenceItem = ({ img, title }) => {


  return (
    <span className='item'>
      <img src={img} height={200} width={200}></img>
      <a>{title}</a>
    </span>
  );
};

export default Main_1020_BalenceItem;
