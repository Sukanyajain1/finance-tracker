const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look


// the expense category form should have a hidden input field with the description populated according to user choice of category name. ---> ExpenseCategory.name.enum[idx] and ExpenseCategory.description.enum[idx] where the value of idx is the same for both inputs.

const ExpenseCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, ""],
        enum: [
            "HOME",
            "PERSONAL CARE",
            "EDUCATION",
            "MEDICAL",
            "GROCERIES",
            "TRANSPORTATION",
            "EXPERIENCES",
            "UTILITIES",
            "TRAVEL",
            "HOBBIES",
            "SHOPPING",
            "DISPOSABLE",
        ]
    },
    description: {
        type: String,
        required: true,
        enum: [
            "Cleaning supplies, home decor, furniture, upkeep services such as lawnmowing and pool-cleaning, and renovations ",
            "Personal hygeine products, cosmetic purchases, and health and wellness expenses such as hair/skin/nail salon treatments and spa services.",
            "Tuition bills, stationary expenses, academic memberships, book or equipment rentals, etc.",
            "Healthcare related bills such as hospital or clinic expenses, medication purchases, health insurance, memberships and services for prevention or treatment, etc.",
            "Fresh produce, Meal ingredients and seasonings, Condiments, Stock beverages such as mineral water, milk, coffee, juice, etc.",
            "Auto-loan payments, fuel and vehicle-cleaning services, auto-repair expenses, auto-insurance, public transportation fare, etc.",
            "Ticket purchases for events such as movies, live concerts, museums and exhibits, festivals, cafe purchases, fast-food, etc.",
            "Rent, Mortgage payments, Bills for electric, water, heat utilities, internet and phone bills, etc.",
            "Flights, hotels and other lodging expenses, luggages expenses, babysitting, animal care services, ",
            "All purchases of goods and services contributing to participation in your hobbies.",
            "Apparel, shoes, headwear, swimware, accessories such as bags, briefcases, jewelry, belts, eyeware, etc.",
            "Anything you would like to use your disposable income toward. May include any purchase of goods or services made with \"Retail Therapy\" in mind!",
        ]
    },
    budgetPercentage: {
        required: true,
        type: Number,
        // error message
    }
}, {timestamps:true})


const ExpenseCategory = mongoose.model("ExpenseCategory", ExpenseCategorySchema);

module.exports = ExpenseCategory;