import React, {useState, useRef} from 'react';
import { useHistory } from 'react-router-dom';

import AuthService from "../../services/auth.service";

const LoginForm = () => {
    let history = useHistory();
    let [formErrors, setFormErrors] = useState({})


    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");    

    const handleLogin = (e)=>{
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password).then(
                () => {
                    history.push("/profile");
                },
                (error) => {
                    setFormErrors(error.errors);
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
            
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
            } else {
            setLoading(false);
            }
        };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                    />
                <h3>Login</h3> 
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" id="" className = 'form-control' onChange={(e)=>setEmail(e.target.value)}/>
                        <p className="text-danger">{formErrors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="" className = 'form-control' onChange={(e)=>setPassword(e.target.value)}/>
                        <p className="text-danger">{formErrors.password?.message}</p>
                    </div>                    
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;