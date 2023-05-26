const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look

const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name of the Expense is required."],
        minlength: [2, "The expense name must have at least 2 characters."]
    },
    vendor: {
        type: String,
        required: [true, "The name of the vendor is required."]
    },
    price: {
        type: Number,
        required: [true, "Spent amount is required."],
        min: [1, "An expense must have at least 1 project to enter the the dojo database."]
    },
    // expenseCategory: {
    //     type: String,
    //     required: [true, "Expense Category is required."],
    // },
    memo: {
        type: String
    },

    // add the user._id for the user that created this object
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //this is my User Type
        ref: "User" //this is the name of my user Model from the user.model.js
    },

    // add the user._id for the user that created this object
    category_id: {
        type: mongoose.Schema.Types.ObjectId, //this is my expenseCategory Type
        ref: "ExpenseCategory" //this is the name of my category Model from the expenseCategory.model.js
    }
}, {timestamps:true})


const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;