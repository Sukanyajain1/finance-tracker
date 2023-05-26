const ExpenseController = require("../controllers/expense.controller")


// routes here
module.exports = (app) => {
    app.get("/api/expenses/hello", ExpenseController.sayHello);
    app.get("/api/expenses", ExpenseController.findAllExpenses);
    app.post("/api/expenses/new", ExpenseController.createExpense);
    app.get("/api/expenses/random", ExpenseController.findRandomExpense);  //best practice to put all the string variable urls at the top and then put any param routes toward the bottom.
    app.get("/api/expenses/show_one/:id", ExpenseController.findOneExpense);
    app.put("/api/expenses/update/:id", ExpenseController.updateExpense);
    app.delete("/api/expenses/delete/:id", ExpenseController.deleteExpense);
    
    // show all the expenses that belong to a category given the category IDß
    app.get("/api/expenses/category/:category_id", ExpenseController.findExpensesForOneCategory);


}


// a variable in a route is called a route parameter. the ":" makes something a variable in the route and the "id" us a route parameter.