import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const LoggedHeader = (props) => {
    const [logButton, setLogButton] = useState(false);
    const history = useHistory();

    const logout = ()=>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                props.logAuthData(false);
                history.push("/signin")
            })
            .catch(err=>{
                console.log("Bada-bab-bab-baahh logging out", err)
            })
    };


    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>this is the logged in user header for the site!</h1>
                <button onClick = {logout} className="btn btn-info">Log Out</button>
            </div>
            <hr />
        </div>
    );
};


export default LoggedHeader;