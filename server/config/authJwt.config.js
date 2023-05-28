const jwt = require("jsonwebtoken");

module.exports.authenticate =(req, res, next)=>{
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) =>{
        if (err) {
            res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}

module.exports = {
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hours

    /* for test */
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes
};
