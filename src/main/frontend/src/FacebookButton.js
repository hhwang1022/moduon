const FacebookButton = ({url}) => {

  //TODO: 서버에 요청한 뒤 성공하면 하게 수정해야함
    const shareFacebook = (url) => {
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + url);
  };

  return <button onClick={() => shareFacebook(url)} className="sharebtn">
           <img className="w-12 h-12" src={"https://i.imgur.com/gtRnCB0.png"} referrerpolicy="no-referrer" />
         </button>;
};

export default FacebookButton;
