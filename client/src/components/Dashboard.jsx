import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useHistory } from "react-router-dom";

const Dashboard = () => {

    const history = useHistory();

    let [loggedInUser, setLoggedInUser] = useState({})
    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials:true})
            .then(res=>{
                console.log("res when getting logged in user", res)
                if(res.data.results){
                    //this means the user is logged in and can accees this page
                    setLoggedInUser(res.data.results)
                }
            })
            .catch(err=>{
                //this means someone who is not logged in tried to access the dashboard
                console.log("err when gettign logged in user", err)
                history.push("/")

            })
    }, [])

    const logout = ()=>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                history.push("/")
            })
            .catch(err=>{
                console.log("errrr logging out", err)
            })
    }
    return (
        <div>
            <h1>Welcome {loggedInUser.firstName}, you're in the dashboard! Congrats on being a registered user!</h1>
            <button onClick = {logout} className="btn btn-info">Log Out</button>
        </div>
    );
};


export default Dashboard;