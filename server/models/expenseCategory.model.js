const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look


// the expense category form should have a hidden input field with the description populated according to user choice of category name. ---> ExpenseCategory.name.enum[idx] and ExpenseCategory.description.enum[idx] where the value of idx is the same for both inputs.
// IGNORE THE ABOVE INFORMATION: IT IS A STUPID IDEA.

const ExpenseCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "category name is required!"]
    },
    description: {
        type: String,
        required: [true, "description is required!"]
    },
    budgetPercentage: {
        // required: [true, "budgetPercentage is required!"],
        type: Number
        // error message
    }
}, {timestamps:true})


const ExpenseCategory = mongoose.model("ExpenseCategory", ExpenseCategorySchema);

module.exports = ExpenseCategory;