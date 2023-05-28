import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import SideNav from '../nav_components/SideNav';
import Profile from "../Profile";
import BoardUser from "../BoardUser";
// import BoardAdmin from "./components/";
import Dashboard from "./expense/Dashboard";
import NewExpense from "./expense/NewExpense";
import EditExpense from "./expense/EditExpense";
import OneExpense from "./expense/OneExpense";



const MainContent = (props) => {

    const { path } = useRouteMatch();

    return (
        <>
            <div className="row">
                <div className="col-2 bg-dark">
                {/* the nav component to be flexed with main component */}
                <SideNav></SideNav>
                </div>
                <div className="col bg-light">
                    <Switch>
                        <Route path={`${path}/dashboard`}> <Dashboard/> </Route>
                        <Route path={`${path}/profile`}> <Profile/> </Route>
                        <Route path={`${path}/userBoard`}> <BoardUser/> </Route>
                        <Route path={`${path}/new_expense`}> <NewExpense/> </Route>
                        <Route path={`${path}/edit_expense/:id`}> <EditExpense/> </Route>
                        <Route path={`${path}/show_expense/:id`}> <OneExpense/> </Route>
                    </Switch>

                </div>
            </div>
        </>
    );
}

export default MainContent;