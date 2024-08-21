import React from "react";

export const Memberinfo = React.createContext({
    memberinfo: {
        "name": "홍길동",
        "memberid": 1,
        "balancegameticket": 1,
        "generation": "1020",
        "admin": false
    },
    setinfo: () => { }
});
