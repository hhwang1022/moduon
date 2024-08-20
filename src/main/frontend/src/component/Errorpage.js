import './Errorpage.css';
import { useParams } from "react-router-dom";

const Errorpage = () => {
    const errorcode = useParams().errorcode;

    // eslint-disable-next-line no-restricted-globals
    history.pushState(null,null,'/error');

    return(
        <body className="bluebody">
        <div class="container">
        <div class="sad-face">
        {":("}
        </div>    
        <p class="upper">Your web page ran into a problem and need your attention. We have already collected some error info.</p>
        <p class="lower">{"if you'd like to know more, you can search online for this error : " + (errorcode === undefined ? "404 NotFound" : errorcode) }</p>
        </div>
        </body>
    );
}

export default Errorpage;;