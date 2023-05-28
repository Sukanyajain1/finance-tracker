import React, {useEffect, useState} from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';

const TopNav = (props) => {

    const {logOut, currentUser, showAdminBoard} = props;

    const history = useHistory();
    
    const logOutHandler = ()=> {
        logOut();
        history.push("/home")
        // {<Redirect to="/home"></Redirect>}
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">Sukanya's Finance Tracker</Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">Home</Link>
                    </li>

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">Admin Board</Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/dashboard"} className="nav-link">User</Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">{currentUser.firstName}'s Profile</Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOutHandler}>Log out</a>
                        </li>
                    </div>
                    ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">Login</Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">Register</Link>
                        </li>
                    </div>
                )}
            </nav>
        </div>
    );
};


export default TopNav;