const Expense = require("../models/expense.model");

// all the callback functions for db parsing will be here for only the Expense model

module.exports.sayHello = (req, res)=>{
    res.json({msg: "Hello to all the expenses!"})
}


module.exports.findAllExpenses = (req, res) =>{
    Expense.find()
    .populate("user_id", ["_id", "firstName", "lastName"])
    .populate("category_id")
        .then(allExpenses=>{
            res.json({results: allExpenses})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in expense controller: ", error: err})
        })
}

module.exports.createExpense = (req, res)=>{
    // req.body represents the form information
    Expense.create(req.body)
        .then(newCreatedExpense => {
            res.json({results: newCreatedNinja})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in expense controller: ", error: err})
        })
}

module.exports.findOneExpense = (req, res)=>{
    // req.body represents the form information
    Expense.findOne({_id: req.params.id})
        .then(foundExpense => {
            res.json({results: foundNinja})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in expense controller: ", error: err})
        })
}

module.exports.updateExpense = (req, res)=>{
    // req.body represents the form information
    Expense.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updateExpense => {
            res.json({results: updateNinja})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in expense controller: ", error: err})
        })
}

module.exports.deleteExpense = (req, res)=>{
    // req.body represents the form information
    Expense.deleteOne({_id: req.params.id})
        .then(deletedExpense => {
            res.json({results: deletedNinja})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in expense controller: ", error: err})
        })
}

module.exports.findRandomExpense = (req, res) =>{
    Expense.find()
        .then(allExpenses=>{
            // get a random index number from index 0 up to but not including the allExpenses.length
            let randomIdx = Math.floor(Math.random()*allExpenses.length)

            res.json({results: allExpenses[randomIdx]})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in expense controller: ", error: err})
        })
}

module.exports.findExpensesForOneCategory = (req, res) =>{
    Expense.find({category_id: req.params.category_id})
    .populate("category_id")
        .then(allExpenses=>{
            res.json({results: allExpenses})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in expense controller: ", error: err})
        })
}