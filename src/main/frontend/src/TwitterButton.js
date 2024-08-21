const TwitterButton = ({url, title, description, onclickhandler}) => {
    const shareTwitter = (url, title, description ) => {
        window.open("https://twitter.com/intent/tweet?text=" + title + "\n" + description + "&url=" + url);
  };

  return <button onClick={() => shareTwitter(url, title, description)} className="sharebtn">
           <img className="w-12 h-12" src={"https://i.imgur.com/r58bivv.png"} referrerpolicy="no-referrer" />
         </button>;
};

export default TwitterButton;
