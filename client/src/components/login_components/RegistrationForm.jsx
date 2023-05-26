import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import '../../App.css';

const RegistrationForm = () => {

    //form info stored in state variables 
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");

    let [formErrors, setFormErrors] = useState({})

    const history = useHistory();


    const register = (e)=>{
        e.preventDefault();
        //objectify the info 
        let formInfo = {firstName,lastName,email,password,confirm};
        axios.post("http://localhost:8000/api/users/register", formInfo, {withCredentials:true})
            .then(res=>{
                console.log("res after registering", res)
                if(res.data.errors){
                    setFormErrors(res.data.errors)
                }else{
                    //redirect to dashboard
                    history.push("/dashboard")

                }
            })
            .catch(err=>{
                console.log("err after register", err)
            })
        
    }

    return (
        <div>
            <h3>Register</h3> 
            <form onSubmit={register}>
                <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstName" id="" className = 'form-control' onChange={(e)=>setFirstName(e.target.value)} />
                    <p className="text-danger">{formErrors.firstName?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input type="text" name="lastName" id="" className = 'form-control' onChange={(e)=>setLastName(e.target.value)} />
                    <p className="text-danger">{formErrors.lastName?.message}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" id="" className = 'form-control' onChange={(e)=>setEmail(e.target.value)} />
                    <p className="text-danger">{formErrors.email?.message}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="" className = 'form-control' onChange={(e)=>setPassword(e.target.value)} />
                    <p className="text-danger">{formErrors.password?.message}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name="confirm" id="" className = 'form-control' onChange={(e)=>setConfirm(e.target.value)} />
                    <p className="text-danger">{formErrors.confirm?.message}</p>

                </div>
                <input type="submit" value="Register" className="btn btn-primary mt-3" />
            </form>
        </div>
    );
};


export default RegistrationForm;