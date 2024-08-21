import React, { useState, useEffect } from 'react';
import Photolist from './Photolist';
import Photowrite from './Photowrite';
import Photoview from './Photoview';

const Photoboard = ({ generation }) => {

    const[currentindex, setcurrentindex] = useState(0);

    const Page = ({currentindex}) => {
        if(currentindex === 0){
            return (
                <Photolist generation={generation} onClickwirtebtn={() => {
                    setcurrentindex(1);
                }} />
            );
        }
        else if(currentindex === 1){
            return (
                <Photowrite generation={generation} />
            );
        }
        else{
            return (
                <Photoview generation={generation} />
            );
        }
      };

    return (
        <Page currentindex={currentindex}/>
    );
};

export default Photoboard;
