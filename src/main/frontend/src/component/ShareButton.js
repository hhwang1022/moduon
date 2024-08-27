import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShareButton = ({ sharetype, url, title, description, imageUrl }) => {

    let accessToken = window.localStorage.getItem('accessToken');
    const [currentindex, setcurrentindex] = useState(0);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);


    const handleShare = async () => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + 'members//balancegames/' + 1 + '/share',
                {
                    balanceGameId: 1,
                    shareType: { sharetype }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
                {
                    withCredentials: true
                }
            ).then(response => {
                alert('공유 성공!');
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const shareFacebook = (url) => {
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + url);
    };

    const shareTwitter = (url, title, description) => {
        window.open("https://twitter.com/intent/tweet?text=" + title + "\n" + description + "&url=" + url);
    };

    const shareKakao = (url, title, description, imageUrl) => {
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


    switch (sharetype) {
        case "twitter":
            return (
                <button onClick={() => shareTwitter(url, title, description)} className="sharebtn">
                    <img className="w-12 h-12" src={"https://i.imgur.com/r58bivv.png"} referrerpolicy="no-referrer" />
                </button>
            );
        case "facebook":
            return (
                <button onClick={() => shareFacebook(url)} className="sharebtn">
                    <img className="w-12 h-12" src={"https://i.imgur.com/gtRnCB0.png"} referrerpolicy="no-referrer" />
                </button>
            );
        case "kakao":
            return (
                <button onClick={() => shareKakao(url, title, description, imageUrl)} className="sharebtn">
                    <img src={"https://i.imgur.com/QaKbG3n.png"} referrerpolicy="no-referrer" />
                </button>
            );
    }
};

export default ShareButton;
