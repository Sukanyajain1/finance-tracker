const User = require("../models/user.model");

class UserController {

    // admin controller features for getting all users
    getAllUsers = (req,res)=>{
        User.find()
            .then(allUsers=>{
                res.json({results: allUsers})
            })
            .catch(err=>{
                res.json({error: err})
            })
    }


    register = (req,res) =>{
        User.create(req.body)
            .then(user=>{
                res.json({msg: "success!", user: user});
            })
            .catch(err=> res.json(err));
    }

    // getOneUser ()
}

module.exports = new UserController();