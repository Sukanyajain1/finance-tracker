import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import { useHistory } from 'react-router-dom';



const NewExpense = (props) => {
    const history = useHistory();
    const [errors, setErrors] = useState({});

    // useEffect((props) => {
    //     const message = "Toggled to the new expense component"
    //     props.logToggler(message);
    // }, []);


    // formInfo will be filled with info about the ninja we want to update
    const [formInfo, setFormInfo] = useState({
        name: "",
        vendor: "",
        price: null,
        memo: "",
        user_id: null,
        category_id: null,
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

    // submitHandler for when the form submits we send this date to backend to create a new object
    const submitHandler = (e)=>{
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/expenses/new", formInfo)
        .then((res)=>{
            console.log("Response after axios put request: ", res);
            if(res.data.error){
                // this means there are validation errors we need to save
                setErrors(res.data.error.errors);
            }
            else{// else means there are no errors, so we can clear our the state variables to clear out the form
                setFormInfo({
                    name: "",
                    vendor: "",
                    price: null,
                    memo: "",
                    user_id: null,
                    category_id: null,
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
            <h3>Create an Expense</h3>
            <ExpenseForm changeHandler={changeHandler} submitHandler={submitHandler} formInfo={formInfo} errors={errors} buttonValue = "Add Expense" loggedInfo={props.loggedInfo}></ExpenseForm>
        </>
    );
}

export default NewExpense;