import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import Dashboard from '../tracker_components/expense/Dashboard';
import SideNav from '../nav_components/SideNav';
import ExpenseCategoryForm from '../tracker_components/expense_category/ExpenseCategoryForm';
import NewExpense from '../tracker_components/expense/NewExpense';
import EditExpense from '../tracker_components/expense/EditExpense';
import OneExpense from '../tracker_components/expense/OneExpense';


const MainContent = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [loggedUserCookieToggle, setLoggedUserCookieToggle] = useState();

    const {path} = useRouteMatch();
    const history = useHistory();

    useEffect((props)=>{
        axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials:true})
            .then(res=>{
                console.log("res when getting logged in user", res)
                if(res.data.results){
                    //this means the user is logged in and can accees this page
                    setLoggedInUser(res.data.results)
                    console.log("Logged User Info: ", loggedInUser)
                }
            })
            .catch(err=>{
                //this means someone who is not logged in tried to access the dashboard
                console.log("err when getting logged in user", err)
                history.push("/signin")
            })
    }, [props.loggedUserCookieToggle]);

    return (
        <>
            <div className="row">
                <div className="col-2 bg-dark">
                {/* the nav component to be flexed with main component */}
                <SideNav></SideNav>
                </div>
                <div className="col bg-light">
                    <Switch>
                        {/* The dashboard route */}
                            {console.log("dashboard")}
                        <Route path = {`${path}/dashboard`}>
                            <h1>hello</h1>
                            <Dashboard loggedUserCookieToggle={loggedUserCookieToggle} setLoggedUserCookieToggle={setLoggedUserCookieToggle} loggedInUser={loggedInUser}></Dashboard>
                        </Route>
                        {/* The expense form route */}
                        <Route path = {`${path}/expenses/new`}>
                            <NewExpense loggedUserCookieToggle={loggedUserCookieToggle} setLoggedUserCookieToggle={setLoggedUserCookieToggle}></NewExpense>
                        </Route>
                        {/* The expense form route */}
                        <Route path = {`${path}/expenses/update/:id`}>
                            <EditExpense loggedUserCookieToggle={loggedUserCookieToggle} setLoggedUserCookieToggle={setLoggedUserCookieToggle}></EditExpense>
                        </Route>
                        {/* The expense form route */}
                        <Route path = {`${path}/expenses/show_one/:id`}>
                            <OneExpense loggedUserCookieToggle={loggedUserCookieToggle} setLoggedUserCookieToggle={setLoggedUserCookieToggle}></OneExpense>
                        </Route>
                        {/* The categories form route
                        <Route path = {`${path}/categories`}>
                            <Dashboard loggedUserCookieToggle={loggedUserCookieToggle} setLoggedUserCookieToggle={setLoggedUserCookieToggle} loggedInUser={loggedInUser}></Dashboard>
                        </Route> */}
                        {/* The categories form route */}
                        <Route path = {`${path}/categories/new`}>
                            <ExpenseCategoryForm loggedUserCookieToggle={loggedUserCookieToggle} setLoggedUserCookieToggle={setLoggedUserCookieToggle}></ExpenseCategoryForm>
                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default MainContent;