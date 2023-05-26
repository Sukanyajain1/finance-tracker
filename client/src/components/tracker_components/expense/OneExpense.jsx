import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

const OneExpense = (props) => {
    
    const {_id} = useParams();
    // state variable to store the one expense information we get back from the api call
    const [oneExpense, setOneExpense] = useState({});
    const history = useHistory();
    
    useEffect((_id, props) => {
        const message = "Toggled to the show one expense component"
        props.logToggler(message);
        axios.get(`http://localhost:8000/api/expenses/${_id}`)
            .then((res)=>{
                console.log("This is the api result: ", res);
                setOneExpense(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
            });
    }, []);

// whien i click on the button, I want it to make a request to the backend to delete something based on the id.
    //delete expense
    const deleteExpense = ()=>{
        axios.delete(`http://localhost:8000/api/expenses/${_id}`)
        .then((res)=>{
            console.log("This is the api result: ", res);
            history.push("/") //redirect after updataing form
        })
        .catch(err=>{
            console.log("Axios error: ", err);
        });
    }

    return (
        <>
        <div>
            <h3>Details about one expense</h3>
            <h4><u>Expense Alias:</u> {oneExpense.alias}</h4>
            <h4><u>Number of projects:</u> {oneExpense.numOfProjects}</h4>
            <h4><u>Duty Status:</u> {oneExpense.dutyStatus}</h4>
            <button onClick={deleteExpense} className="btn btn-danger">Delete {oneExpense.alias}</button>
        </div>
        </>
    );
}

export default OneExpense;