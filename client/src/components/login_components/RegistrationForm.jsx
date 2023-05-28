import React, {useState, useRef} from 'react';
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";


const RegistrationForm = () => {

    let [formErrors, setFormErrors] = useState({})
    const form = useRef();
    const checkBtn = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    // formInfo will be filled with info about the ninja we want to update
    const [formInfo, setFormInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: ""
    });

    // changehandler to update the formInfo object with the information from the form
    const changeHandler = (e)=>{
        console.log("changing the form!")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        });
        console.log("THE FORM INFO STATE VARIABLE: ", formInfo)
    }
    const handleRegister = (e)=>{
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();
        const {firstName, lastName, email, password, confirm} = formInfo;
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(firstName, lastName, email, password, confirm).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    setFormErrors(error.errors);
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                    />
                <h3>Register</h3> 
                <form onSubmit={handleRegister}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="">First Name</label>
                                <input type="text" name="firstName" id="" className = 'form-control' onChange={changeHandler} />
                                <p className="text-danger">{formErrors.firstName?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="lastName" id="" className = 'form-control' onChange={changeHandler} />
                                <p className="text-danger">{formErrors.lastName?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input type="text" name="email" id="" className = 'form-control' onChange={changeHandler} />
                                <p className="text-danger">{formErrors.email?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" id="" className = 'form-control' onChange={changeHandler} />
                                <p className="text-danger">{formErrors.password?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Confirm Password</label>
                                <input type="password" name="confirm" id="" className = 'form-control' onChange={changeHandler} />
                                <p className="text-danger">{formErrors.confirm?.message}</p>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                        <div
                            className={ successful ? "alert alert-success" : "alert alert-danger" }
                            role="alert"
                        >
                            {message}
                        </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};


export default RegistrationForm;