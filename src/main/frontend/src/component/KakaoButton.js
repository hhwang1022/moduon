import React, { useEffect } from 'react';

const KakaoButton = ({url, title, description, imageUrl, onclickhandler}) => {

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
            kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
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
        onclickhandler();
  };

  return <button onClick={() => shareKakao(url, title, description, imageUrl)} className="sharebtn">
           <img src={"https://i.imgur.com/kZ92gcO.png"} referrerPolicy="no-referrer" />
         </button>;
};

export default KakaoButton;
