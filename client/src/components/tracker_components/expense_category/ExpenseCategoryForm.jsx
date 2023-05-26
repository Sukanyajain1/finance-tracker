import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';



const ExpenseCategoryForm = () => {

    const history = useHistory();
    const [formInfo, setFormInfo] = useState({
        name: "",
        description: "",
        budgetPercentage: ""
    });

    // state variable to store validaton errors inside of
    const [errors, setErrors] = useState({});

    useEffect((props) => {
        props.setLoggedUserCookieToggle(!props.loggedUserCookieToggle);
    }, []);

    // changehandler to update the formInfo object with the information from the form
    const changeHandler = (e)=>{
        console.log("changing the form!")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    // submit handler
    const submitHandler = (e)=>{
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/categories/new", formInfo)
        .then((res)=>{
            console.log("Response after axios put request: ", res);
            if(res.data.error){
                console.log("ERROR RESULT: ", res.data.error);
                // this means there are validation errors we need to save
                setErrors(res.data.error.errors);
            }
            else{// else means there are no errors, so we can clear our the state variables to clear out the form
                console.log("FORM INFO OBJECT: ", formInfo);
                setFormInfo({
                    name: "",
                    description: "",
                    budgetPercentage: ""
                });

                // clear out any past error messages
                setErrors({});
                
                history.push("/dashboard") //redirect after updataing form
            }
        })
        .catch(err=>{
            console.log("Axios POST Route error: ", err)
        })
    }    
    
    return (
        <>
            <form onSubmit={submitHandler} action="" className="">
                <div className="form-group">
                    <label htmlFor="">Category name:</label>
                    <input type="text" name="name" id="" className="form-control" onChange={changeHandler} value={formInfo.name}/>
                    <p className="text-danger">{errors.name?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Description:</label>
                    <input type="text" name="description" id="" className="form-control" onChange={changeHandler}  value={formInfo.description}/>
                    <p className="text-danger">{errors.description?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Budget Percentage:</label>
                    <input type="number" name="budgetPercentage" id="" className="form-control" onChange={changeHandler}  value={formInfo.budgetPercentage}/>
                    <p className="text-danger">{errors.budgetPercentage?.message}</p>
                </div>
                <input type="submit" value="Add Expense Category" className='btn btn-success'/>
            </form>
        </>
    );
}
export default ExpenseCategoryForm;
