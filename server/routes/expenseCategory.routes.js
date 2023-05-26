const ExpenseCategoryController = require("../controllers/expenseCategory.controller")


// routes here
module.exports = (app) => {
    app.get("/api/categories/hello", ExpenseCategoryController.sayHello);
    app.get("/api/categories", ExpenseCategoryController.findAllExpenseCategories);
    app.post("/api/categories/new", ExpenseCategoryController.createExpenseCategory);
    app.get("/api/categories/random", ExpenseCategoryController.findRandomExpenseCategory);  //best practice to put all the string variable urls at the top and then put any param routes toward the bottom.
    app.get("/api/categories/show_one/:id", ExpenseCategoryController.findOneExpenseCategory);
    app.put("/api/categories/update/:id", ExpenseCategoryController.updateExpenseCategory);
    app.delete("/api/categories/delete/:id", ExpenseCategoryController.deleteExpenseCategory);
    
    


}