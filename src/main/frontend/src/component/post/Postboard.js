import Postlist from './Postlist';
import './PostlistItem.css';
import React, { useState, useEffect } from 'react';
import Postwrite from './Postwrite';
import Postview from './Postview';

const Postboard = ({ generation }) => {

    const[currentindex, setcurrentindex] = useState(0);
    const[currentpostid, setcurrentpostid] = useState(1);

    
  useEffect(() => {
    console.log("currentpostid : " + currentpostid);
  }, [currentpostid]);

    const Page = ({currentindex}) => {
        if(currentindex === 0){
            return (
                <Postlist generation={generation} onClickwirtebtn={() => {
                    setcurrentindex(1);
                }} onClickreadbtn={(id) => {
                    setcurrentindex(2);
                    setcurrentpostid(id);
                }} />
            );
        }
        else if(currentindex === 1){
            return (
                <Postwrite generation={generation} />
            );
        }
        else{
            return (
                <Postview generation={generation} postid={currentpostid} />
            );
        }
      };

    return (
        <Page currentindex={currentindex}/>
    );
};

export default Postboard;
