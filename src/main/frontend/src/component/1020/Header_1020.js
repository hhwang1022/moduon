import InstarIcon from "./InstarIcon";
import './Header_1020.css';
import { useNavigate, useParams } from "react-router-dom";

const Header_1020 = ({ title, setcurrentindex }) => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="header">
        <span>𝑴𝒐𝒅𝒖𝒐𝒏</span>
        <div className="right">
          <img className="padding" src="https://cdn-icons-png.flaticon.com/512/25/25424.png" width={30} height={30} />
          <img className="padding" src="https://cdn-icons-png.flaticon.com/512/109/109594.png" width={30} height={30} />
          <img className="padding" src="https://cdn-icons-png.flaticon.com/512/13/13267.png" width={30} height={30} />
        </div>
      </div>
      <div className="header">
        <InstarIcon imgurl={"https://image.dongascience.com/Photo/2019/12/fb4f7da04758d289a466f81478f5f488.jpg"} name={"80-90"}
          onClickHandler={() => {
            navigate('/main_8090');
          }}
        ></InstarIcon>
        <InstarIcon imgurl={"https://image.dongascience.com/Photo/2019/12/fb4f7da04758d289a466f81478f5f488.jpg"} name={"90-00"}
          onClickHandler={() => {
            navigate('/main_9000');
          }}
        ></InstarIcon>
        <InstarIcon imgurl={"https://image.dongascience.com/Photo/2019/12/fb4f7da04758d289a466f81478f5f488.jpg"} name={"00-10"}
          onClickHandler={() => {
            navigate('/main_0010');
          }}
        ></InstarIcon>
        <InstarIcon imgurl={"https://image.dongascience.com/Photo/2019/12/fb4f7da04758d289a466f81478f5f488.jpg"} name={"10-20"}
          onClickHandler={() => {
            navigate('/main_1020');
          }}
        ></InstarIcon>
        <div class='vline'></div>
        <InstarIcon imgurl={"https://image.dongascience.com/Photo/2019/12/fb4f7da04758d289a466f81478f5f488.jpg"} name={"투표"}
        onClickHandler={() =>{
          setcurrentindex(0);
        }}
        ></InstarIcon>
        <InstarIcon imgurl={"https://image.dongascience.com/Photo/2019/12/fb4f7da04758d289a466f81478f5f488.jpg"} name={"갤러리"}
        onClickHandler={() =>{
          setcurrentindex(1);
        }}
        ></InstarIcon>
        <InstarIcon imgurl={"https://image.dongascience.com/Photo/2019/12/fb4f7da04758d289a466f81478f5f488.jpg"} name={"게시판"}
        onClickHandler={() =>{
          setcurrentindex(0);
        }}
        ></InstarIcon>
      </div>
      <div class='hline'></div>
      <div className="header title">
        {title}
        <div className="right">
          <img className="padding" src="https://static-00.iconduck.com/assets.00/plus-icon-512x512-q1puivky.png" width={30} height={30} />
          <img className="padding" src="https://w7.pngwing.com/pngs/968/90/png-transparent-computer-icons-bullet-list-miscellaneous-angle-text-thumbnail.png" width={30} height={30} />
        </div>
      </div>
    </div>
  );
};

export default Header_1020;