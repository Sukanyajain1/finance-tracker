const AuthJwt = require("../middlewares/authJwt");
const UserController = require("../controllers/user.controller");

module.exports = (app)=>{
    app.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", UserController.allAccess);

    app.get("/api/test/user", [AuthJwt.verifyToken], UserController.userBoard);

    // app.get(
    //     "/api/test/mod",
    //     [AuthJwt.verifyToken, AuthJwt.isModerator],
    //     UserController.moderatorBoard
    // );

    app.get(
        "/api/test/admin",
        [AuthJwt.verifyToken, AuthJwt.isAdmin],
        UserController.adminBoard
    );
};











// module.exports = (app)=>{
//     //admin routes for viewing all users in system and deleting users accounts
//     app.get("/api/users", UserController.getAllUsers)
//     app.post("/api/users/register", UserController.register )
//     app.post("/api/users/login", UserController.login)
//     app.get("/api/users/getloggedinuser", UserController.getLoggedInUser)
//     app.get("/api/users/logout", UserController.logout)
    
// }