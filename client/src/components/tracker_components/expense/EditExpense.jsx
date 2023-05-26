import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import axios from "axios";



const EditExpense = (props) => {

    const history = useHistory();
    const {_id} = useParams();

    // formInfo will be filled with info about the ninja we want to update
    const [formInfo, setFormInfo] = useState({
        name: "",
        vendor: "",
        price: null,
        memo: "",
        user_id: null,
        category_id: null,
    });

    useEffect((_id, props) => {
        const message = "Toggled to the edit expense component"
        props.logToggler(message);
        axios.get(`http://localhost:8000/api/expenses/show_one/${_id}`)
            .then((res)=>{
                console.log("This is the api result: ", res);
                setFormInfo(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
            });
    }, []);


    // changehandler to update the formInfo object with the information from the form
    const changeHandler = (e)=>{
        console.log("changing the form!")
        // if (e.target.type === "checkbox"){
        //     setFormInfo({
        //         ...formInfo,
        //         [e.target.name]: !formInfo.isVet
        //     })
        // }else{}
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    // submitHandler for when the form submits we send this date to backend to create a new object
    const submitHandler = (e)=>{
        e.preventDefault();
        
        axios.put(`http://localhost:8000/api/expenses/update/${_id}`, formInfo)
        .then((res)=>{
            console.log("Response after axios put request: ", res);
            history.push("/") //redirect after updataing form
        })
        .catch(err=>{
            console.log("Axios POST Route error: ", err)
        })
    }    
    
    return (
        <>
            <h3>Edit an Expense</h3>
            <ExpenseForm changeHandler={changeHandler} submitHandler={submitHandler} formInfo={formInfo} buttonValue = "Update Expense" loggedInfo={props.loggedInfo}></ExpenseForm>
        </>
    );
}

export default EditExpense;