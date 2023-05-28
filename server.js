const express = require("express");
const cors = require("cors");

require('dotenv').config(); //so that we can read the information about our secret key which is stored in the .env file
const cookieParser = require('cookie-parser'); //so that the server can understand the cookie information coming in from the client (browser)

const app = express(); 
const port = 8000;

app.use(express.json());  //parse requests of content-type  -  application/json
app.use(express.urlencoded({extended:true}));  //parse requests of content-type  -  application/x-www-form-urlendcoded
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());



require("./server/config/mongoose.config"); //mongoose.connect to the MongoDB url with db name
require("./server/config/authJwt.config");

// // authController contains the initializer for the Roles (creating a new object for the user role and the admin role)
// require("./server/controllers/auth.controller");

// ALL THE ROUTES
require('./server/routes/user.routes')(app);
require('./server/routes/auth.routes')(app);
require('./server/routes/expense.routes')(app);
require('./server/routes/expenseCategory.routes')(app);

// SET PORT, LISTEN FOR REQUESTS
app.listen(port, ()=> console.log(`<3 Hi, there! Listening on port: ${port}`));