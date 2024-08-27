import './InstarIcon.css';

const InstarIcon = ({ imgurl, name, onClickHandler }) => {

  return (
    <button onClick={onClickHandler}>
      <div className="presentation_profile">
        <div className="presentation_profile_image">
          <div className="presentation_profile_image_border"></div>
          <img src={imgurl} className='presentation_profile_image_canvas'></img>
          <div className="presentation_profile_image_canvas profile_love"></div>
        </div>
        <a className="presentation_profile_name">{name}</a>
      </div>
    </button>
  );
}

export default InstarIcon;