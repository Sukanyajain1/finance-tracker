const config = require("../config/authJwt.config");
const db = require("../models/indexModel");
const { user: User, role: Role, refreshToken: RefreshToken } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.register = (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirm: req.body.confirm,
    });

    user.save((err, user) => {
        if (err) {
        res.status(500).send({ message: err });
        return;
        }

        if (req.body.roles) {
        Role.find(
            {
                name: { $in: req.body.roles }
            },
            (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            user.roles = roles.map(role => role._id);
            user.save(err => {
                if (err) {
                res.status(500).send({ message: err });
                return;
                }

            // setting the cookie now after saving the user
            const userToken= jwt.sign(
                {
                    id: user._id,
                    firstName: user.firstName
                }, process.env.SECRET_KEY,
                {
                    expiresIn: 86400 // 24 hours
                }
            );
                res.send({ message: "User was registered successfully!" })
                    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                    httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            });
            }
        );
        } else {
        Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
            res.status(500).send({ message: err });
            return;
            }

            user.roles = [role._id];
            user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            // setting the cookie now after saving the user with user role
            const userToken= jwt.sign(
                {
                    id: user._id,
                    firstName: user.firstName
                }, process.env.SECRET_KEY,
                {
                    expiresIn: 86400 // 24 hours
                }
            );
                res.json({ message: "User was registered successfully!" })
                    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                    httpOnly: true
                    })
                    .json({ msg: "success!", user: user });                });
        });
        }
    });
};

module.exports.login = async(req, res) => {
    const user = await User.findOne({email: req.body.email}) //see if the user exists in db
        .populate("roles", "-__v")
        .exec(async (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });  // email not found in users collection
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
            });
        }

        //we are now in the else- this happens that means that the user from the form was successsfully authenticated and is stored in that variable "user" which has info about the user that was just logged, including the field _id
        const userToken= jwt.sign(
            {
                id: user._id,
                firstName: user.firstName
            }, process.env.SECRET_KEY,
            {
                expiresIn: config.jwtExpiration // 24 hours?  whatever is in the auth.config file
            }
        );

        let refreshToken = await RefreshToken.createToken(user);
        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200)
        .cookie("usertoken", userToken, refreshToken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .send({
            id: user._id,
            firstName: user.firstName,
            email: user.email,
            roles: authorities,
            accessToken: userToken,
            refreshToken: refreshToken
        })
    });
};

module.exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
            
            res.status(403).json({
            message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        let newAccessToken = jwt.sign({ id: refreshToken.user._id }, process.env.SECRET_KEY, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};