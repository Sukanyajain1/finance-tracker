const VerifyRegister = require("../middlewares/verifyRegister");
const AuthController = require("../controllers/auth.controller");

module.exports = (app)=>{
    app.use((req, res, next)=>{
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/register",
        [
        VerifyRegister.checkDuplicateEmail,
        VerifyRegister.checkRolesExisted
        ],
        AuthController.register
    );

    app.post("/api/auth/login", AuthController.login);
    app.post("/api/auth/refreshtoken", AuthController.refreshToken);
};