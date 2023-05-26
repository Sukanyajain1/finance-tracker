import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";



const Dashboard = (props) => {

    const [allExpenses, setAllExpenses] = useState([]);
    const { loggedInUser} = props;

    const [deleteToggle, setDeleteToggle] = useState(false);

    
    useEffect((props) => {
        console.log("This is the loggedInUser: ", loggedInUser)
        axios.get("http://localhost:8000/api/expenses")
            .then((res)=>{
                console.log("This is the api result: ", res);
                setAllExpenses(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
            });
    }, [deleteToggle]);

    const deleteExpense = (e, idx)=>{
        axios.delete(`http://localhost:8000/api/expenses/${idx}`)
        .then((res)=>{
            console.log("This is the api result: ", res);
            setDeleteToggle(!deleteToggle);
        })
        .catch(err=>{
            console.log("Axios error: ", err);
        });
    };



    return (
        <div>
            <div className="d-flex justify-content-end">
                <h1>Welcome, you're in the dashboard! Congrats on being a registered user!</h1>
            </div>

            <div>
                <p>This will be the expenses list and the different summaries of spending goals/performance etc.</p>
                <hr />
                <h3>Overview</h3>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Expense</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                {allExpenses.map((expenseObj, idx)=>{
                        return(
                            <tr key={idx}>
                                <td>{expenseObj.name}</td>
                                <td>{expenseObj.vendor}</td>
                                <td>${expenseObj.price}</td>
                                <td>{expenseObj.category}</td>
                                <td className='d-flex'>
                                    <Link to={`/edit/${expenseObj._id}`} className="btn btn-warning">Edit Info</Link>
                                    <button onClick={(e)=>{deleteExpense(e, expenseObj._id)}} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                                    )
                                })}
                    </tbody>
                </table>

            </div>
        </div>
    );
};


export default Dashboard;