const db = require("../models");
const Role = db.role;
const db_name = "finance_tracker_schema";


// mongoose connection here
db.mongoose.connect(`mongodb+srv://root:root@clustermay.nvakqpq.mongodb.net/${db_name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log("Established a connection to the database");
        initial();
    })
    .catch( err=>
        console.log("Something went wrong when connecting to the database", err)
    );

// initial() function helps us to create 2 important rows in roles collection (3 if you want to add a moderator role).
    function initial() {
        Role.estimatedDocumentCount((err, count) => {
            if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                console.log("error creating user role: ", err);
                }
        
                console.log("added 'user' to roles collection");
            });
        
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                console.log("error creating admin role: ", err);
                }
        
                console.log("added 'admin' to roles collection");
            });
            }
        });
    }

