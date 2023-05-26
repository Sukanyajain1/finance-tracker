import './App.css';
import React, { useState } from 'react';
import SignIn from './components/login_components/SignIn';
import {
  BrowserRouter, //this will enable routing for the application, otherwise the routing will not work
  Switch, //Switch lets us determine which components/ elements need to show up only at certain routes
  Route //Route lets us specify the route url address for an element to show up in 
} from "react-router-dom";
import LoggedHeader from './components/nav_components/LoggedHeader'
import MainContent from './components/tracker_components/MainContent';


function App() {

  return (
    <div className= "background-image">
      <BrowserRouter>
        <div className="dyi-container">
          {/* the fixed header component*/}
          <LoggedHeader></LoggedHeader>

          <Switch>
            {/* The login and register route */}
            <Route exact path = "/signin">
              <SignIn></SignIn>
            </Route>

            {/* ONCE WE'RE LOGGED IN, THIS IS WHAT WE SEE */}
            <Route path = "/tracker">
              <h1>hello to all</h1>
              <MainContent></MainContent>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;