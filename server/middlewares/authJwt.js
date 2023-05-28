const jwt = require("jsonwebtoken");
const db = require("../models/indexModel");
const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;

module.exports.catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

module.exports.verifyToken = (req, res, next) => {
    let userToken = req.headers["x-access-token"];
    
        if (!userToken) {
        return res.status(403).send({ message: "No userToken provided!" });
        }
    
        jwt.verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
        });
    };
    
    module.exports.isAdmin = (req, res, next) => {
        User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        Role.find(
            {
            _id: { $in: user.roles }
            },
            (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
    
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                next();
                return;
                }
            }
    
            res.status(403).send({ message: "Require Admin Role!" });
            return;
            }
        );
        });
    };