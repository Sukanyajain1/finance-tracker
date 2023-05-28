import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter, //this will enable routing for the application, otherwise the routing will not work
  Switch, //Switch lets us determine which components/ elements need to show up only at certain routes
  Route //Route lets us specify the route url address for an element to show up in 
} from "react-router-dom";

import AuthService from "./services/auth.service";

import LoginForm from "./components/login_components/LoginForm";
import RegistrationForm from "./components/login_components/RegistrationForm";
import Home from "./components/Home";
import MainContent from "./components/tracker_components/MainContent.jsx";
import TopNav from "./components/nav_components/TopNav";


// import AuthVerify from "./common/auth-verify"; //replace with eventbus
import EventBus from "./common/EventBus";

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const componentDidMount = ()=> {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
    EventBus.on("logout", () => {
      logOut();
    });
  }

  const componentWillUnmount = ()=> {
    EventBus.remove("logout");
  }
  
  const logOut = () => {
      AuthService.logout();
      setShowAdminBoard(false);
      setCurrentUser(undefined)
  };

  return (
    <div className= "background-image">
        <BrowserRouter>
          <div className="dyi-container">
            {/* the fixed header component*/}
            <TopNav logOut={logOut} showAdminBoard={showAdminBoard} currentUser={currentUser}></TopNav>
            <div>
              <Switch>
                <Route path="/home">
                  <Home/>
                </Route>
                <Route path="/login">
                  <LoginForm/>
                </Route>
                <Route path="/register">
                  <RegistrationForm/>
                </Route>
                <Route path="/my-finance-tracker"> <MainContent/>
                </Route>
              </Switch>
            </div>
          </div>
          {/* <AuthVerify logOut={logOut}/> */}
        </BrowserRouter>
    </div>
  );
}

export default App;