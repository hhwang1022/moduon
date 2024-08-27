import './Errorpage.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';

const Errorpage = () => {
    const errorcode = useParams().errorcode;
    const errormsg = useParams().errormsg;
    const navigate = useNavigate();

    // eslint-disable-next-line no-restricted-globals
    history.pushState(null,null,'/error');

    useEffect(() => {
    const handlePopState = (event) => {
      // 뒤로 가기 버튼이 눌렸을 때
      navigate(-2); // 두 페이지를 뒤로 이동
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

    return(
        <body className="bluebody">
        <div className="container">
        <div className="sad-face">
        {":("}
        </div>    
        <p className="upper">Your web page ran into a problem and need your attention. We have already collected some error info.</p>
        <p className="lower">{"if you'd like to know more, you can search online for this error : " + (errorcode === undefined ? "404 NotFound" : errorcode) + " : " + errormsg }</p>
        </div>
        </body>
    );
}

export default Errorpage;;