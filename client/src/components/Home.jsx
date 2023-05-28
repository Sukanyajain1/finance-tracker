import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        console.log("IN THE HOME COMPONENT NOW")
        UserService.getPublicContent().then(
        (response) => {
            setContent(response.data);
            console.log("This is the Home page response: ", response);
            console.log("This is the Home page content: ", content.msg);
            console.log("This is the Home page content: ");
        },
        (error) => {
            const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

            setContent(_content);
        }
        );
    }, []);

    return (
        <div className="container">
            <h1> hello </h1>
        <header className="jumbotron">
        </header>
        </div>
    );
};

export default Home;