import React, { useState, useEffect } from 'react';
import axios from "axios";


const ExpenseForm = (props) => {
    const {submitHandler, changeHandler, errors, buttonValue, loggedInfo} = props;
    const [allExpenseCategories, setAllExpenseCategories] = useState([]);
    // const [chosenCategory, setChosenCategory] = useState({
    //     name: "",
    //     description: ""
    // });
    
    useEffect((props) => {
        axios.get("http://localhost:8000/api/categories")
            .then((res)=>{
                console.log("This is the api result: ", res);
                setAllExpenseCategories(res.data.results)
            })
            .catch(err=>{
                console.log("Axios error: ", err);
            });
    }, []);
    

    return (
        <>
            <form onSubmit={submitHandler} action="" className="">
                <input type="text" className="hidden" name="user_id" value={loggedInfo}/>
                <div className="form-group">
                    <label htmlFor="">Expense name (name):</label>
                    <input type="text" name="name" id="" className="form-control" onChange={changeHandler}/>
                    <p className="text-danger">{errors.name?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Vendor:</label>
                    <input type="text" name="vendor" id="" className="form-control" onChange={changeHandler}/>
                    <p className="text-danger">{errors.vendor?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Price:</label>
                    <input type="number" min=".01" step=".01" name="price" id="" className="form-control" onChange={changeHandler}/>
                    <p className="text-danger">{errors.price?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Category:</label>
                    <select name="expenseCategory" id="" className="form-select" onChange={changeHandler} /* onSelect={(e)=>setChosenCategory(e.target.value)} */ >
                        {
                            allExpenseCategories.map((categoryObj, idx)=>{
                                return(

                                        <option key={idx} className="text-capitalize" value={categoryObj._id}>{categoryObj.name}</option>
                                        // {console.log(categoryObj)}

                                )
                            })
                        }
                    </select>
                    {/* <button type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="right" title="Tooltip on top">
                    ?
                    </button>
                     */}

                    {/* <p onClick={alert(formInfo.expenseCategory.description)} className='btn btn-secondary'>?</p> */}
                    <p className="text-danger">{errors.expenseCategory?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Memo (Optional):</label>
                    <input type="number" name="memo" id="" className="form-control" onChange={changeHandler}/>
                </div>
                <input type="submit" value={buttonValue} className='btn btn-success'/>
            </form>
        </>
    );
}
export default ExpenseForm;
