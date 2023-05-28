import React, { Component } from "react";
import { useHistory } from "react-router-dom";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
    };

const AuthVerify = ({logOut}) =>{
    const history = useHistory();

    history.listen(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            const decodedJwt = parseJwt(user.accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
            logOut();
            }
        }
    });
    return <div></div>;
}

export default AuthVerify;