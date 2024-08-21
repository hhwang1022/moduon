import Currentvote_board from '../currentvote/Currentvote_board';
import InstaCurrentvote_board from '../currentvote/InstaCurrentvote_board';
import Balancegamelist from './Balancegamelist';
import Balancegamewrite from './Balancegamewrite';
import React, { useState, useEffect } from 'react';

const Balancegameborad = ({ generation }) => {

    const [currentindex, setcurrentindex] = useState(2);

    const Page = ({ currentindex }) => {
        if (currentindex === 0) {
            return (
                <Balancegamelist generation={generation} onClickwirtebtn={() => {
                    setcurrentindex(1);
                }} />
            );
        }
        else if (currentindex === 1) {
            return (
                <Balancegamewrite generation={generation} />
            );
        }
        else {
            if (generation !== "1020") {
                return (
                    <Currentvote_board generation={generation} />
                );
            } else {
                return (
                    <InstaCurrentvote_board />
                );
            }
        }
    };

    return (
        <Page currentindex={currentindex} />
    );
};

export default Balancegameborad;
