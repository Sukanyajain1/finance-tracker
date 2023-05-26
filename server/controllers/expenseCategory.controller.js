const ExpenseCategory = require("../models/expenseCategory.model");

// all the callback functions for db parsing will be here for only the ExpenseCategory model

module.exports.sayHello = (req, res)=>{
    res.json({msg: "Hello to all the expense categories!"})
}


module.exports.findAllExpenseCategories = (req, res) =>{
    ExpenseCategory.find()
        .then(allExpenseCategories=>{
            res.json({results: allExpenseCategories})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in category controller: ", error: err})
        })
}

module.exports.createExpenseCategory = (req, res)=>{
    // req.body represents the form information
    ExpenseCategory.create(req.body)
        .then(newCreatedExpenseCategory => {
            res.json({results: newCreatedNinja})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in category controller: ", error: err})
        })
}

module.exports.findOneExpenseCategory = (req, res)=>{
    // req.body represents the form information
    ExpenseCategory.findOne({_id: req.params.id})
        .then(foundExpenseCategory => {
            res.json({results: foundNinja})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in category controller: ", error: err})
        })
}

module.exports.updateExpenseCategory = (req, res)=>{
    // req.body represents the form information
    ExpenseCategory.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updateExpenseCategory => {
            res.json({results: updateNinja})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in category controller: ", error: err})
        })
}

module.exports.deleteExpenseCategory = (req, res)=>{
    // req.body represents the form information
    ExpenseCategory.deleteOne({_id: req.params.id})
        .then(deletedExpenseCategory => {
            res.json({results: deletedNinja})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in category controller: ", error: err})
        })
}

module.exports.findRandomExpenseCategory = (req, res) =>{
    ExpenseCategory.find()
        .then(allExpenseCategories=>{
            // get a random index number from index 0 up to but not including the allExpenseCategories.length
            let randomIdx = Math.floor(Math.random()*allExpenseCategories.length)

            res.json({results: allExpenseCategories[randomIdx]})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in category controller: ", error: err})
        })
}