import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const LoginForm = () => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [loginformErrors, setloginFormErrors] = useState("")

    const history = useHistory();
    

    const login = (e)=>{
        e.preventDefault();
        //put the form info in an object (objectify it lol)
        let formInfo = {email,password};
        axios.post("http://localhost:8000/api/users/login", formInfo, {withCredentials:true})
            .then(res=>{
                console.log("response when logging in!", res)
                if(res.data.error){
                    setloginFormErrors(res.data.error)
                }else{
                    history.push("/dashboard")
                }
            })
            .catch(err=>console.log("err when logging in: ", err))
    }

    return (
        <div>
            <h3>Login</h3> 
            <form onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" id="" className = 'form-control' onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="" className = 'form-control' onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <p className="text-danger">{loginformErrors}</p>
                
                <input type="submit" value="Login" className="btn btn-secondary mt-3" />
            </form>
        </div>
    );
};

LoginForm.propTypes = {};

export default LoginForm;