import Postlist from './Postlist';
import './PostlistItem.css';
import React, { useState, useEffect } from 'react';
import Postwrite from './Postwrite';
import Postview from './Postview';

const Postboard = ({ generation }) => {

    const[currentindex, setcurrentindex] = useState(0);

    const Page = ({currentindex}) => {
        if(currentindex === 0){
            return (
                <Postlist generation={generation} onClickwirtebtn={() => {
                    setcurrentindex(1);
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
                <Postview generation={generation} />
            );
        }
      };

    return (
        <Page currentindex={currentindex}/>
    );
};

export default Postboard;
