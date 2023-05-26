const mongoose = require ('mongoose');
const bcrypt = require("bcrypt");


const RoleSchema = new mongoose.Schema ({
    name: {
        type: String
    }
});



module.exports = mongoose.model ('Role', RoleSchema);