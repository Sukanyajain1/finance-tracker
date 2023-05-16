const express = require("express");
const cors = require("cors");

require("dotenv").config(); //so that we can read the information about our secret key which is stored in the .env file

console.log("SECRET KEY IS THIS---> ", process.env.SECRET_KEY)
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(cors());


require("./server/config/mongoose.config");




require("./server/routes/user.routes")(app);



app.listen(port, ()=> console.log(`<3 Hi, there! Listening on port: ${port}`));