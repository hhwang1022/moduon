import React, { useState, useEffect } from 'react';
import Photolist from './Photolist';
import Photowrite from './Photowrite';
import Photoview from './Photoview';

const Photoboard = ({ generation }) => {

    const[currentindex, setcurrentindex] = useState(0);
    const[currentphotoid, setcurrentphotoid] = useState(1);

    useEffect(() => {
        console.log("currentpostid : " + currentphotoid);
      }, [currentphotoid]);

    const Page = ({currentindex}) => {
        if(currentindex === 0){
            return (
                <Photolist generation={generation} onClickwirtebtn={() => {
                    setcurrentindex(1);
                }} onClickreadbtn={(id) => {
                    setcurrentindex(2);
                    setcurrentphotoid(id);
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
                <Photoview generation={generation} photoid={currentphotoid} />
            );
        }
      };

    return (
        <Page currentindex={currentindex}/>
    );
};

export default Photoboard;
