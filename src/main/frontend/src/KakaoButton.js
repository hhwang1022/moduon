import React, { useEffect } from 'react';

const KakaoButton = ({url, title, description, imageUrl}) => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
      }, []);


      //TODO: 서버에 요청한 뒤 성공하면 하게 수정해야함
    const shareKakao = (url, title,description, imageUrl ) => {
        if (window.Kakao) {
          const kakao = window.Kakao;
          if (!kakao.isInitialized()) {
            kakao.init("");
          }
      
          kakao.Link.sendDefault({
            objectType: "feed",
            content: {
              title: title,
              description: description,
              imageUrl: imageUrl,
              link: {
                mobileWebUrl: url,
                webUrl: url
              }
            },
            buttons: [
              {
                title: "title",
                link: {
                  mobileWebUrl: url,
                  webUrl: url
                }
              }
            ]
          });
        }
  };

  return <button onClick={() => shareKakao(url, title, description, imageUrl)} className="likebtn">
           <img src={"https://i.imgur.com/QaKbG3n.png"} referrerpolicy="no-referrer" />
         </button>;
};

export default KakaoButton;