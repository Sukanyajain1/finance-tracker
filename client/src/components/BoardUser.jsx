import React, { useState } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardUser = (props) => {
    const [content, setContent] = useState("");

    // const componentDidMount = ()=> {
    //     UserService.getUserBoard().then(
    //     (response) => {
    //         setContent(response.data);
    //         console.log("This is the Board User response: ", response)
    //     },
    //     (error) => {
    //         console.log("This is the Board User error: ", error)
    //         const _content =
    //         (error.response &&
    //             error.response.data &&
    //             error.response.data.message) ||
    //         error.message ||
    //         error.toString();

    //         setContent(_content);
    //     }).catch(err=>{
    //         console.log("This is the Board User error: ", error)
    //         if (error.response && error.response.status === 401) {
    //                 EventBus.dispatch("logout");
    //             }
    //         }
    //     )};

        
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};
export default BoardUser;